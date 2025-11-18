const { Schema: PCP, model: MCP } = require("mongoose");
const creditPackageSchema = new PCP({
  name: String,
  credits: Number,
  priceUSD: Number,
  discountPercent: Number,
  isPopular: Boolean,
  isActive: Boolean,
  description: String,
  validityDays: Number,
  createdAt: { type: Date, default: Date.now },
});
module.exports = MCP("credit_package", creditPackageSchema);
