const { Schema: SI, model: MI } = require("mongoose");
const instructorSchema = new SI({
  userId: { type: SI.Types.ObjectId, ref: "User" },
  businessId: { type: SI.Types.ObjectId, ref: "Business" },
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
module.exports = MI("instructor", instructorSchema);