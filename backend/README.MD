# 🐍 TaskManager Backend API

This is the live core API service for the TaskManager application, built with Python and FastAPI.

## 📁 Architecture Break Down

Inside the `app/` directory, the code follows a modular, scalable architecture:

* **`/models`** - Database models defining the SQLite schema (`taskmanager.db`).
* **`/routes`** - API endpoints split by feature (e.g., tasks, user management).
* **`/schemas`** - Pydantic data validation and serialization shapes.
* **`/static` & `/templates`** - Assets and server-rendered view resources if needed.
* **`auth.py`** - Security, JWT token handling, and password hashing logic.
* **`database.py`** - Core database connection layer setup and session makers.
* **`dependencies.py`** - Reusable routing injections (like fetching current users or DB sessions).
* **`main.py`** - The foundational entrypoint initializing the FastAPI app configuration.

---

## 🛠️ Local Development Steps

1. **Navigate to this folder:**
   ```bash
   cd backend
   ```

2. **Create and start a Virtual Environment:**
   * **Windows Command Prompt:** `python -m venv venv` then `venv\Scripts\activate.bat`
   * **Windows PowerShell:** `python -m venv venv` then `.\venv\Scripts\activate.ps1`

3. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Launch the API Server locally:**
   ```bash
   uvicorn app.main:app --reload
   ```
