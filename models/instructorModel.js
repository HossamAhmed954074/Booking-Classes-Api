const mongoose = require("mongoose");
const instructorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business" , required: true},
  name: String,
  bio: String,
  specialties: [String],
  certifications: [String],
  photo: String,
  rating: Number,
  totalClasses: Number,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("instructor", instructorSchema);