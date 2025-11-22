const express = require("express");
const router = express.Router();
const {
  listSessions,
  getSession,
  createSession,
  updateSession,
} = require("../controllers/classSessionController");

const { auth, requireRole } = require("../middleware/authMW");



router.get("/", listSessions);
router.get("/:id", getSession);
router.post("/", auth, requireRole("business","admin"), createSession);
router.put("/:id", auth, requireRole("business","admin"), updateSession);
module.exports = router;
