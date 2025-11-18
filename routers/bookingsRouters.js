const bookingController = require('../controllers/bookingsController');
const express = require('express');
const router = express.Router();

router.post('/', bookingController.createBooking);
router.get('/:id', bookingController.getBooking);
router.get('/', bookingController.listBookings);

module.exports = router;