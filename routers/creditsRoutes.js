const creditsController = require("../controllers/creditsController");
const express = require("express");
const router = express.Router();
const { auth, requireRole } = require("../middleware/authMW");
router.get("/packages", creditsController.listPackages);
router.post("/purchase", auth, creditsController.purchasePackage);


module.exports = router;