const express = require("express");
const router = express.Router();
const {
  listSessions,
  getSession,
  createSession,
} = require("../controllers/classSessionController");



router.get("/", listSessions);
router.get("/:id", getSession);
router.post("/", createSession);

module.exports = router;
