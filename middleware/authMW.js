const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const httpStatusConstnts = require("../utils/httpStatusConstant");
const appError = require("../errors/appError");
const asyncFnWrapper = require("../middleware/asyncWraper");
const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";

 const auth = asyncFnWrapper(async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return next(appError.create("No token", httpStatusConstnts.UNAUTHORIZED));
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.id).lean();
    if (!user) return next(appError.create("User not found", httpStatusConstnts.UNAUTHORIZED));
    req.user = user;
    next();
  } catch (err) {
    return next(appError.create("Invalid token", httpStatusConstnts.UNAUTHORIZED));
  }
});

function requireRole(...roles) {
  return function (req, res, next) {
    if (!req.user) return next(appError.create("Unauthorized", httpStatusConstnts.UNAUTHORIZED));
    if (!roles.includes(req.user.role))
      return next(appError.create("Forbidden", httpStatusConstnts.FORBIDDEN));
    next();
  };
}

module.exports = { auth, requireRole };
