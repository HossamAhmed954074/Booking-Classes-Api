const { Schema: XCT, model: MCT } = require("mongoose");
const creditTransactionSchema = new XCT({
  userId: { type: XCT.Types.ObjectId, ref: "User", index: true },
  type: { type: String, enum: ["purchase", "usage", "refund", "adjustment"] },
  amount: Number,
  balance: Number,
  credits: Number,
  description: String,
  paymentMethod: String,
  paymentId: String,
  bookingId: { type: XCT.Types.ObjectId, ref: "Booking" },
  priceUSD: Number,
  createdAt: { type: Date, default: Date.now },
});
module.exports = MCT("credit_transaction", creditTransactionSchema);
