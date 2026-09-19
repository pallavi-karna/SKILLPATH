import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000";
const TOKEN_KEY = "skillpath_token";

/* =========================
   ASSESSMENT QUESTIONS
========================= */

const questionBank = [
    // ==================== JAVA ====================

    {
        id: 1,
        skill: "Java",
        question: "Which keyword is used to define a class in Java?",
        options: ["class", "struct", "define", "object"],
        answer: "class"
    },
    {
        id: 2,
        skill: "Java",
        question: "Which method is the entry point of a Java application?",
        options: ["start()", "main()", "run()", "execute()"],
        answer: "main()"
    },
    {
        id: 3,
        skill: "Java",
        question: "What is it called when multiple methods have the same name but different parameters?",
        options: [
            "Method Overriding",
            "Method Overloading",
            "Inheritance",
            "Encapsulation"
        ],
        answer: "Method Overloading"
    },
    {
        id: 11,
        skill: "Java",
        question: "Which keyword is used to create an object in Java?",
        options: ["new", "create", "object", "instance"],
        answer: "new"
    },
    {
        id: 12,
        skill: "Java",
        question: "Which concept allows one class to acquire properties of another class?",
        options: [
            "Inheritance",
            "Encapsulation",
            "Abstraction",
            "Compilation"
        ],
        answer: "Inheritance"
    },
    {
        id: 13,
        skill: "Java",
        question: "Which keyword is used to inherit a class in Java?",
        options: ["extends", "inherits", "implements", "super"],
        answer: "extends"
    },
    {
        id: 14,
        skill: "Java",
        question: "Which data type is used to store true or false values?",
        options: ["boolean", "bool", "bit", "logical"],
        answer: "boolean"
    },

    // ==================== SQL ====================

    {
        id: 4,
        skill: "SQL",
        question: "Which SQL command is used to retrieve data from a table?",
        options: ["SELECT", "GET", "FETCH", "RETRIEVE"],
        answer: "SELECT"
    },
    {
        id: 5,
        skill: "SQL",
        question: "Which SQL clause is used to filter rows?",
        options: ["WHERE", "FILTER", "HAVING", "SEARCH"],
        answer: "WHERE"
    },
    {
        id: 15,
        skill: "SQL",
        question: "Which SQL command is used to add a new row to a table?",
        options: ["INSERT", "ADD", "CREATE", "UPDATE"],
        answer: "INSERT"
    },
    {
        id: 16,
        skill: "SQL",
        question: "Which SQL command is used to modify existing data?",
        options: ["UPDATE", "MODIFY", "CHANGE", "ALTER"],
        answer: "UPDATE"
    },
    {
        id: 17,
        skill: "SQL",
        question: "Which SQL command is used to remove rows from a table?",
        options: ["DELETE", "REMOVE", "DROP", "CLEAR"],
        answer: "DELETE"
    },
    {
        id: 18,
        skill: "SQL",
        question: "Which clause is commonly used to group rows with the same values?",
        options: ["GROUP BY", "ORDER BY", "SORT BY", "COLLECT BY"],
        answer: "GROUP BY"
    },

    // ==================== POSTGRESQL ====================

    {
        id: 6,
        skill: "PostgreSQL",
        question: "What type of database is PostgreSQL?",
        options: [
            "Relational database",
            "NoSQL database",
            "Document database",
            "Key-value database"
        ],
        answer: "Relational database"
    },
    {
        id: 19,
        skill: "PostgreSQL",
        question: "Which command is commonly used to connect to a PostgreSQL database from the terminal?",
        options: ["psql", "pgconnect", "postgres", "connectpg"],
        answer: "psql"
    },
    {
        id: 20,
        skill: "PostgreSQL",
        question: "Which PostgreSQL data type is commonly used to store variable-length text?",
        options: ["VARCHAR", "TEXTFILE", "STRING", "CHARACTERSET"],
        answer: "VARCHAR"
    },
    {
        id: 21,
        skill: "PostgreSQL",
        question: "Which command is used to create a new database in PostgreSQL?",
        options: [
            "CREATE DATABASE",
            "NEW DATABASE",
            "MAKE DATABASE",
            "ADD DATABASE"
        ],
        answer: "CREATE DATABASE"
    },
    {
        id: 22,
        skill: "PostgreSQL",
        question: "Which PostgreSQL feature can automatically generate sequential numeric values?",
        options: ["SERIAL", "AUTO", "SEQUENCEINT", "INCREMENTER"],
        answer: "SERIAL"
    },

    // ==================== GIT ====================

    {
        id: 7,
        skill: "Git",
        question: "Which command is used to create a new Git repository?",
        options: ["git init", "git start", "git create", "git new"],
        answer: "git init"
    },
    {
        id: 8,
        skill: "Git",
        question: "Which command saves changes to the local Git repository?",
        options: ["git commit", "git save", "git push", "git store"],
        answer: "git commit"
    },
    {
        id: 23,
        skill: "Git",
        question: "Which command shows the current state of a Git repository?",
        options: [
            "git status",
            "git state",
            "git check",
            "git info"
        ],
        answer: "git status"
    },
    {
        id: 24,
        skill: "Git",
        question: "Which command is used to create a new Git branch?",
        options: [
            "git branch",
            "git new-branch",
            "git create",
            "git fork"
        ],
        answer: "git branch"
    },
    {
        id: 25,
        skill: "Git",
        question: "Which command switches to another Git branch?",
        options: [
            "git checkout",
            "git switcher",
            "git move",
            "git branch-change"
        ],
        answer: "git checkout"
    },
    {
        id: 26,
        skill: "Git",
        question: "Which command downloads changes from a remote repository without merging them?",
        options: [
            "git fetch",
            "git download",
            "git pull-only",
            "git receive"
        ],
        answer: "git fetch"
    },

    // ==================== GITHUB ====================

    {
        id: 9,
        skill: "GitHub",
        question: "What is GitHub mainly used for?",
        options: [
            "Code hosting and collaboration",
            "Video editing",
            "Database administration",
            "Graphic design"
        ],
        answer: "Code hosting and collaboration"
    },
    {
        id: 10,
        skill: "GitHub",
        question: "Which Git command sends local commits to a remote repository?",
        options: ["git push", "git send", "git upload", "git transfer"],
        answer: "git push"
    },
    {
        id: 27,
        skill: "GitHub",
        question: "What is a GitHub repository?",
        options: [
            "A place to store and manage project code",
            "A programming language",
            "A database server",
            "A code compiler"
        ],
        answer: "A place to store and manage project code"
    },
    {
        id: 28,
        skill: "GitHub",
        question: "What is a pull request used for?",
        options: [
            "Proposing and reviewing code changes",
            "Deleting a repository",
            "Installing Git",
            "Creating a database"
        ],
        answer: "Proposing and reviewing code changes"
    },
    {
        id: 29,
        skill: "GitHub",
        question: "What is a fork on GitHub?",
        options: [
            "A personal copy of another repository",
            "A deleted repository",
            "A Git command",
            "A database backup"
        ],
        answer: "A personal copy of another repository"
    },
    {
        id: 30,
        skill: "GitHub",
        question: "Which file is commonly used to describe a project on GitHub?",
        options: ["README.md", "PROJECT.txt", "ABOUT.git", "INFO.js"],
        answer: "README.md"
    },

    // ==================== PYTHON ====================

    {
        id: 31,
        skill: "Python",
        question: "Which keyword is used to define a function in Python?",
        options: ["def", "func", "function", "define"],
        answer: "def"
    },
    {
        id: 32,
        skill: "Python",
        question: "Which data type stores key-value pairs in Python?",
        options: ["Dictionary", "List", "Tuple", "Set"],
        answer: "Dictionary"
    },
    {
        id: 33,
        skill: "Python",
        question: "Which symbol starts a single-line comment in Python?",
        options: ["#", "//", "/*", "--"],
        answer: "#"
    },
    {
        id: 34,
        skill: "Python",
        question: "Which function returns the number of items in a Python list?",
        options: ["len()", "size()", "length()", "count()"],
        answer: "len()"
    },
    {
        id: 35,
        skill: "Python",
        question: "Which keyword is used to iterate over items in a sequence?",
        options: ["for", "loop", "repeat", "iterate"],
        answer: "for"
    },

    // ==================== HTML ====================

    {
        id: 36,
        skill: "HTML",
        question: "What does HTML stand for?",
        options: [
            "HyperText Markup Language",
            "HighText Machine Language",
            "Hyperlink Text Management Language",
            "Home Tool Markup Language"
        ],
        answer: "HyperText Markup Language"
    },
    {
        id: 37,
        skill: "HTML",
        question: "Which HTML tag creates a hyperlink?",
        options: ["<a>", "<link>", "<href>", "<url>"],
        answer: "<a>"
    },
    {
        id: 38,
        skill: "HTML",
        question: "Which HTML tag represents the largest heading?",
        options: ["<h1>", "<h6>", "<head>", "<title>"],
        answer: "<h1>"
    },
    {
        id: 39,
        skill: "HTML",
        question: "Which HTML tag is used to display an image?",
        options: ["<img>", "<image>", "<pic>", "<src>"],
        answer: "<img>"
    },
    {
        id: 40,
        skill: "HTML",
        question: "Which HTML element creates an unordered list?",
        options: ["<ul>", "<ol>", "<li>", "<list>"],
        answer: "<ul>"
    },

    // ==================== CSS ====================

    {
        id: 41,
        skill: "CSS",
        question: "What does CSS stand for?",
        options: [
            "Cascading Style Sheets",
            "Computer Style System",
            "Creative Styling System",
            "Coded Style Sheets"
        ],
        answer: "Cascading Style Sheets"
    },
    {
        id: 42,
        skill: "CSS",
        question: "Which CSS property changes the text color?",
        options: ["color", "font-color", "text-color", "foreground"],
        answer: "color"
    },
    {
        id: 43,
        skill: "CSS",
        question: "Which CSS property changes the background color?",
        options: ["background-color", "bg-color", "background", "color"],
        answer: "background-color"
    },
    {
        id: 44,
        skill: "CSS",
        question: "Which CSS property controls the size of text?",
        options: ["font-size", "text-size", "font-style", "text-height"],
        answer: "font-size"
    },
    {
        id: 45,
        skill: "CSS",
        question: "Which CSS layout system is commonly used to arrange items in a row or column?",
        options: ["Flexbox", "FloatBox", "PositionBox", "StyleBox"],
        answer: "Flexbox"
    },

    // ==================== JAVASCRIPT ====================

    {
        id: 46,
        skill: "JavaScript",
        question: "Which keyword declares a block-scoped variable that can be reassigned?",
        options: ["let", "const", "varname", "define"],
        answer: "let"
    },
    {
        id: 47,
        skill: "JavaScript",
        question: "Which operator checks strict equality in JavaScript?",
        options: ["===", "=", "==", "!="],
        answer: "==="
    },
    {
        id: 48,
        skill: "JavaScript",
        question: "Which method adds an item to the end of a JavaScript array?",
        options: ["push()", "add()", "append()", "insert()"],
        answer: "push()"
    },
    {
        id: 49,
        skill: "JavaScript",
        question: "Which keyword declares a constant in JavaScript?",
        options: ["const", "constant", "fixed", "let"],
        answer: "const"
    },
    {
        id: 50,
        skill: "JavaScript",
        question: "Which command prints a message to the browser console?",
        options: ["console.log()", "print()", "log.console()", "browser.log()"],
        answer: "console.log()"
    }

];

