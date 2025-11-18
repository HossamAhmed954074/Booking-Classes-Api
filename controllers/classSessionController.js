const ClassSession = require("../models/classSession");
const asyncFnWrapper = require("../middleware/asyncWraper");
const appError = require("../errors/appError");
const httpStatusConstnts = require("../utils/httpStatusConstant");

const listSessions = asyncFnWrapper(async (req, res, next) => {
  const {
    businessId,
    dateFrom,
    dateTo,
    level,
    page = 1,
    limit = 20,
  } = req.query;
  const filter = {};
  if (businessId) filter.businessId = businessId;
  if (level) filter.level = level;
  if (dateFrom || dateTo) filter.date = {};
  if (dateFrom) filter.date.$gte = new Date(dateFrom);
  if (dateTo) filter.date.$lte = new Date(dateTo);
  const items = await ClassSession.find(filter)
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .lean();
  res.json({ items, page: parseInt(page), limit: parseInt(limit) });
});

const getSession = asyncFnWrapper(async (req, res, next) => {
  const s = await ClassSession.findById(req.params.id).lean();
  if (!s)
    next(
      new appError.create(
        "Class Session not found",
        httpStatusConstnts.NOT_FOUND
      )
    );
  s.availableSpots = s.capacity - (s.bookedSpots || 0);
  res.json(s);
});

const createSession = asyncFnWrapper(async (req, res, next) => {
  const payload = req.body;
  payload.businessId = req.body.businessId || req.user._id; // business middleware should set
  const s = await ClassSession.create(payload);
  res.status(201).json(s);
});

module.exports = { listSessions, getSession, createSession };
