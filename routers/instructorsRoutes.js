const instructorController = require('../controllers/instructorsContrroler');
const express = require('express');
const router = express.Router();

router.get('/', instructorController.listInstructors);
router.get('/:id', instructorController.getInstructor);
router.post('/', instructorController.createInstructor);

module.exports = router;