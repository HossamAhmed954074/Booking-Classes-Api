const creditsController = require("../controllers/creditsController");
const express = require("express");
const router = express.Router();

router.get("/packages", creditsController.listPackages);
router.post("/purchase", creditsController.purchasePackage);


module.exports = router;