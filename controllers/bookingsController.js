const mongoose = require("mongoose");
const Booking = require("../models/bookingModel");
const ClassSession = require("../models/classSession");
const User = require("../models/userModel");
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
  // the role check here

  if (req.user.role === "customer") filter.userId = req.user._id;
  if (status) filter.status = status;
  const items = await Booking.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .populate("userId", "name email") 
    .populate("sessionId", "name date") 
    .lean();
 

  res.json({ items, page: parseInt(page), limit: parseInt(limit) });
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
      appError.create(
        "Invalid status",
        401,
        httpStatusConstnts.BAD_REQUEST
      )
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
