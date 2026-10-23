# ⚛️ TaskManager Frontend

This is the user interface for the TaskManager application, built using **React** and bundled with **Vite**.

---

## 📁 Project Architecture

The `src/` directory uses a modular, component-driven layout:

* **`/assets`** - Static multimedia files such as logos, icons, and background images.
* **`/components`** - Reusable global UI elements across multiple views (e.g., `Footer`, `Navbar`).
* **`/pages`** - Entire page screens containing full functional features:
  * `about` - Overview and informational page.
  * `NotFound` - Custom 404 fallback page.
  * `SignIn` / `SignUp` - User authentication forms.
  * `Task` - Main core panel for viewing, creating, and modifying tasks.
* **`/routes`** - Navigation controls, featuring a `ProtectedRoute` component to block unauthorized users from reaching dashboard tasks.
* **`App.jsx`** - The root component managing application state routing frameworks.
* **`main.jsx`** - The foundational DOM entry point linking your React engine to `index.html`.

---

## 🛠️ Local Development Setup

To run the user interface locally on your machine, follow these steps:

1. **Navigate to the frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   *Once started, open [http://localhost:5173](http://localhost:5173) in your browser to view the application.*

---

## 🚀 Production Build & Deployment

If you need to generate a compiled production build manually:

* **Build the application:**
   ```bash
   npm run build
   ```
   *This compiles the React code into highly optimized static assets inside a `/dist` folder, which is handled and served seamlessly on live clouds like Render using the configuration provided in `nginx.conf`.*
