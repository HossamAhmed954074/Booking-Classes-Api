const mongoose = require("mongoose");
const Booking = require("../models/bookingModel");
const ClassSession = require("../models/classSession");
const User = require("../models/userModel");
const Business = require("../models/businessModel");
const CreditTransaction = require("../models/creditTransictionModel");
const Notification = require("../models/notificationModel");
const { getIdempotency, setIdempotency } = require("../utils/idempotency");
const { mongoose: mongooseInstance } = require("../data/db");
const asyncFnWrapper = require("../middleware/asyncWraper");
const appError = require("../errors/appError");
const httpStatusConstnts = require("../utils/httpStatusConstant");

// POST /bookings (create booking with transactional safety)
const createBooking = asyncFnWrapper(async (req, res, next) => {
  // idempotency key support
  const idem = req.headers["idempotency-key"];
  if (idem) {
    const existing = getIdempotency(idem);
    if (existing) return res.status(200).json(existing);
  }

  const sessionId = req.body.sessionId;
  if (!sessionId)
    return next(
      appError.create(
        "sessionId is required",
        401,
        httpStatusConstnts.BAD_REQUEST
      )
    );

  // start transaction (requires replica set in Mongo)
  const session = await mongooseInstance.startSession();
  session.startTransaction();
  try {
    const classSession = await ClassSession.findById(sessionId)
      .session(session)
      .exec();
    if (!classSession) {
      await session.abortTransaction();
      return next(
        appError.create(
          "Class session not found",
          401,
          httpStatusConstnts.NOT_FOUND
        )
      );
    }
    if (classSession.status !== "scheduled") {
      await session.abortTransaction();
      return next(
        appError.create(
          "Class session is not available for booking",
          httpStatusConstnts.CONFLICT
        )
      );
    }
    if (classSession.bookedSpots >= classSession.capacity) {
      await session.abortTransaction();
      return next(
        appError.create("Class is full", 401, httpStatusConstnts.CONFLICT)
      );
    }

    // check user's credits
    const user = await User.findById(req.user._id).session(session);
    if (!user) {
      await session.abortTransaction();
      return next(
        appError.create("User not found", 401, httpStatusConstnts.NOT_FOUND)
      );
    }
    if ((user.credits || 0) < classSession.credits) {
      await session.abortTransaction();
      return next(
        appError.create(
          "Insufficient credits",
          401,
          httpStatusConstnts.PAYMENT_REQUIRED
        )
      );
    }

    // create booking
    const bookingDoc = await Booking.create(
      [
        {
          userId: user._id,
          businessId: classSession.businessId,
          sessionId: classSession._id,
          status: "pending",
          credits: classSession.credits,
          bookingDate: classSession.date,
          notes: req.body.notes || null,
        },
      ],
      { session }
    );

    // decrement user credits and add transaction
    user.credits = (user.credits || 0) - classSession.credits;

    const balanceAfter = user.credits;
    await CreditTransaction.create(
      [
        {
          userId: user._id,
          type: "usage",
          amount: -classSession.credits,
          balance: balanceAfter,
          credits: classSession.credits,
          description: `Booked ${classSession.name}`,
          bookingId: bookingDoc[0]._id,
        },
      ],
      { session }
    );

    // increment bookedSpots
    classSession.bookedSpots = (classSession.bookedSpots || 0) + 1;
    await classSession.save({ session });

    // write notification for business owner (basic)
    await Notification.create(
      [
        {
          recipientId: classSession.businessId, // in your real model use business.userId
          type: "booking",
          title: "New Booking",
          message: `${req.user.name || "A user"} booked ${classSession.name}`,
          relatedEntityType: "booking",
          relatedEntityId: bookingDoc[0]._id,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    const result = bookingDoc[0].toObject();
    if (idem) setIdempotency(idem, result);
    return res.status(201).json(result);
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    if (err.code === 11000)
      return next(
        appError.create(
          "Duplicate booking detected",
          401,
          httpStatusConstnts.CONFLICT
        )
      );
    console.error("Booking error", err);
    return next(
      appError.create(
        "Booking failed",
        401,
        httpStatusConstnts.INTERNAL_SERVER_ERROR
      )
    );
  }
});

const listBookings = asyncFnWrapper(async (req, res, next) => {
  const { page = 1, limit = 20, status } = req.query;
  const filter = {};

  console.log("=== DEBUG listBookings ===");
  console.log("User role:", req.user.role);
  console.log("User ID:", req.user._id);

  try {
    // get role from req.user (set by auth middleware)
    if (req.user.role === "customer") {
      filter.userId = req.user._id;
    } else if (req.user.role === "business") {
      // Find the business document for this user
      const business = await Business.findOne({ userId: req.user._id });
      console.log("Business found:", business);

      if (!business) {
        // Check if there are ANY businesses in the system
        const allBusinesses = await Business.find({}).limit(5).lean();
        console.log("All businesses in DB:", allBusinesses);

        return next(
          appError.create(
            "Business profile not found for this user",
            404,
            httpStatusConstnts.NOT_FOUND
          )
        );
      }
      filter.businessId = business._id;
      console.log("Using businessId:", business._id);
      console.log("businessId type:", typeof business._id);
      console.log("businessId toString:", business._id.toString());
    }

    if (status) filter.status = status;
    console.log("Final filter:", filter);

    // Check if there are ANY bookings at all
    const allBookingsCount = await Booking.countDocuments({});
    console.log("Total bookings in DB:", allBookingsCount);

    if (allBookingsCount > 0) {
      const sampleBooking = await Booking.findOne({}).lean();
      console.log(
        "Sample booking businessId type:",
        typeof sampleBooking.businessId
      );
      console.log("Sample booking businessId:", sampleBooking.businessId);
    }

    const items = await Booking.find(filter)
      .populate({
        path: "userId",
        select: "name email phone avatar",
      })
      .populate({
        path: "sessionId",
        select: "name date startTime endTime",
      })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .lean();

    const total = await Booking.countDocuments(filter);

    console.log("Total bookings found:", total);
    console.log("Items returned:", items.length);
    console.log("First item:", items[0]);

    res.json({
      items,
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error in listBookings:", error);
    return next(
      appError.create(
        error.message || "Failed to fetch bookings",
        500,
        httpStatusConstnts.INTERNAL_SERVER_ERROR
      )
    );
  }
});

const getBooking = asyncFnWrapper(async (req, res, next) => {
  const b = await Booking.findById(req.params.id).lean();
  if (!b)
    return next(
      appError.create("Booking not found", 401, httpStatusConstnts.NOT_FOUND)
    );
  if (
    req.user.role === "customer" &&
    b.userId.toString() !== req.user._id.toString()
  ) {
    return next(
      appError.create("Access denied", 401, httpStatusConstnts.FORBIDDEN)
    );
  }
  res.json(b);
});

const updateBooking = asyncFnWrapper(async (req, res, next) => {
  const b = await Booking.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!b)
    return next(
      appError.create("Booking not found", 401, httpStatusConstnts.NOT_FOUND)
    );
  res.json(b);
});

const confirmOrCancelBooking = asyncFnWrapper(async (req, res, next) => {
  const { status } = req.body;
  if (status !== "confirmed" && status !== "cancelled")
    return next(
      appError.create("Invalid status", 401, httpStatusConstnts.BAD_REQUEST)
    );
  const b = await Booking.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  if (!b)
    return next(
      appError.create("Booking not found", 401, httpStatusConstnts.NOT_FOUND)
    );
  res.json(b);
});

const deleteBooking = asyncFnWrapper(async (req, res, next) => {
  const b = await Booking.findByIdAndDelete(req.params.id);
  if (!b)
    return next(
      appError.create("Booking not found", 401, httpStatusConstnts.NOT_FOUND)
    );
  res.json(b);
});

module.exports = {
  createBooking,
  listBookings,
  getBooking,
  updateBooking,
  confirmOrCancelBooking,
  deleteBooking,
};
