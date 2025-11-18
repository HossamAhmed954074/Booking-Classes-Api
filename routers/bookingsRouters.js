const bookingController = require("../controllers/bookingsController");
const express = require("express");
const router = express.Router();
const { auth, requireRole } = require("../middleware/authMW");

router.post(
  "/",
  auth,
  requireRole("customer"),
  bookingController.createBooking
);
router.get("/", auth, bookingController.listBookings);
router.get("/:id", auth, bookingController.getBooking);

module.exports = router;
