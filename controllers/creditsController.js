const CreditPackage = require("../models/creditPackage");
const CreditTransactionModel = require("../models/creditTransictionModel");
const UserModel = require("../models/userModel");

async function listPackages(req, res) {
  const pkgs = await CreditPackage.find({ isActive: true }).lean();
  res.json(pkgs);
}

// Mock purchase flow (no real payment provider)
async function purchasePackage(req, res) {
  const { packageId } = req.body;
  const pkg = await CreditPackage.findById(packageId);
  if (!pkg) return res.status(404).json({ message: "Package not found" });
  // In real app: create payment intent with Stripe/PayPal and confirm
  // Here: simulate successful payment
  const user = await UserModel.findById(req.user._id);
  user.credits = (user.credits || 0) + pkg.credits;
  await user.save();
  await CreditTransactionModel.create({
    userId: user._id,
    type: "purchase",
    amount: pkg.credits,
    balance: user.credits,
    credits: pkg.credits,
    description: `Purchased ${pkg.name}`,
    priceUSD: pkg.priceUSD,
  });
  res.json({ success: true, credits: user.credits });
}

module.exports = { listPackages, purchasePackage };