/* =========================
   ASSESSMENT HELPERS
========================= */

const shuffleArray = (items) => {
    return [...items].sort(() => Math.random() - 0.5);
};

/*
 * Create a 20-question assessment for the selected job.
 *
 * The questions come only from skills required by that job.
 * 5 required skills  -> 4 questions per skill
 * 4 required skills  -> 5 questions per skill
 */
const createAssessmentQuestions = (job) => {
    const requiredSkills = [
        ...new Map(
            (job?.skills || []).map((jobSkill) => [
                jobSkill.skill?.toLowerCase(),
                jobSkill.skill
            ])
        ).values()
    ].filter(Boolean);

    if (requiredSkills.length === 0) {
        return [];
    }

    const baseQuestionsPerSkill = Math.floor(
        20 / requiredSkills.length
    );

    const extraQuestions =
        20 % requiredSkills.length;

    const selectedQuestions = [];

    requiredSkills.forEach((skillName, skillIndex) => {
        const skillQuestions = questionBank.filter(
            (question) =>
                question.skill.toLowerCase() ===
                skillName.toLowerCase()
        );

        const questionsNeeded =
            baseQuestionsPerSkill +
            (skillIndex < extraQuestions ? 1 : 0);

        if (skillQuestions.length < questionsNeeded) {
            console.error(
                `Not enough questions for ${skillName}. ` +
                `Needed ${questionsNeeded}, found ${skillQuestions.length}.`
            );
            return;
        }

        selectedQuestions.push(
            ...shuffleArray(skillQuestions).slice(
                0,
                questionsNeeded
            )
        );
    });

    return shuffleArray(selectedQuestions).map(
        (question) => ({
            ...question,
            options: shuffleArray(question.options)
        })
    );
};

