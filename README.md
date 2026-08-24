
# 🎓 StudyNest

### Your Personal Study Companion

<p align="center">
  <b>Organize your studies. Track your work. Stay consistent.</b>
</p>

<p align="center">
  A full-stack student productivity platform built with React and FastAPI.
</p>

---
## ✨ Overview

**StudyNest** is a full-stack student productivity application designed to bring essential academic tools into one simple and organized workspace.

Students can manage their **notes, assignments, timetable, and academic progress** from a centralized dashboard while using secure authentication to protect their account.

The project focuses on building a practical real-world application with a clean, modern SaaS-style interface and a separated frontend/backend architecture.

---

## 🚀 Features

| Feature | Description |
|--------|-------------|
| 🔐 **Authentication** | Signup, login, token-based authentication and protected routes |
| 📊 **Dashboard** | View academic statistics and important activities at a glance |
| 📝 **Notes** | Create and manage study notes |
| 📋 **Assignments** | Add, manage and track assignments |
| 📅 **Timetable** | Organize classes and study sessions by day |
| 📈 **Progress** | View progress statistics and visual indicators |
| ⚙️ **Settings** | Manage account status and current session |
| 📱 **Responsive UI** | Designed to work across desktop and smaller screens |

---

## 🖥️ Application

### Landing Page

A clean landing page introducing StudyNest with quick access to authentication and the main features.

### Dashboard

The central workspace providing a quick overview of the student's academic activity.

### Notes

A dedicated workspace for managing study notes.

### Assignments

Keep track of academic assignments and their status.

### Timetable

Organize classes and study sessions throughout the week.

### Progress

Monitor academic progress through statistics and visual progress indicators.

### Settings

Manage account information and securely sign out.

---

## 🛠️ Tech Stack

### Frontend

<p>
  <img src="https://img.shields.io/badge/React-2026-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Vite-Frontend-purple?style=for-the-badge&logo=vite" />
  <img src="https://img.shields.io/badge/React_Router-Navigation-red?style=for-the-badge&logo=reactrouter" />
  <img src="https://img.shields.io/badge/Axios-API-black?style=for-the-badge&logo=axios" />
  <img src="https://img.shields.io/badge/CSS-UI-blue?style=for-the-badge&logo=css3" />
</p>

### Backend

<p>
  <img src="https://img.shields.io/badge/Python-Backend-blue?style=for-the-badge&logo=python" />
  <img src="https://img.shields.io/badge/FastAPI-API-009688?style=for-the-badge&logo=fastapi" />
  <img src="https://img.shields.io/badge/SQLAlchemy-ORM-red?style=for-the-badge" />
  <img src="https://img.shields.io/badge/JWT-Authentication-black?style=for-the-badge" />
</p>

### Tools

- Git
- GitHub
- VS Code
- Uvicorn
- npm

---

## 🏗️ Architecture

```text
                         ┌──────────────────┐
                         │     StudyNest    │
                         └────────┬─────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
             ┌──────▼──────┐             ┌──────▼──────┐
             │   Frontend  │             │   Backend   │
             │    React    │◄───────────►│   FastAPI   │
             │    Vite     │    HTTP     │  SQLAlchemy │
             └──────┬──────┘             └──────┬──────┘
                    │                           │
                    │                           ▼
                    │                     ┌────────────┐
                    │                     │ SQL Database│
                    │                     └────────────┘
                    │
                    ▼
             ┌────────────────┐
             │ User Interface │
             │                │
             │ Dashboard      │
             │ Notes          │
             │ Assignments    │
             │ Timetable      │
             │ Progress       │
             │ Settings       │
             └────────────────┘
````

---

## 🔐 Authentication Flow

```text
             User
               │
               ▼
        ┌─────────────┐
        │ Login /     │
        │ Signup      │
        └──────┬──────┘
               │
               ▼
        ┌─────────────┐
        │   FastAPI   │
        │   Backend   │
        └──────┬──────┘
               │
               ▼
        ┌─────────────┐
        │    JWT      │
        │    Token    │
        └──────┬──────┘
               │
               ▼
        ┌─────────────┐
        │  Protected  │
        │    Routes   │
        └─────────────┘
