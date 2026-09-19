const express = require("express");

const {
    saveAssessmentResult,
    getAssessmentHistory
} = require("../controllers/assessmentController");

const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();


/*
 * Save a completed assessment
 */
router.post(
    "/results",
    authenticateToken,
    saveAssessmentResult
);


/*
 * Get logged-in user's assessment history
 */
router.get(
    "/history",
    authenticateToken,
    getAssessmentHistory
);


module.exports = router;