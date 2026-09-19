const express = require("express");

const router = express.Router();

router.post("/test", (req, res) => {
    const data = req.body;

    res.status(201).json({
        message: "POST request received successfully",
        receivedData: data
    });
});

module.exports = router;