```

---

## 📂 Project Structure

```text
StudyNest/
│
├── backend/
│   └── app/
│       ├── routers/
│       │   ├── __init__.py
│       │   ├── auth.py
│       │   └── notes.py
│       │
│       ├── crud.py
│       ├── database.py
│       ├── dependencies.py
│       ├── main.py
│       ├── models.py
│       ├── schemas.py
│       └── security.py
│
├── src/
│   ├── api/
│   │   └── axios.js
│   │
│   ├── assets/
│   │   └── logo.png
│   │
│   ├── components/
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Features.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── Sidebar.jsx
│   │
│   ├── pages/
│   │   ├── Assignments.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Notes.jsx
│   │   ├── Progress.jsx
│   │   ├── Settings.jsx
│   │   ├── Signup.jsx
│   │   └── Timetable.jsx
│   │
│   ├── services/
│   │   ├── assignmentService.js
│   │   ├── authService.js
│   │   ├── dashBoardService.js
│   │   ├── noteService.js
│   │   └── timetableService.js
│   │
│   └── styles/
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

# ⚡ Getting Started

## 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd StudyNest
```

---

## 2. Frontend Setup

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 3. Backend Setup

Navigate to the backend:

```bash
cd backend
```

Create a virtual environment:

### Windows

```powershell
python -m venv venv
```

Activate it:

```powershell
venv\Scripts\activate
```

Install the backend dependencies used by the project.

Start FastAPI:

```bash
uvicorn app.main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

FastAPI documentation:

```text
http://127.0.0.1:8000/docs
```

---

# 🔑 Environment Variables

Sensitive configuration should be stored in environment variables.

Example:

```env
DATABASE_URL=your_database_url
SECRET_KEY=your_secret_key
```

Never commit:

```text
.env
.env.local
API keys
Passwords
Database credentials
Secret keys
```

---

# 🔌 API Structure

The frontend communicates with the backend using Axios.

API configuration:

```text
src/api/axios.js
```

Service-specific API logic:

```text
src/services/
```

This keeps the application modular and separates UI logic from API communication.

---

# 🎨 Design

StudyNest follows a **dark, modern SaaS-style design system**.

### Design Principles

* 🌑 Deep navy background
* ✨ Soft white typography
* 🔵 Restrained blue accents
* 🧊 Subtle borders
* 📐 Consistent spacing
* 🎯 Clear visual hierarchy
* 📱 Responsive layouts
* 🚫 Minimal unnecessary decoration

The goal is to provide a professional productivity experience rather than a basic student project interface.

---

# 📸 Screenshots

> Screenshots will be added after the production deployment.

### 🏠 Landing Page

<!-- Add screenshot here -->

### 📊 Dashboard

<!-- Add screenshot here -->

### 📝 Notes

<!-- Add screenshot here -->

### 📋 Assignments

<!-- Add screenshot here -->

### 📅 Timetable

<!-- Add screenshot here -->

### 📈 Progress

<!-- Add screenshot here -->

### ⚙️ Settings

<!-- Add screenshot here -->

---

# 🗺️ Roadmap

### Completed

* [x] Landing page
* [x] Responsive navigation
* [x] User signup
* [x] User login
* [x] Protected routes
* [x] Dashboard
* [x] Notes management
* [x] Assignment management
* [x] Timetable management
* [x] Progress page
* [x] Settings page
* [x] Logout flow
* [x] Responsive UI
* [x] FastAPI backend
* [x] SQL database integration

### Future

* [ ] AI-powered note generation
* [ ] AI note summarization
* [ ] Personalized study recommendations
* [ ] Assignment deadline reminders
* [ ] Calendar integration
* [ ] Advanced analytics
* [ ] Study streaks
* [ ] Notifications
* [ ] File/document uploads
* [ ] Improved mobile navigation

---

# 🔒 Security

StudyNest includes:

* Token-based authentication
* Protected frontend routes
* Backend authorization
* Password validation
* Environment-based secrets
* Gitignored virtual environments
* Gitignored database and secret files

---

# 🚀 Deployment

The application is structured for separate deployment of:

```text
React Frontend
      │
      ▼
Production Web Hosting
      │
      │
      ▼
FastAPI Backend
      │
      ▼
Production SQL Database
```

Production deployment configuration will be added once the application is deployed.

---

# 📈 Future Vision

StudyNest is designed to evolve from a student productivity platform into a more intelligent academic companion.

Future versions can introduce AI-assisted learning features such as:

```text
Notes
  │
  ├── Summarization
  ├── Key-point extraction
  └── Study questions
          │
          ▼
      Personalized
      Study Support
```

---

# 👨‍💻 Author

### Sai Teja

Full-stack student productivity project built using **React + FastAPI + SQL**.

---

## ⭐ Support

If you find StudyNest interesting, consider giving the repository a ⭐.

```text
StudyNest
Organize • Plan • Track • Improve
```

