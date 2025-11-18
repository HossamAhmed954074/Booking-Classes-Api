const asyncFnWrapper = require("../middleware/asyncWraper");
const appError = require("../errors/appError");
const httpStatusConstnts = require("../utils/httpStatusConstant");
const Instructor = require("../models/instructorModel");


const listInstructors = asyncFnWrapper(async (req, res, next) => {
  const instructors = await Instructor.find({}).lean();
  res.json({ items: instructors });
});

const getInstructor = asyncFnWrapper(async (req, res, next) => {
  const instructor = await Instructor.findById(req.params.id).lean();
  if (!instructor)
    return next(
      new appError.create(
        "Instructor not found",
        httpStatusConstnts.NOT_FOUND
      )
    );
  res.json(instructor);
});

const createInstructor = asyncFnWrapper(async (req, res, next) => {
  const payload = req.body;
  const instructor = await Instructor.create(payload);
  res.status(201).json(instructor);
});

module.exports = { listInstructors, getInstructor, createInstructor };