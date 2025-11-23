const { Schema: SB, model: MB } = require("mongoose");
const bookingSchema = new SB({
  userId: { type: SB.Types.ObjectId, ref: "user", index: true },
  businessId: { type: SB.Types.ObjectId, ref: "Business", index: true },
  sessionId: { type: SB.Types.ObjectId, ref: "class_session", index: true },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "confirmed", "cancelled", "declined"],
    index: true,
  },
  credits: Number,
  bookingDate: Date,
  notes: String,
  confirmedAt: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
// unique to avoid duplicate bookings
bookingSchema.index({ userId: 1, sessionId: 1 }, { unique: true });
module.exports = MB("booking", bookingSchema);
