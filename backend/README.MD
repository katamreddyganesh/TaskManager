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
---

## 🔌 API Reference

You can access the interactive Swagger documentation live at: `https://onrender.com`

### 🏠 Default Route
* **`GET /`** - Home page route check.

### 👥 User Authentication (`user_routes`)
* **`POST /Register`** - Sign up a new user account.
* **`POST /Login`** - Log in an existing user and receive an authentication token.
* **`GET /get_all_users`** 🔒 - Fetch a list of all registered profiles (Requires Authorization).
* **`GET /profile`** 🔒 - Retrieve details about the currently logged-in user profile (Requires Authorization).

### 📝 Task Management (`task_routes`)
* **`GET /Tasks/all`** 🔒 - Retrieve all tasks associated with your account.
* **`POST /Tasks`** 🔒 - Create a new item on your Todo List.
* **`PATCH /Tasks/update_task/{task_id}`** 🔒 - Modify a specific task's details or completion status by its ID.
* **`DELETE /Delete_task/{task_id}`** 🔒 - Permanently remove a specific task by its ID.

*🔒 = Requires a valid JWT bearer token attached to the request header.*
