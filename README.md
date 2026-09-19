# SkillPath — Job Readiness & Skill Assessment Platform

SkillPath is a full-stack web application that helps users understand the skills required for different software roles, assess their current skill level through role-specific assessments, track assessment history, and calculate a job-match percentage based on assessment performance.

## 🚀 Features

- **Job Discovery** — Browse available software roles and their required skills.
- **Role-Specific Assessments** — Each job generates a 20-question assessment using only the skills required for that role.
- **Randomized Questions** — Questions and answer options are shuffled for every assessment attempt.
- **Skill-Wise Performance** — View performance percentages for individual skills.
- **Question Review** — Review incorrect answers along with the correct answer and skill.
- **Job Readiness Level** — Results are classified as Excellent, Good, Average, or Needs Improvement.
- **Assessment History** — Logged-in users can view previous assessment results.
- **Job Match** — Calculate a weighted match percentage between assessment performance and job requirements.
- **Authentication** — User registration and login using JWT authentication.
- **Secure Password Storage** — Passwords are hashed using bcrypt.
- **PostgreSQL Persistence** — User, job, skill, and assessment data are stored in PostgreSQL.

---

## 💼 Current Roles

| Role | Required Skills |
|---|---|
| Software Engineer | Java, SQL, PostgreSQL, Git, GitHub |
| Data Analyst | Python, SQL, PostgreSQL, Git |
| Backend Developer | Java, SQL, PostgreSQL, Git, GitHub |
| Frontend Developer | HTML, CSS, JavaScript, Git, GitHub |
| Machine Learning Engineer | Python, SQL, PostgreSQL, Git, GitHub |

---

## 🎯 Job Match

SkillPath calculates an explainable job-match percentage based on the user's assessment performance.

Each required skill has an importance level:

- **High** → Weight 2
- **Medium** → Weight 1

A skill is considered a **strong skill** when the user's assessment performance is 70% or higher.

The Job Match result displays:

- Overall Match Percentage
- Strong Skills
- Skills to Improve
- Individual Skill Performance

The current matching system is **rule-based and explainable**. It does not claim to use an AI recommendation model.

---

## 📝 Assessment Workflow

```text
                    ┌──────────────────┐
                    │       User       │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   Browse Jobs    │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │    Select Job    │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Required Skills  │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Start Assessment │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ 20 Questions     │
                    └────────┬─────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │   Assessment Result  │
                  └──────────┬───────────┘
                             │
                  ┌──────────┴──────────┐
                  ▼                     ▼
          ┌───────────────┐     ┌───────────────┐
          │ Skill         │     │ Job Readiness │
          │ Performance   │     │ Level         │
          └───────┬───────┘     └───────┬───────┘
                  │                     │
                  └──────────┬──────────┘
                             ▼
                    ┌──────────────────┐
                    │   Save Result    │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │    Job Match     │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Assessment       │
                    │ History          │
                    └──────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend

- React
- Vite
- JavaScript
- HTML5
- CSS3

### Backend

- Node.js
- Express.js
- REST APIs
- JWT Authentication
- bcrypt

### Database

- PostgreSQL
- Node PostgreSQL (`pg`)
- Relational Database Design

### Tools

- Git
- GitHub
- VS Code
- npm

---

## 🏗️ System Architecture

```text
┌─────────────────────────────┐
│       React + Vite          │
│         Frontend            │
│         Port 5173           │
└──────────────┬──────────────┘
               │
               │ HTTP / REST API
               ▼
┌─────────────────────────────┐
│      Node.js + Express      │
│          Backend            │
│         Port 5000           │
└──────────────┬──────────────┘
               │
               │ SQL / pg
               ▼
