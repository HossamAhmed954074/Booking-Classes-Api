const { Schema: SR, model: MR } = require("mongoose");
const reviewSchema = new SR({
  userId: { type: SR.Types.ObjectId, ref: "User" },
  businessId: { type: SR.Types.ObjectId, ref: "Business" },
  sessionId: { type: SR.Types.ObjectId, ref: "ClassSession" },
  bookingId: { type: SR.Types.ObjectId, ref: "Booking" },
  rating: Number,
  title: String,
  comment: String,
  isVerified: { type: Boolean, default: false },
  response: {
    text: String,
    respondedAt: Date,
    respondedBy: SR.Types.ObjectId,
  },
  createdAt: { type: Date, default: Date.now },
});
module.exports = MR("review", reviewSchema);