/* =========================
   APP
========================= */

function App() {
    /* ---------- JOBS ---------- */

    const [jobs, setJobs] = useState([]);
    const [loadingJobs, setLoadingJobs] = useState(true);
    const [jobError, setJobError] = useState("");

    /* ---------- AUTH ---------- */

    const [token, setToken] = useState(
        localStorage.getItem(TOKEN_KEY) || ""
    );

    const [user, setUser] = useState(null);

    const [authMode, setAuthMode] = useState(null);
    const [authLoading, setAuthLoading] = useState(false);
    const [authError, setAuthError] = useState("");
    const [authMessage, setAuthMessage] = useState("");

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [registerName, setRegisterName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    /* ---------- JOB MODAL ---------- */

    const [selectedJob, setSelectedJob] = useState(null);

    /* ---------- ASSESSMENT ---------- */

    const [assessmentStarted, setAssessmentStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [assessmentQuestions, setAssessmentQuestions] =
    useState(questionBank);
    const [assessmentCompleted, setAssessmentCompleted] = useState(false);
    const [result, setResult] = useState(null);

    // Stores the job for which the current assessment is being taken
    const [assessmentJob, setAssessmentJob] = useState(null);

    // Shows whether the completed assessment was saved to the backend
    const [assessmentSaveStatus, setAssessmentSaveStatus] = useState("");

    /* ---------- ASSESSMENT HISTORY ---------- */

    const [assessmentHistory, setAssessmentHistory] = useState([]);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [historyError, setHistoryError] = useState("");
    const [showHistory, setShowHistory] = useState(false);

    const [jobMatch, setJobMatch] = useState(null);
    const [jobMatchLoading, setJobMatchLoading] = useState(false);
    const [jobMatchError, setJobMatchError] = useState("");

    /* =========================
       FETCH JOBS
    ========================= */

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            setLoadingJobs(true);

            const response = await fetch(`${API_URL}/api/jobs`);

            if (!response.ok) {
                throw new Error("Failed to fetch jobs");
            }

            const data = await response.json();

            setJobs(data.jobs || []);
            setJobError("");
        } catch (error) {
            console.error(error);
            setJobError("Unable to load jobs. Please make sure the backend is running.");
        } finally {
            setLoadingJobs(false);
        }
    };

    /* =========================
       GET PROFILE
    ========================= */

    useEffect(() => {
        if (token) {
            fetchProfile();
        }
    }, [token]);

    const fetchProfile = async () => {
        try {
            const response = await fetch(
                `${API_URL}/api/auth/profile`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Invalid token");
            }

            const data = await response.json();

            setUser(data.user);
        } catch (error) {
            console.error(error);

            localStorage.removeItem(TOKEN_KEY);
            setToken("");
            setUser(null);
        }
    };

    /* =========================
       LOGIN
    ========================= */

    const handleLogin = async (e) => {
        e.preventDefault();

        setAuthLoading(true);
        setAuthError("");
        setAuthMessage("");

        try {
            const response = await fetch(
                `${API_URL}/api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: loginEmail,
                        password: loginPassword,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            localStorage.setItem(TOKEN_KEY, data.token);

            setToken(data.token);

            setAuthMessage("Login successful!");

            setLoginEmail("");
            setLoginPassword("");

            setTimeout(() => {
                setAuthMode(null);
                setAuthMessage("");
            }, 700);
        } catch (error) {
            setAuthError(error.message);
        } finally {
            setAuthLoading(false);
        }
    };

    /* =========================
       REGISTER
    ========================= */

    const handleRegister = async (e) => {
        e.preventDefault();

        setAuthLoading(true);
        setAuthError("");
        setAuthMessage("");

        try {
            const response = await fetch(
                `${API_URL}/api/auth/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: registerName,
                        email: registerEmail,
                        password: registerPassword,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Registration failed"
                );
            }

            setAuthMessage(
                "Registration successful! You can now login."
            );

            setRegisterName("");
            setRegisterEmail("");
            setRegisterPassword("");

            setTimeout(() => {
                setAuthMode("login");
                setAuthMessage("");
            }, 1000);
        } catch (error) {
            setAuthError(error.message);
        } finally {
            setAuthLoading(false);
        }
    };

    /* =========================
       ASSESSMENT HISTORY
    ========================= */

    const fetchAssessmentHistory = async () => {
        if (!token) {
            setAssessmentHistory([]);
            setHistoryError("Please login to view your assessment history.");
            return;
        }

        try {
            setHistoryLoading(true);
            setHistoryError("");

            const response = await fetch(
                `${API_URL}/api/assessments/history`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to fetch assessment history"
                );
            }

            setAssessmentHistory(data.assessments || []);
        } catch (error) {
            console.error("Assessment history error:", error);
            setHistoryError(
                error.message || "Unable to load assessment history."
            );
        } finally {
            setHistoryLoading(false);
        }
    };

    const fetchJobMatch = async (jobId) => {
    if (!token || !jobId) {
        return;
    }

    setJobMatchLoading(true);
    setJobMatchError("");

    try {
        const response = await fetch(
            `${API_URL}/api/jobs/${jobId}/match`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Failed to fetch job match"
            );
        }

        setJobMatch(data);

    } catch (error) {
        console.error("Job match error:", error);
        setJobMatch(null);
        setJobMatchError(error.message);

    } finally {
        setJobMatchLoading(false);
    }
};

    const toggleHistory = () => {
        const nextValue = !showHistory;

        setShowHistory(nextValue);

        if (nextValue) {
            fetchAssessmentHistory();
        }
    };

    /* =========================
       LOGOUT
    ========================= */

    const handleLogout = () => {
        localStorage.removeItem(TOKEN_KEY);

        setToken("");
        setUser(null);

        setAssessmentHistory([]);
        setHistoryError("");
        setShowHistory(false);

        setAuthMode(null);

        alert("Logged out successfully.");
    };

    /* =========================
       START ASSESSMENT
    ========================= */

    const startAssessment = () => {
        if (!selectedJob) {
            return;
        }

        const newAssessmentQuestions =
            createAssessmentQuestions(selectedJob);

        if (newAssessmentQuestions.length !== 20) {
            alert(
                "This job does not have enough assessment questions yet."
            );
            return;
        }

        setAssessmentQuestions(newAssessmentQuestions);
        setAssessmentJob(selectedJob);
        setAnswers({});
        setCurrentQuestion(0);
        setAssessmentCompleted(false);
        setResult(null);
        setAssessmentSaveStatus("");
        setJobMatch(null);
        setJobMatchError("");
        setAssessmentStarted(true);
        setSelectedJob(null);
    };

    /* =========================
       SELECT ANSWER
    ========================= */

    const selectAnswer = (answer) => {
        setAnswers((previous) => ({
            ...previous,
            [assessmentQuestions[currentQuestion].id]: answer,
        }));
    };

    /* =========================
       NEXT QUESTION
    ========================= */

    const nextQuestion = () => {
        if (
            currentQuestion <
            assessmentQuestions.length - 1
        ) {
            setCurrentQuestion((previous) => previous + 1);
        } else {
            finishAssessment();
        }
    };

    /* =========================
       PREVIOUS QUESTION
    ========================= */

    const previousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((previous) => previous - 1);
        }
    };

    /* =========================
       FINISH ASSESSMENT
    ========================= */

    const finishAssessment = async () => {
        let correct = 0;

        const skillStats = {};

        assessmentQuestions.forEach((question) => {
            if (!skillStats[question.skill]) {
                skillStats[question.skill] = {
                    correct: 0,
                    total: 0,
                };
            }

            skillStats[question.skill].total += 1;

            if (
                answers[question.id] ===
                question.answer
            ) {
                correct += 1;
                skillStats[question.skill].correct += 1;
            }
        });

        const score = Math.round(
            (correct / assessmentQuestions.length) * 100
        );

        let readiness = "Needs Improvement";

        if (score >= 80) {
            readiness = "Excellent";
        } else if (score >= 60) {
            readiness = "Good";
        } else if (score >= 40) {
            readiness = "Average";
        }

        const strongSkills = [];
        const weakSkills = [];

        Object.entries(skillStats).forEach(
            ([skill, stats]) => {
                const percentage = Math.round(
                    (stats.correct / stats.total) * 100
                );

                if (percentage >= 70) {
                    strongSkills.push(skill);
                }

                if (percentage < 70) {
                    weakSkills.push(skill);
                }
            }
        );

        // Convert the frontend skill statistics into the format
        // expected by the backend assessment API.
        const skillPerformance = Object.entries(
            skillStats
        ).map(([skillName, stats]) => {
            const percentage = Math.round(
                (stats.correct / stats.total) * 100
            );

            // Match the assessment skill with the selected
            // job skill so the backend can store skill_id.
            const matchingJobSkill =
                assessmentJob?.skills?.find(
                    (jobSkill) =>
                        jobSkill.skill?.toLowerCase() ===
                        skillName.toLowerCase()
                );

            return {
                skillId:
                    matchingJobSkill?.skill_id || null,
                skillName,
                correctAnswers: stats.correct,
                totalQuestions: stats.total,
                percentage,
            };
        });

        setResult({
            score,
            correct,
            total: assessmentQuestions.length,
            readiness,
            skillStats,
            strongSkills,
            weakSkills,
        });

        setAssessmentCompleted(true);

        /*
         * Save the completed assessment to PostgreSQL.
         *
         * If the user is logged in, send the JWT in the
         * Authorization header.
         */
        if (!token) {
            setAssessmentSaveStatus(
                "Assessment completed. Login to save your result."
            );
            return;
        }

        if (!assessmentJob?.job_id) {
            setAssessmentSaveStatus(
                "Assessment completed, but no job was selected. Result was not saved."
            );
            return;
        }

        setAssessmentSaveStatus(
            "Saving assessment result..."
        );

        try {
            const response = await fetch(
                `${API_URL}/api/assessments/results`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        jobId: assessmentJob.job_id,
                        score,
                        totalQuestions:
                            assessmentQuestions.length,
                        readinessLevel: readiness,
                        skillPerformance,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
    setAssessmentSaveStatus(
        "✓ Assessment result saved successfully."
    );

    console.log(
        "Assessment result saved:",
        data
    );

    if (assessmentJob?.job_id) {
        fetchJobMatch(assessmentJob.job_id);
    }

} else if (
    response.status === 401 ||
    response.status === 403
) {
    setAssessmentSaveStatus(
        "Assessment completed, but your login session expired. Result was not saved."
    );

} else {
    setAssessmentSaveStatus(
        "Assessment completed, but the result could not be saved."
    );

    console.error(
        "Assessment save failed:",
        data
    );
}
        } catch (error) {
            console.error(
                "Assessment save error:",
                error
            );

            setAssessmentSaveStatus(
                "Assessment completed, but the result could not be saved."
            );
        }
    };

    /* =========================
       RETAKE
    ========================= */

    const retakeAssessment = () => {
        if (!assessmentJob) {
            return;
        }

        const newAssessmentQuestions =
            createAssessmentQuestions(assessmentJob);

        if (newAssessmentQuestions.length !== 20) {
            setAssessmentSaveStatus(
                "Unable to create a 20-question assessment for this job."
            );
            return;
        }

        setAssessmentQuestions(newAssessmentQuestions);
        setAnswers({});
        setCurrentQuestion(0);
        setAssessmentCompleted(false);
        setResult(null);
        setAssessmentSaveStatus("");
        setJobMatch(null);
        setJobMatchError("");
        setAssessmentStarted(true);
    };

    /* =========================
       CLOSE ALL MODALS
    ========================= */

    const closeAssessment = () => {
        setAssessmentStarted(false);
        setAssessmentCompleted(false);
        setAssessmentJob(null);
        setResult(null);
        setAssessmentSaveStatus("");
        setJobMatch(null);
        setJobMatchError("");
    };

    /* =========================
       SCROLL TO JOBS
    ========================= */

    const scrollToJobs = () => {
        const element = document.getElementById("jobs");

        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
            });
        }
    };

    /* =========================
       CURRENT QUESTION
    ========================= */

    const question =
        assessmentQuestions[currentQuestion];

    /* =========================
       UI
    ========================= */

    return (
        <div className="app">

            {/* =========================
                NAVBAR
            ========================= */}

            <nav className="navbar">

                <div
                    className="navbar-logo"
                    onClick={() =>
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                        })
                    }
                >
                    SkillPath
                </div>

                <div className="navbar-links">

                    <button
                        onClick={scrollToJobs}
                    >
                        Jobs
                    </button>

                    <button
                        onClick={scrollToJobs}
                    >
                        Skills
                    </button>

                    <button
                        onClick={() =>
                            alert(
                                "SkillPath is a Job Readiness & Skill Assessment Platform."
                            )
                        }
                    >
                        About
                    </button>

                    {!user ? (
                        <>
                            <button
                                className="nav-auth-button"
                                onClick={() => {
                                    setAuthMode("login");
                                    setAuthError("");
                                    setAuthMessage("");
                                }}
                            >
                                Login
                            </button>

                            <button
                                className="nav-register-button"
                                onClick={() => {
                                    setAuthMode("register");
                                    setAuthError("");
                                    setAuthMessage("");
                                }}
                            >
                                Register
                            </button>
                        </>
                    ) : (
                        <div className="user-menu">

                            <span className="welcome-user">
                                Hi, {user.name || user.email}
                            </span>

                            <button
                                className="nav-auth-button"
                                onClick={toggleHistory}
                            >
                                {showHistory
                                    ? "Hide History"
                                    : "My Assessments"}
                            </button>

                            <button
                                className="nav-logout-button"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>

                        </div>
                    )}

                </div>
            </nav>

            {/* =========================
                HERO
            ========================= */}

            <section className="hero">

                <div className="hero-label">
                    JOB READINESS PLATFORM
                </div>

                <h1>
                    Build Skills.
                    <br />
                    <span>Get Job Ready.</span>
                </h1>

                <p>
                    Discover the skills required for
                    real-world jobs and track your
                    readiness with SkillPath.
                </p>

                <button
                    className="primary-button"
                    onClick={scrollToJobs}
                >
                    Explore Jobs
                </button>

            </section>

            {/* =========================
                ASSESSMENT HISTORY
            ========================= */}

            {showHistory && user && (
                <section className="jobs-section assessment-history-section">

                    <div className="section-label">
                        YOUR PROGRESS
                    </div>

                    <h2>
                        My Assessments
                    </h2>

                    <p className="job-description">
                        View your previous job readiness assessment results.
                    </p>

                    {historyLoading && (
                        <p className="loading-text">
                            Loading assessment history...
                        </p>
                    )}

                    {historyError && (
                        <p className="error-text">
                            {historyError}
                        </p>
                    )}

                    {!historyLoading &&
                        !historyError &&
                        assessmentHistory.length === 0 && (
                            <p>
                                No assessment history found. Complete an
                                assessment to see your results here.
                            </p>
                        )}

                    {!historyLoading &&
                        !historyError &&
                        assessmentHistory.length > 0 && (
                            <div className="jobs-container">

                                {assessmentHistory.map((assessment) => (
                                    <div
                                        className="job-card"
                                        key={assessment.result_id}
                                    >

                                        <div className="job-card-top">
                                            <span className="job-id">
                                                ASSESSMENT #
                                                {assessment.result_id}
                                            </span>

                                            <span className="job-role">
                                                {assessment.readiness_level}
                                            </span>
                                        </div>

                                        <h3>
                                            {assessment.job_title}
                                        </h3>

                                        <p className="job-description">
                                            Score:{" "}
                                            <strong>
                                                {Math.round(
                                                    (assessment.score /
                                                        assessment.total_questions) *
                                                        100
                                                )}
                                                %
                                            </strong>
                                            {" "}(
                                            {assessment.score}/
                                            {assessment.total_questions} correct)
                                        </p>

                                        <div className="skills-heading">
                                            <strong>
                                                Skill Performance
                                            </strong>

                                            <span>
                                                {assessment.skill_performance
                                                    ?.length || 0} skills
                                            </span>
                                        </div>

                                        <div className="job-skills">

                                            {assessment.skill_performance?.map(
                                                (skill) => (
                                                    <div
                                                        className="skill-row"
                                                        key={`${assessment.result_id}-${skill.skillId || skill.skillName}`}
                                                    >
                                                        <span>
                                                            {skill.skillName}
                                                        </span>

                                                        <span
                                                            className={
                                                                skill.percentage >= 70
                                                                    ? "importance-high"
                                                                    : "importance-medium"
                                                            }
                                                        >
                                                            {skill.percentage}%
                                                        </span>
                                                    </div>
                                                )
                                            )}

                                        </div>

                                        <p
                                            style={{
                                                marginTop: "16px",
                                                fontSize: "14px",
                                                opacity: 0.7
                                            }}
                                        >
                                            Completed:{" "}
                                            {new Date(
                                                assessment.created_at
                                            ).toLocaleString()}
                                        </p>

                                    </div>
                                ))}

                            </div>
                        )}

                </section>
            )}

            {/* =========================
                JOBS
            ========================= */}

            <section
                className="jobs-section"
                id="jobs"
            >

                <div className="section-label">
                    OPPORTUNITIES
                </div>

                <h2>
                    Available Jobs
                </h2>

                {loadingJobs && (
                    <p className="loading-text">
                        Loading jobs...
                    </p>
                )}

                {jobError && (
                    <p className="error-text">
                        {jobError}
                    </p>
                )}

                {!loadingJobs &&
                    !jobError &&
                    jobs.length === 0 && (
                        <p>
                            No jobs available.
                        </p>
                    )}

                <div className="jobs-container">

                    {jobs.map((job) => (

                        <div
                            className="job-card"
                            key={job.job_id}
                        >

                            <div className="job-card-top">

                                <span className="job-id">
                                    JOB #{job.job_id}
                                </span>

                                <span className="job-role">
                                    {job.role_name ||
                                        "Software Engineer"}
                                </span>

                            </div>

                            <h3>
                                {job.title}
                            </h3>

                            <p className="job-description">
                                {job.description}
                            </p>

                            <div className="skills-heading">
                                <strong>
                                    Required Skills
                                </strong>

                                <span>
                                    {job.skills?.length || 0} skills
                                </span>
                            </div>

                            <div className="job-skills">

                                {job.skills?.map(
                                    (skill) => (

                                        <div
                                            className="skill-row"
                                            key={skill.skill_id}
                                        >

                                            <span>
                                                {skill.skill}
                                            </span>

                                            <span
                                                className={
                                                    skill.importance ===
                                                    "High"
                                                        ? "importance-high"
                                                        : "importance-medium"
                                                }
                                            >
                                                {skill.importance}
                                            </span>

                                        </div>
                                    )
                                )}

                            </div>

                            <button
                                className="view-job-button"
                                onClick={() =>
                                    setSelectedJob(job)
                                }
                            >
                                View Job
                            </button>

                        </div>

                    ))}

                </div>

            </section>

            {/* =========================
                FOOTER
            ========================= */}

            <footer className="footer">

                <div className="footer-logo">
                    SkillPath
                </div>

                <p>
                    Job Readiness & Skill Assessment
                    Platform
                </p>

            </footer>

            {/* =========================
                JOB MODAL
            ========================= */}

            {selectedJob && (

                <div className="modal-overlay">

                    <div className="job-modal">

                        <button
                            className="close-button"
                            onClick={() =>
                                setSelectedJob(null)
                            }
                        >
                            ×
                        </button>

                        <div className="modal-label">
                            JOB DETAILS
                        </div>

                        <h2>
                            {selectedJob.title}
                        </h2>

                        <p className="modal-description">
                            {selectedJob.description}
                        </p>

                        <h4>
                            Required Skills
                        </h4>

                        <div className="modal-skills">

                            {selectedJob.skills?.map(
                                (skill) => (

                                    <div
                                        className="modal-skill"
                                        key={skill.skill_id}
                                    >
                                        <span>
                                            {skill.skill}
                                        </span>

                                        <span
                                            className={
                                                skill.importance ===
                                                "High"
                                                    ? "importance-high"
                                                    : "importance-medium"
                                            }
                                        >
                                            {skill.importance}
                                        </span>
                                    </div>
                                )
                            )}

                        </div>

                        <button
                        className="start-assessment-button"
                        onClick={startAssessment}>
                            Start Skill Assessment
                        </button>

                    </div>

                </div>

            )}

            {/* =========================
                ASSESSMENT MODAL
            ========================= */}

            {assessmentStarted &&
                !assessmentCompleted && (

                    <div className="modal-overlay">

                        <div className="assessment-modal">

                            <button
                                className="close-button"
                                onClick={closeAssessment}
                            >
                                ×
                            </button>

                            <div className="modal-label">
                                SKILL ASSESSMENT
                            </div>

                            <h2>
                                Test Your Skills
                            </h2>

                            <p className="assessment-info">
                                Answer the following
                                questions to evaluate
                                your job readiness.
                            </p>

                            <div className="progress-container">

                                <div className="progress-text">
                                    Question{" "}
                                    {currentQuestion + 1}{" "}
                                    of{" "}
                                    {assessmentQuestions.length}
                                </div>

                                <div className="progress-bar">
                                    <div
                                        className="progress-fill"
                                        style={{
                                            width: `${
                                                ((currentQuestion + 1) /
                                                    assessmentQuestions.length) *
                                                100
                                            }%`,
                                        }}
                                    />
                                </div>

                            </div>

                            <div className="question-skill">
                                {question.skill}
                            </div>

                            <h3 className="question-text">
                                {question.question}
                            </h3>

                            <div className="options-container">

                                {question.options.map(
                                    (option) => (

                                        <button
                                            key={option}
                                            className={`option ${
                                                answers[
                                                    question.id
                                                ] === option
                                                    ? "selected"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                selectAnswer(
                                                    option
                                                )
                                            }
                                        >
                                            {option}
                                        </button>
                                    )
                                )}

                            </div>

                            <div className="assessment-navigation">

                                <button
                                    className="secondary-button"
                                    onClick={previousQuestion}
                                    disabled={
                                        currentQuestion === 0
                                    }
                                >
                                    Previous
                                </button>

                                <button
                                    className="primary-button"
                                    onClick={nextQuestion}
                                    disabled={
                                        !answers[
                                            question.id
                                        ]
                                    }
                                >
                                    {currentQuestion ===
                                    assessmentQuestions.length - 1
                                        ? "Finish Assessment"
                                        : "Next"}
                                </button>

                            </div>

                        </div>

                    </div>

                )}

            {/* =========================
                RESULT MODAL
            ========================= */}

            {assessmentCompleted &&
                result && (

                    <div className="modal-overlay">

                        <div className="result-modal">

                            <button
                                className="close-button"
                                onClick={closeAssessment}
                            >
                                ×
                            </button>

                            <div className="result-label">
                                ASSESSMENT COMPLETE
                            </div>

                            <h2>
                                Your Result
                            </h2>

                            <div className="score-circle">

                                <div className="score-number">
                                    {result.score}%
                                </div>

                                <div className="score-label">
                                    Score
                                </div>

                            </div>

                            <div className="score-count">
                                <strong>
                                    {result.correct}
                                </strong>
                                <span>
                                    {" "}
                                    out of{" "}
                                    {result.total} correct
                                </span>
                            </div>

                            <div className="readiness-box">

                                <h4>
                                    Job Readiness
                                </h4>

                                <p>
                                    {result.readiness ===
                                    "Excellent"
                                        ? "Excellent! You are highly prepared for this role."
                                        : result.readiness ===
                                          "Good"
                                        ? "Good! You have a solid foundation for this role."
                                        : result.readiness ===
                                          "Average"
                                        ? "You have a basic foundation but need more practice."
                                        : "You should improve your skills before applying for this role."}
                                </p>

                                <strong>
                                    Readiness Level:{" "}
                                    {result.readiness}
                                </strong>

                                {assessmentSaveStatus && (
                                    <p
                                        style={{
                                            marginTop: "12px",
                                            fontWeight: "600",
                                        }}
                                    >
                                        {assessmentSaveStatus}
                                    </p>
                                )}

                            </div>

                            <h4 className="performance-title">
                                Skill Performance
                            </h4>

                            <div className="performance-list">

                                {Object.entries(
                                    result.skillStats
                                ).map(
                                    ([skill, stats]) => {

                                        const percentage =
                                            Math.round(
                                                (stats.correct /
                                                    stats.total) *
                                                    100
                                            );

                                        return (
                                            <div
                                                className="performance-item"
                                                key={skill}
                                            >

                                                <div className="performance-header">

                                                    <span>
                                                        {skill}
                                                    </span>

                                                    <span>
                                                        {
                                                            stats.correct
                                                        }
                                                        /
                                                        {
                                                            stats.total
                                                        }{" "}
                                                        (
                                                        {
                                                            percentage
                                                        }
                                                        %)
                                                    </span>

                                                </div>

                                                <div className="performance-bar">

                                                    <div
                                                        className="performance-fill"
                                                        style={{
                                                            width: `${percentage}%`,
                                                        }}
                                                    />

                                                </div>

                                            </div>
                                        );
                                    }
                                )}

                            </div>

                            {/* JOB MATCH */}

                            {jobMatchLoading && (
                                <div
                                    style={{
                                        marginTop: "20px",
                                        padding: "16px",
                                        textAlign: "center",
                                    }}
                                >
                                    Calculating your job match...
                                </div>
                            )}

                            {jobMatchError && (
                                <div
                                    style={{
                                        marginTop: "20px",
                                        padding: "12px",
                                        borderRadius: "8px",
                                        background: "#fff5f5",
                                        color: "#b42318",
                                    }}
                                >
                                    Job match could not be calculated: {jobMatchError}
                                </div>
                            )}

                            {jobMatch && (
                                <div
                                    style={{
                                        marginTop: "20px",
                                        marginBottom: "20px",
                                        padding: "18px",
                                        borderRadius: "10px",
                                        background: "#f7f9fc",
                                        border: "1px solid #e2e8f0",
                                        textAlign: "left",
                                    }}
                                >
                                    <h4 className="performance-title">
                                        Job Match
                                    </h4>

                                    <p style={{ margin: "6px 0 12px" }}>
                                        <strong>
                                            {assessmentJob?.title ||
                                                jobMatch.jobTitle ||
                                                `Job #${jobMatch.jobId}`}
                                        </strong>
                                    </p>

                                    <div
                                        style={{
                                            fontSize: "28px",
                                            fontWeight: "700",
                                            marginBottom: "12px",
                                        }}
                                    >
                                        {jobMatch.matchPercentage}%
                                        <span
                                            style={{
                                                fontSize: "14px",
                                                fontWeight: "500",
                                                marginLeft: "6px",
                                            }}
                                        >
                                            Match
                                        </span>
                                    </div>

                                    {jobMatch.strongSkills?.length > 0 && (
                                        <p style={{ margin: "8px 0" }}>
                                            <strong>Strong skills:</strong>{" "}
                                            {jobMatch.strongSkills.join(", " )}
                                        </p>
                                    )}

                                    {jobMatch.skillsToImprove?.length > 0 && (
                                        <p style={{ margin: "8px 0" }}>
                                            <strong>Skills to improve:</strong>{" "}
                                            {jobMatch.skillsToImprove.join(", " )}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* QUESTION REVIEW */}

                            <div
                                style={{
                                    marginTop: "20px",
                                    marginBottom: "20px",
                                }}
                            >
                                <h4 className="performance-title">
                                    Question Review
                                </h4>

                                {assessmentQuestions.map(
                                    (question, index) => {
                                        const userAnswer =
                                            answers[question.id] ||
                                            "Not answered";

                                        const isCorrect =
                                            userAnswer ===
                                            question.answer;

                                        if (isCorrect) {
                                            return null;
                                        }

                                        return (
                                            <div
                                                key={question.id}
                                                style={{
                                                    marginBottom: "14px",
                                                    padding: "14px",
                                                    borderRadius: "8px",
                                                    background: "#fff5f5",
                                                    border: "1px solid #f0caca",
                                                    textAlign: "left",
                                                }}
                                            >
                                                <strong>
                                                    Question {index + 1}
                                                </strong>

                                                <p
                                                    style={{
                                                        margin: "8px 0",
                                                        fontWeight: "600",
                                                    }}
                                                >
                                                    {question.question}
                                                </p>

                                                <p
                                                    style={{
                                                        margin: "6px 0",
                                                    }}
                                                >
                                                    <strong>
                                                        Your answer:
                                                    </strong>{" "}
                                                    <span
                                                        style={{
                                                            color: "#d32f2f",
                                                        }}
                                                    >
                                                        {userAnswer}
                                                    </span>{" "}
                                                    ❌
                                                </p>

                                                <p
                                                    style={{
                                                        margin: "6px 0",
                                                    }}
                                                >
                                                    <strong>
                                                        Correct answer:
                                                    </strong>{" "}
                                                    <span
                                                        style={{
                                                            color: "#218838",
                                                        }}
                                                    >
                                                        {question.answer}
                                                    </span>{" "}
                                                    ✅
                                                </p>

                                                <small>
                                                    Skill: {question.skill}
                                                </small>
                                            </div>
                                        );
                                    }
                                )}

                                {assessmentQuestions.every(
                                    (question) =>
                                        answers[question.id] ===
                                        question.answer
                                ) && (
                                    <div
                                        style={{
                                            padding: "16px",
                                            borderRadius: "8px",
                                            background: "#f0fff4",
                                            textAlign: "center",
                                        }}
                                    >
                                        <strong>
                                            🎉 Perfect Score!
                                        </strong>

                                        <p
                                            style={{
                                                margin: "8px 0 0",
                                            }}
                                        >
                                            You answered every question
                                            correctly.
                                        </p>
                                    </div>
                                )}
                            </div>


                            {result.strongSkills.length >
                                0 && (

                                <div className="strong-skills">

                                    <h4>
                                        Strong Skills
                                    </h4>

                                    <p>
                                        {result.strongSkills.join(
                                            ", "
                                        )}
                                    </p>

                                </div>
                            )}

                            {result.weakSkills.length >
                                0 && (

                                <div className="weak-skills">

                                    <h4>
                                        Skills to Improve
                                    </h4>

                                    <p>
                                        {result.weakSkills.join(
                                            ", "
                                        )}
                                    </p>

                                </div>
                            )}

                            <button
                                className="retake-button"
                                onClick={retakeAssessment}
                            >
                                Retake Assessment
                            </button>

                            <button
                                className="back-jobs-button"
                                onClick={closeAssessment}
                            >
                                Back to Jobs
                            </button>

                        </div>

                    </div>

                )}

            {/* =========================
                AUTH MODAL
            ========================= */}

            {authMode && (

                <div className="auth-overlay">

                    <div className="auth-modal">

                        <button
                            className="auth-close"
                            onClick={() => {
                                setAuthMode(null);
                                setAuthError("");
                                setAuthMessage("");
                            }}
                        >
                            ×
                        </button>

                        <div className="auth-logo">
                            SkillPath
                        </div>

                        {authMode === "login" ? (

                            <>
                                <div className="auth-label">
                                    WELCOME BACK
                                </div>

                                <h2>
                                    Login to SkillPath
                                </h2>

                                <p className="auth-subtitle">
                                    Continue your job readiness journey.
                                </p>

                                <form
                                    onSubmit={handleLogin}
                                >

                                    <label>
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={loginEmail}
                                        onChange={(e) =>
                                            setLoginEmail(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                    <label>
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        placeholder="Enter your password"
                                        value={loginPassword}
                                        onChange={(e) =>
                                            setLoginPassword(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                    {authError && (
                                        <div className="auth-error">
                                            {authError}
                                        </div>
                                    )}

                                    {authMessage && (
                                        <div className="auth-success">
                                            {authMessage}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        className="auth-submit"
                                        disabled={authLoading}
                                    >
                                        {authLoading
                                            ? "Logging in..."
                                            : "Login"}
                                    </button>

                                </form>

                                <div className="auth-switch">

                                    Don't have an account?{" "}

                                    <button
                                        onClick={() => {
                                            setAuthMode(
                                                "register"
                                            );
                                            setAuthError("");
                                            setAuthMessage("");
                                        }}
                                    >
                                        Register
                                    </button>

                                </div>
                            </>

                        ) : (

                            <>
                                <div className="auth-label">
                                    GET STARTED
                                </div>

                                <h2>
                                    Create Your Account
                                </h2>

                                <p className="auth-subtitle">
                                    Start tracking your job readiness with SkillPath.
                                </p>

                                <form
                                    onSubmit={
                                        handleRegister
                                    }
                                >

                                    <label>
                                        Name
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        value={registerName}
                                        onChange={(e) =>
                                            setRegisterName(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                    <label>
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={registerEmail}
                                        onChange={(e) =>
                                            setRegisterEmail(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                    <label>
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        placeholder="Create a password"
                                        value={
                                            registerPassword
                                        }
                                        onChange={(e) =>
                                            setRegisterPassword(
                                                e.target.value
                                            )
                                        }
                                        required
                                        minLength={6}
                                    />

                                    {authError && (
                                        <div className="auth-error">
                                            {authError}
                                        </div>
                                    )}

                                    {authMessage && (
                                        <div className="auth-success">
                                            {authMessage}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        className="auth-submit"
                                        disabled={authLoading}
                                    >
                                        {authLoading
                                            ? "Creating account..."
                                            : "Create Account"}
                                    </button>

                                </form>

                                <div className="auth-switch">

                                    Already have an account?{" "}

                                    <button
                                        onClick={() => {
                                            setAuthMode(
                                                "login"
                                            );
                                            setAuthError("");
                                            setAuthMessage("");
                                        }}
                                    >
                                        Login
                                    </button>

                                </div>
                            </>

                        )}

                    </div>

                </div>

            )}

        </div>
    );
}

export default App;