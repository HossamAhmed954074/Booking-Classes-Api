const mongoose = require("mongoose");
const Booking = require("../models/bookingModel");
const ClassSession = require("../models/classSession");
const User = require("../models/userModel");
const CreditTransaction = require("../models/creditTransictionModel");
const Notification = require("../models/notificationModel");
const { getIdempotency, setIdempotency } = require("../utils/idempotency");
const { mongoose: mongooseInstance } = require("../data/db");

// POST /bookings (create booking with transactional safety)
async function createBooking(req, res) {
  // idempotency key support
  const idem = req.headers["idempotency-key"];
  if (idem) {
    const existing = getIdempotency(idem);
    if (existing) return res.status(200).json(existing);
  }

  const sessionId = req.body.sessionId;
  if (!sessionId)
    return res.status(400).json({ message: "sessionId required" });

  // start transaction (requires replica set in Mongo)
  const session = await mongooseInstance.startSession();
  session.startTransaction();
  try {
    const classSession = await ClassSession.findById(sessionId)
      .session(session)
      .exec();
    if (!classSession) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Class session not found" });
    }
    if (classSession.status !== "scheduled") {
      await session.abortTransaction();
      return res.status(400).json({ message: "Class not available" });
    }
    if (classSession.bookedSpots >= classSession.capacity) {
      await session.abortTransaction();
      return res.status(409).json({ message: "Class is full" });
    }

    // check user's credits
    const user = await User.findById(req.user._id).session(session);
    if (!user) {
      await session.abortTransaction();
      return res.status(404).json({ message: "User not found" });
    }
    if ((user.credits || 0) < classSession.credits) {
      await session.abortTransaction();
      return res.status(402).json({ message: "Insufficient credits" });
    }

    // create booking
    const bookingDoc = await Booking.create(
      [
        {
          userId: user._id,
          businessId: classSession.businessId,
          sessionId: classSession._id,
          status: "confirmed",
          credits: classSession.credits,
          bookingDate: classSession.date,
          notes: req.body.notes || null,
          confirmedAt: new Date(),
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
      return res.status(409).json({ message: "Duplicate booking" });
    console.error("Booking error", err);
    return res
      .status(500)
      .json({ message: "Booking failed", error: err.message });
  }
}

async function listBookings(req, res) {
  const { page = 1, limit = 20, status } = req.query;
  const filter = {};
  if (req.user.role === "customer") filter.userId = req.user._id;
  if (status) filter.status = status;
  const items = await Booking.find(filter)
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .lean();
  res.json({ items, page: parseInt(page), limit: parseInt(limit) });
}

async function getBooking(req, res) {
  const b = await Booking.findById(req.params.id).lean();
  if (!b) return res.status(404).json({ message: "Booking not found" });
  res.json(b);
}

module.exports = { createBooking, listBookings, getBooking };
