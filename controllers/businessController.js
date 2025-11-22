const asyncFnWrapper = require("../middleware/asyncWraper");
const appError = require("../errors/appError");
const httpStatusConstnts = require("../utils/httpStatusConstant");

const Business = require("../models/businessModel");

const listBusinesses = asyncFnWrapper(async (req, res, next) => {
  const { q, type, lat, lng, radius = 5000, page = 1, limit = 20 } = req.query;
  const filter = { isActive: true };
  if (type) filter.type = type;
  if (q) filter.$text = { $search: q };
  let pipeline = [];
  if (lat && lng) {
    pipeline.push({
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [parseFloat(lng), parseFloat(lat)],
        },
        distanceField: "distance",
        spherical: true,
        maxDistance: parseInt(radius),
      },
    });
    if (q) pipeline.push({ $match: filter });
    else pipeline.push({ $match: filter });
  } else {
    pipeline.push({ $match: filter });
  }
  pipeline.push({ $skip: (page - 1) * limit }, { $limit: parseInt(limit) });
  const items = await Business.aggregate(pipeline);
  res.json({ items, page: parseInt(page), limit: parseInt(limit) });
});

const getBusiness = asyncFnWrapper(async (req, res, next) => {
  const { id } = req.params;
  const b = await Business.findById(id).lean();
  if (!b)
    next(
      new appError.create("Business not found", httpStatusConstnts.NOT_FOUND)
    );
  res.json(b);
});


module.exports = { listBusinesses, getBusiness };
