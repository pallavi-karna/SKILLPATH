const pool = require("../config/db");

const saveAssessmentResult = async (req, res) => {
    const client = await pool.connect();

    try {
        const userId = req.user.userId;

        const {
            jobId,
            score,
            totalQuestions,
            readinessLevel,
            skillPerformance
        } = req.body;

        if (
            !jobId ||
            score === undefined ||
            !totalQuestions ||
            !readinessLevel ||
            !Array.isArray(skillPerformance)
        ) {
            return res.status(400).json({
                message: "Invalid assessment result data"
            });
        }

        await client.query("BEGIN");

        const jobCheck = await client.query(
            "SELECT job_id FROM jobs WHERE job_id = $1",
            [jobId]
        );

        if (jobCheck.rows.length === 0) {
            await client.query("ROLLBACK");

            return res.status(404).json({
                message: "Job not found"
            });
        }

        const result = await client.query(
            `INSERT INTO assessment_results
                (
                    user_id,
                    job_id,
                    score,
                    total_questions,
                    readiness_level,
                    skill_performance
                )
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING
                result_id,
                user_id,
                job_id,
                score,
                total_questions,
                readiness_level,
                skill_performance,
                created_at`,
            [
                userId,
                jobId,
                score,
                totalQuestions,
                readinessLevel,
                JSON.stringify(skillPerformance)
            ]
        );

        const resultId = result.rows[0].result_id;

        for (const skill of skillPerformance) {
            let skillId = skill.skillId || null;

            if (!skillId && skill.skillName) {
                const skillLookup = await client.query(
                    `SELECT skill_id
                     FROM skills
                     WHERE LOWER(name) = LOWER($1)
                     LIMIT 1`,
                    [skill.skillName]
                );

                if (skillLookup.rows.length > 0) {
                    skillId = skillLookup.rows[0].skill_id;
                }
            }

            await client.query(
                `INSERT INTO assessment_skill_results
                    (
                        result_id,
                        skill_id,
                        skill_name,
                        correct_answers,
                        total_questions,
                        percentage
                    )
                 VALUES ($1, $2, $3, $4, $5, $6)`,
                [
                    resultId,
                    skillId,
                    skill.skillName,
                    skill.correctAnswers,
                    skill.totalQuestions,
                    skill.percentage
                ]
            );
        }

        await client.query("COMMIT");

        res.status(201).json({
            message: "Assessment result saved successfully",
            result: result.rows[0]
        });

    } catch (error) {
        await client.query("ROLLBACK");

        console.error("Save assessment error:", error);

        res.status(500).json({
            message: "Failed to save assessment result"
        });

    } finally {
        client.release();
    }
};


/*
 * GET ASSESSMENT HISTORY
 *
 * Returns all assessment results belonging
 * to the currently logged-in user.
 */
const getAssessmentHistory = async (req, res) => {
    try {
        const userId = req.user.userId;

        const result = await pool.query(
            `
            SELECT
                ar.result_id,
                ar.user_id,
                ar.job_id,
                j.title AS job_title,
                ar.score,
                ar.total_questions,
                ar.readiness_level,
                ar.skill_performance,
                ar.created_at
            FROM assessment_results ar
            INNER JOIN jobs j
                ON ar.job_id = j.job_id
            WHERE ar.user_id = $1
            ORDER BY ar.created_at DESC
            `,
            [userId]
        );

        res.status(200).json({
            assessments: result.rows
        });

    } catch (error) {
        console.error(
            "Get assessment history error:",
            error
        );

        res.status(500).json({
            message: "Failed to fetch assessment history"
        });
    }
};


module.exports = {
    saveAssessmentResult,
    getAssessmentHistory
};