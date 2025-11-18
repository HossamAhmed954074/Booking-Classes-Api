const { Schema: SB, model: MB } = require("mongoose");
const bookingSchema = new SB({
  userId: { type: SB.Types.ObjectId, ref: "User", index: true },
  businessId: { type: SB.Types.ObjectId, ref: "Business", index: true },
  sessionId: { type: SB.Types.ObjectId, ref: "ClassSession", index: true },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled", "declined"],
    default: "pending",
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
