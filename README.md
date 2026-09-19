SkillPath — Job Readiness & Skill Assessment Platform

SkillPath is a full-stack web application that helps users understand the skills required for different software roles, assess their current skill level through role-specific assessments, track assessment history, and calculate a job-match percentage based on assessment performance.

🚀 Features

Job discovery — Browse available roles and their required skills.

Role-specific assessments — Each job generates a 20-question assessment using only the skills required for that role.

Randomized assessments — Questions and answer options are shuffled for each attempt.

Skill-wise performance — View percentage performance for every assessed skill.

Question review — Review incorrect answers with the user's answer, correct answer, and skill.

Job readiness level — Results are classified as Excellent, Good, Average, or Needs Improvement.

Assessment history — Logged-in users can view previously completed assessments.

Job Match — Compare assessment performance with a job's required skills and calculate a weighted match percentage.

Authentication — User registration and login using JWT authentication and bcrypt password hashing.

PostgreSQL persistence — Users, jobs, skills, assessment results, and skill-level results are stored in PostgreSQL.

💼 Current Roles

Role

Required Skills

Software Engineer

Java, SQL, PostgreSQL, Git, GitHub

Data Analyst

Python, SQL, PostgreSQL, Git

Backend Developer

Java, SQL, PostgreSQL, Git, GitHub

Frontend Developer

HTML, CSS, JavaScript, Git, GitHub

Machine Learning Engineer

Python, SQL, PostgreSQL, Git, GitHub

🎯 How Job Match Works

The Job Match feature uses the user's latest assessment for the selected job.

Each required skill has an importance level:

High → weight 2

Medium → weight 1

A skill is considered strong when its assessment performance is 70% or higher.

The weighted skill performance is combined to produce the overall job-match percentage.

The result identifies:

Strong skills

Skills to improve

Skill-level performance

Overall match percentage

The matching mechanism is intentionally explainable and rule-based; it does not claim to use an AI recommendation model.

📝 Assessment Workflow

User
  │
  ▼
Browse Jobs
  │
  ▼
Select a Job
  │
  ▼
View Required Skills
  │
  ▼
Start Assessment
  │
  ▼
20 Role-Specific Questions
  │
  ▼
Submit Assessment
  │
  ├───────────────┐
  ▼               ▼
Skill          Job Readiness
Performance        Level
  │               │
  └───────┬───────┘
          ▼
     Save Result
          │
          ▼
      Job Match
          │
          ▼
 Assessment History

🛠️ Technology Stack

Frontend

React

Vite

JavaScript

HTML5

CSS3

Backend

Node.js

Express.js

REST APIs

JWT authentication

bcrypt password hashing

Database

PostgreSQL

pg Node.js PostgreSQL driver

Relational database design

Development Tools

Git

GitHub

VS Code

npm

🏗️ System Architecture

┌───────────────────────────┐
│       React / Vite        │
│       Frontend :5173      │
└─────────────┬─────────────┘
              │
              │ HTTP / REST API
              ▼
┌───────────────────────────┐
│      Node.js / Express    │
│        Backend :5000      │
└─────────────┬─────────────┘
              │
              │ SQL / pg
              ▼
┌───────────────────────────┐
│        PostgreSQL         │
│       skillpath_db        │
└───────────────────────────┘

🗄️ Database Design

users

Stores registered user information.

users
├── user_id
├── name
├── email
├── password_hash
└── created_at

roles

Stores role categories.

roles
├── role_id
└── role_name

skills

Stores reusable skills.

skills
├── skill_id
└── skill_name

jobs

Stores jobs displayed by the application.

jobs
├── job_id
├── role_id
├── title
└── description

job_skills

Maps jobs to required skills and their importance.

job_skills
├── job_id
├── skill_id
├── importance
└── source

assessment_results

Stores overall assessment results.

assessment_results
├── result_id
├── user_id
├── job_id
├── score
├── total_questions
├── readiness_level
├── skill_performance
└── created_at

assessment_skill_results

Stores performance for individual skills.

assessment_skill_results
├── skill_result_id
├── result_id
├── skill_id
├── skill_name
├── correct_answers
├── total_questions
└── percentage

🔌 API Endpoints

Authentication

Method

Endpoint

Purpose

POST

/api/auth/register

Register a new user

POST

/api/auth/login

Authenticate a user

GET

/api/auth/profile

Get the authenticated user's profile

Jobs

Method

Endpoint

Purpose

GET

/api/jobs

Get available jobs and required skills

GET

/api/jobs/:jobId/match

Calculate the authenticated user's job match

Assessments

Method

Endpoint

Purpose

POST

/api/assessments/results

Save an assessment result

GET

/api/assessments/history

Get the authenticated user's assessment history

Protected endpoints require:

Authorization: Bearer <JWT_TOKEN>

📁 Project Structure

SKILLPATH/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── assessmentController.js
│   │   │   ├── authController.js
│   │   │   └── jobController.js
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   ├── routes/
│   │   │   ├── assessmentRoutes.js
│   │   │   ├── authRoutes.js
│   │   │   ├── healthRoutes.js
│   │   │   ├── jobRoutes.js
│   │   │   └── testRoutes.js
│   │   ├── app.js
│   │   └── server.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md

⚙️ Local Setup

1. Clone the repository

git clone https://github.com/pallavi-karna/SKILLPATH.git
cd SKILLPATH

2. Backend setup

cd backend
npm install

Create a .env file inside backend/:

DB_USER=your_postgresql_user
DB_HOST=localhost
DB_NAME=skillpath_db
DB_PASSWORD=your_postgresql_password
DB_PORT=5432
JWT_SECRET=your_jwt_secret

Start the backend:

node src/server.js

Backend:

http://localhost:5000

3. Frontend setup

Open another terminal:

cd frontend
npm install
npm run dev

Frontend:

http://localhost:5173

🔐 Security

Passwords are hashed using bcrypt.

Authenticated API requests use JWT.

Database credentials and JWT secrets are stored in environment variables.

.env files are excluded from Git through .gitignore.

node_modules/ and build artifacts are excluded from Git.

For production deployment, use secure secret management and production database credentials.

👤 Example User Flow

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
       ├───────────────┐
       ▼               ▼
Skill Performance   Job Match
       │               │
       └───────┬───────┘
               ▼
       Assessment History

💡 What This Project Demonstrates

React component-based UI development

REST API integration

Express.js backend development

PostgreSQL relational data modeling

JWT-based authentication

bcrypt password hashing

Transaction-based assessment persistence

Many-to-many job/skill relationships

Role-specific assessment generation

Skill-level analytics

Explainable weighted matching logic

Git/GitHub version control

🔮 Future Enhancements

Potential future improvements:

Resume parsing and resume-to-job skill extraction

NLP-based skill extraction

Personalized learning recommendations

Larger question banks

Admin dashboard for managing jobs, skills, and questions

Production deployment

Automated testing and CI/CD

Advanced analytics and progress visualizations

These are planned enhancements, not currently implemented features.

🔗 Repository

GitHub: github.com/pallavi-karna/SKILLPATH

👩‍💻 Author

Pallavi Karna

B.Tech — Artificial Intelligence & Data Science