┌─────────────────────────────┐
│         PostgreSQL          │
│        skillpath_db         │
└─────────────────────────────┘
```

---

## 🗄️ Database Design

### Users

Stores registered user information.

```text
users
├── user_id
├── name
├── email
├── password_hash
└── created_at
```

### Roles

Stores available role categories.

```text
roles
├── role_id
└── role_name
```

### Skills

Stores reusable skills.

```text
skills
├── skill_id
└── skill_name
```

### Jobs

Stores available jobs.

```text
jobs
├── job_id
├── role_id
├── title
└── description
```

### Job Skills

Maps jobs to their required skills.

```text
job_skills
├── job_id
├── skill_id
├── importance
└── source
```

### Assessment Results

Stores overall assessment results.

```text
assessment_results
├── result_id
├── user_id
├── job_id
├── score
├── total_questions
├── readiness_level
├── skill_performance
└── created_at
```

### Assessment Skill Results

Stores individual skill performance.

```text
assessment_skill_results
├── skill_result_id
├── result_id
├── skill_id
├── skill_name
├── correct_answers
├── total_questions
└── percentage
```

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT |
| GET | `/api/auth/profile` | Get authenticated user profile |

### Jobs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/jobs` | Get available jobs and required skills |
| GET | `/api/jobs/:jobId/match` | Calculate job match |

### Assessments

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/assessments/results` | Save assessment result |
| GET | `/api/assessments/history` | Get user's assessment history |

Protected endpoints use:

```text
Authorization: Bearer <JWT_TOKEN>
```

---

## 📁 Project Structure

```text
SKILLPATH/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── assessmentController.js
│   │   │   ├── authController.js
│   │   │   └── jobController.js
│   │   │
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   │
│   │   ├── routes/
│   │   │   ├── assessmentRoutes.js
│   │   │   ├── authRoutes.js
│   │   │   ├── healthRoutes.js
│   │   │   ├── jobRoutes.js
│   │   │   └── testRoutes.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## ⚙️ Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/pallavi-karna/SKILLPATH.git
cd SKILLPATH
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
DB_USER=your_postgresql_user
DB_HOST=localhost
DB_NAME=skillpath_db
DB_PASSWORD=your_postgresql_password
DB_PORT=5432
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
node src/server.js
```

Backend:

```text
http://localhost:5000
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 🔐 Security

SkillPath implements basic application security practices:

- Password hashing using **bcrypt**
- JWT-based authentication
- Protected assessment APIs
- Environment variables for database credentials
- Environment variables for JWT secrets
- `.env` excluded from Git
- `node_modules` excluded from Git

For production deployment, secure secret management and production database credentials should be used.

---

## 👤 Example User Flow

```text
Register / Login
       │
       ▼
Browse Available Jobs
       │
       ▼
Select Frontend Developer
       │
       ▼
Required Skills
HTML • CSS • JavaScript • Git • GitHub
       │
       ▼
20-Question Assessment
       │
       ▼
Assessment Result
       │
       ├─────────────────┐
       ▼                 ▼
Skill Performance    Job Match
       │                 │
       └────────┬────────┘
                ▼
        Assessment History
```

---

## 💡 What This Project Demonstrates

This project demonstrates practical experience with:

- React component-based UI development
- REST API integration
- Express.js backend development
- PostgreSQL database integration
- Relational database design
- JWT authentication
- bcrypt password hashing
- Database transactions
- Many-to-many job/skill relationships
- Role-specific assessment generation
- Skill-level analytics
- Explainable weighted matching logic
- Git and GitHub version control

---

## 🔮 Future Enhancements

Potential future improvements include:

- Resume parsing
- Resume-to-job skill extraction
- NLP-based skill extraction
- Personalized learning recommendations
- Larger assessment question banks
- Admin dashboard
- Job and skill management
- Automated testing
- CI/CD pipeline
- Production deployment
- Advanced progress analytics

> These are planned enhancements and are not currently implemented features.

---

## 🔗 GitHub Repository

[View SkillPath on GitHub](https://github.com/pallavi-karna/SKILLPATH)

---

## 👩‍💻 Author

**Pallavi Karna**

B.Tech — Artificial Intelligence & Data Science
