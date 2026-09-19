const pool = require("../config/db");

/*
 * GET ALL JOBS
 */
const getJobs = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                j.job_id,
                j.title,
                j.description,
                j.created_at,
                r.name AS role_name,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'skill_id', s.skill_id,
                            'skill', s.name,
                            'importance', js.importance,
                            'source', js.source
                        )
                        ORDER BY s.skill_id
                    ) FILTER (WHERE s.skill_id IS NOT NULL),
                    '[]'
                ) AS skills
            FROM jobs j
            LEFT JOIN roles r
                ON j.role_id = r.role_id
            LEFT JOIN job_skills js
                ON j.job_id = js.job_id
            LEFT JOIN skills s
                ON js.skill_id = s.skill_id
            GROUP BY 
                j.job_id,
                j.title,
                j.description,
                j.created_at,
                r.name
            ORDER BY j.job_id;
        `);

        res.status(200).json({
            jobs: result.rows
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch jobs"
        });
    }
};


/*
 * GET JOB MATCH
 *
 * Compares the user's latest assessment
 * with the skills required for a job.
 */
const getJobMatch = async (req, res) => {
    try {
        const userId = req.user.userId;
        const jobId = parseInt(req.params.jobId, 10);

        if (!Number.isInteger(jobId)) {
            return res.status(400).json({
                message: "Invalid job ID"
            });
        }

        /*
         * Get the latest assessment for this user and job.
         */
        const assessmentResult = await pool.query(
            `
            SELECT
                result_id,
                score,
                total_questions,
                readiness_level,
                created_at
            FROM assessment_results
            WHERE user_id = $1
              AND job_id = $2
            ORDER BY created_at DESC
            LIMIT 1
            `,
            [userId, jobId]
        );

        if (assessmentResult.rows.length === 0) {
            return res.status(404).json({
                message: "No assessment found for this job"
            });
        }

        const assessment = assessmentResult.rows[0];

        /*
         * Get the skills required by the job
         * together with the user's latest performance.
         */
        const skillResult = await pool.query(
            `
            SELECT
                s.skill_id,
                s.name AS skill,
                js.importance,
                COALESCE(asr.percentage, 0) AS percentage
            FROM job_skills js
            INNER JOIN skills s
                ON js.skill_id = s.skill_id
            LEFT JOIN assessment_skill_results asr
                ON asr.skill_id = js.skill_id
                AND asr.result_id = $1
            WHERE js.job_id = $2
            ORDER BY s.skill_id
            `,
            [assessment.result_id, jobId]
        );

        if (skillResult.rows.length === 0) {
            return res.status(404).json({
                message: "No skills found for this job"
            });
        }

        /*
         * Calculate weighted job match.
         *
         * High importance = weight 2
         * Medium importance = weight 1
         */
        let weightedScore = 0;
        let totalWeight = 0;

        const strongSkills = [];
        const skillsToImprove = [];

        skillResult.rows.forEach((skill) => {
            const percentage = Number(skill.percentage);
            const weight =
                skill.importance === "High" ? 2 : 1;

            weightedScore += percentage * weight;
            totalWeight += weight;

            if (percentage >= 70) {
                strongSkills.push(skill.skill);
            } else {
                skillsToImprove.push(skill.skill);
            }
        });

        const matchPercentage =
            totalWeight > 0
                ? Math.round(weightedScore / totalWeight)
                : 0;

        res.status(200).json({
            jobId,
            jobTitle: skillResult.rows.length > 0
            ? `Job #${jobId}`
            : `Job #${jobId}`,
            matchPercentage,
            strongSkills,
            skillsToImprove,
            skills: skillResult.rows,
            assessment: {
                resultId: assessment.result_id,
                score: assessment.score,
                totalQuestions: assessment.total_questions,
                readinessLevel: assessment.readiness_level,
                createdAt: assessment.created_at
            }
        });

    } catch (error) {
        console.error("Job match error:", error);

        res.status(500).json({
            message: "Failed to calculate job match"
        });
    }
};


module.exports = {
    getJobs,
    getJobMatch
};