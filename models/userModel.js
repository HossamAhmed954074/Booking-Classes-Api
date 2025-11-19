const {mongoose} = require("../data/db");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "customer", enum: ["customer", "business"] },
  phone: { type: String, required: true, unique: true },
  avatarUrl: { type: String, default: "" },
  credits: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});



userSchema.method("genAuthToken", function () {
  const token = jwt.sign(
    { id: this._id, email: this.email, name: this.name, role: this.role , avatarUrl: this.avatarUrl },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  return token;
});
const User = mongoose.model("user", userSchema);
module.exports = User;