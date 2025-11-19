const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// User registration route
router.post('/register', authController.registerUser);

// User login route
router.post('/login', authController.loginUser);

// Get current user route
router.get('/me', authController.getCurrentUser);

module.exports = router;