const express = require("express");
const cors = require("cors");

const healthRoutes = require("./routes/healthRoutes");
const testRoutes = require("./routes/testRoutes");
const jobRoutes = require("./routes/jobRoutes");
const authRoutes = require("./routes/authRoutes");
const assessmentRoutes = require("./routes/assessmentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("SkillPath Backend is running");
});

app.use("/api", healthRoutes);
app.use("/api", testRoutes);

app.use("/api/jobs", jobRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/assessments", assessmentRoutes);

module.exports = app;