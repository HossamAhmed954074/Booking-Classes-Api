const { Schema: SCS, model: MCS } = require("mongoose");
const classSessionSchema = new SCS({
  businessId: {
    type: SCS.Types.ObjectId,
    ref: "Business",
    required: true,
    index: true,
  },
  name: String,
  instructorName: String,
  instructorId: { type: SCS.Types.ObjectId, ref: "Instructor" },
  description: String,
  date: { type: Date, required: true, index: true },
  startTime: String,
  endTime: String,
  duration: Number,
  capacity: Number,
  bookedSpots: { type: Number, default: 0 },
  credits: Number,
  level: String,
  status: {
    type: String,
    enum: ["scheduled", "cancelled", "completed"],
    default: "scheduled",
    index: true,
  },
  isRecurring: { type: Boolean, default: false },
  recurringPattern: {},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
module.exports = MCS("class_session", classSessionSchema);
