# 📝 TaskManager

A full-stack task management application. This project is split into a modern React web frontend and a robust API backend, orchestrated cleanly with Docker.

---

## 📁 Repository Structure

This project uses a monorepository layout to keep the frontend and backend organized:

* **`/backend`** - Python API service, handling the business logic, logging, and data persistence via SQLite (`taskmanager.db`).
* **`/frontend`** - React user interface built with Vite and managed via npm.
* **`docker-compose.yml`** - Root configuration file to spin up both services simultaneously.

---

## 🚀 Getting Started

You can run this entire application locally in two different ways.

### Method 1: The Fast Way (Using Docker Compose)
If you have Docker Desktop installed on your Windows machine, open your terminal in the root folder and run:

```bash
docker-compose up --build
```
*This will automatically install all dependencies, build the containers, and start both the frontend and backend servers together.*

---

### Method 2: Manual Development Setup
If you want to run the services individually without Docker, follow these steps:

#### 1. Setting up the Backend
Navigate to the backend directory, install Python requirements, and start your server:
```bash
cd backend
pip install -r requirements.txt
python main.py
```

#### 2. Setting up the Frontend
Open a new terminal window, navigate to the frontend directory, install the Node packages, and launch the Vite dev server:
```bash
cd frontend
npm install
npm run dev
```

---

## 🛠️ Tech Stack Used

* **Frontend:** React, Vite, HTML5, CSS3, JavaScript
* **Backend:** Python, FastAPI, JWT,  SQLite
* **DevOps:** Docker, Docker Compose
