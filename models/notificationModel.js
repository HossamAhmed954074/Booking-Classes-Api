const { Schema: SN, model: MN } = require("mongoose");
const notificationSchema = new SN({
  recipientId: { type: SN.Types.ObjectId, ref: "User", index: true },
  type: String,
  title: String,
  message: String,
  relatedEntityType: String,
  relatedEntityId: SN.Types.ObjectId,
  isRead: { type: Boolean, default: false, index: true },
  actionUrl: String,
  createdAt: { type: Date, default: Date.now },
});
module.exports = MN("notification", notificationSchema);
