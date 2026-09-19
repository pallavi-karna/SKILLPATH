const express = require("express");

const {
    getJobs,
    getJobMatch
} = require("../controllers/jobController");

const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getJobs);

router.get(
    "/:jobId/match",
    authenticateToken,
    getJobMatch
);

module.exports = router;