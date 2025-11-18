const express = require("express");
const router = express.Router();
const {
  listSessions,
  getSession,
  createSession,
} = require("../controllers/classSessionController");

const { auth, requireRole } = require("../middleware/authMW");



router.get("/", listSessions);
router.get("/:id", getSession);
router.post("/", auth, requireRole("business","admin"), createSession);

module.exports = router;
