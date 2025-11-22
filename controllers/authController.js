const user = require("../models/userModel");
const asyncFnWrapper = require("../middleware/asyncWraper");
const bcrypt = require("bcryptjs");
const appError = require("../errors/appError");
const httpStatusConstnts = require("../utils/httpStatusConstant");
const validator = require("validator");
const jwt = require("jsonwebtoken");

// create user
const registerUser = asyncFnWrapper(async (req, res, next) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone) {
    return next(
      appError.create("All fields are required", 401, httpStatusConstnts.BAD_REQUEST)
    );
  }
  const isEmailValid = validator.isEmail(email);
  if (!isEmailValid) {
    return next(
      appError.create("Invalid email format", 401 , httpStatusConstnts.BAD_REQUEST)
    );
  }
  const isPasswordValid = validator.isStrongPassword(password);
  if (!isPasswordValid) {
    return next(
      appError.create("Invalid password format", 401 , httpStatusConstnts.BAD_REQUEST)
    );
  }

  const isPhoneValid = validator.isMobilePhone(phone);
  if (!isPhoneValid) {
    return next(
      appError.create("Invalid phone format", 401 , httpStatusConstnts.BAD_REQUEST)
    );
  }

  // Check if user already exists by email and phone
  const existingUser = await user.findOne({ $or: [{ email }, { phone }] });
  if (existingUser) {
    return next(
      appError.create("User already exists", 401 ,httpStatusConstnts.BAD_REQUEST)
    );
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const newUser = new user({
    name,
    email,
    password: hashedPassword,
    phone,
  });
  
  
  await newUser.save();
  

  res.status(201).json({ message: "User registered successfully" });
});

// login user
const loginUser = asyncFnWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      appError.create(
        "Email and password are required",401,
        httpStatusConstnts.BAD_REQUEST
      )
    );
  }
  if (!validator.isEmail(email)) {
    return next(
      appError.create("Invalid email format", 401 , httpStatusConstnts.BAD_REQUEST)
    );
  }

  // Find user by email
  const existingUser = await user.findOne({ email });
  if (!existingUser) {
    return next(
      appError.create(
        "Invalid email or password",401,
        httpStatusConstnts.BAD_REQUEST
      )
    );
  }

  // Check password
  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch) {
    return next(
      appError.create(
        "Invalid email or password",401
        ,
        httpStatusConstnts.BAD_REQUEST
      )
    );
  }

  const token = existingUser.genAuthToken();
  res.header("x-auth-token", token);
  res.status(200).json({ message: "Login successful" , token});
});

const getCurrentUser = asyncFnWrapper(async (req, res, next) => {
  const token = req.query.token || req.headers["x-auth-token"];
  if (!token) {
    return next(
      appError.create("Authentication token is required", 401, httpStatusConstnts.UNAUTHORIZED)
    );
  }

  try {
  
    
    const decoded =   jwt.verify(token, process.env.JWT_SECRET);    
    const currentUser = await user.findById(decoded.id).select("-password");
    if (!currentUser) {
      return next(
        appError.create("User not found", 401, httpStatusConstnts.NOT_FOUND)
      );
    }
    res.status(200).json({ user: currentUser });
  } catch (err) {
    return next(
      appError.create("Invalid or expired token", 401, httpStatusConstnts.UNAUTHORIZED)
    );
  }
});

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
};
