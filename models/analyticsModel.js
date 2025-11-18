const { Schema: SA, model: MA } = require("mongoose");
const analyticsSchema = new SA({
  businessId: { type: SA.Types.ObjectId, ref: "Business", index: true },
  date: Date,
  period: String,
  metrics: Object,
  createdAt: { type: Date, default: Date.now },
});
module.exports = MA("analytics", analyticsSchema);
