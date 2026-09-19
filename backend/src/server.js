require("dotenv").config();

const app = require("./app");
const pool = require("./config/db");

pool.query("SELECT NOW()", (error, result) => {
    if (error) {
        console.error("Database connection failed:", error);
    } else {
        console.log("Database connected successfully");
        console.log("Database time:", result.rows[0]);
    }
});

app.listen(5000, () => {
    console.log("SkillPath backend running on port 5000");
});