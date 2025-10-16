# Horus Sidik Exam

  A simple full-stack application built for an exam/project. This project includes a Flask backend and a Vite + React frontend.

  📁 Project Structure

  ```
  backend/
    .env             # Environment variables (not committed)
    requirements.txt # Python dependencies
    run.py           # Backend entrypoint
    app/
      config.py
      extensions.py
      models/
        user.py
      routes/
        users.py
      services/
        user_service.py
      utils/
        validator.py
  migrations/        # Alembic migration files

  frontend/
    eslint.config.js
    index.html
    package-lock.json
    package.json
    vite.config.js
    src/
      App.jsx
      main.jsx
      components/
        SearchBar.jsx
        UserTabel.jsx
      views/
        Dashboard.jsx
        Login.jsx
        Register.jsx
        UpdateUser.jsx
      router/
        index.jsx
      store/
        AuthContext.jsx
        AuthProvider.jsx
        useAuth.jsx
      services/
        api.jsx
  ```

  ⚙️ Requirements / Tested Environment

  OS: Windows 10/11 (bash shell recommended)

  Python: 3.10+ (virtualenv recommended)

  Node.js: 16+ / npm or pnpm

  🖥️ Backend (Flask)
  1. Setup Virtual Environment

  ```bash
  # from repository root
  python -m venv backend/resource
  source backend/resource/Scripts/activate
  ```

  On Windows PowerShell: `backend\resource\Scripts\Activate.ps1`.

  2. Install Dependencies

  ```bash
  pip install -r backend/requirements.txt
  ```

  3. Configure Environment Variables

  Copy `.env.example` to `.env` in `backend/` and update values:

  ```
  SECRET_KEY=replace_with_secure_random_value
  DATABASE_URL=mysql+pymysql://user:pass@localhost:3306/horus_sidik_db
  JWT_SECRET_KEY=replace_with_secure_jwt_secret
  JWT_ACCESS_TOKEN_EXPIRES_SECONDS=7200
  FLASK_APP=run.py
  FLASK_ENV=development
  ```

  4. Database Migrations

  ```bash
  cd backend
  source resource/Scripts/activate
  flask db upgrade
  ```

  5. Run Backend Server

  ```bash
  cd backend
  source resource/Scripts/activate
  python run.py
  # or
  # FLASK_APP=run.py flask run --host=0.0.0.0 --port=5000
  ```

  🔗 API Reference

  | Method | Endpoint | Description | Auth Required |
  |---|---:|---|---:|
  | POST | `/users/register` | Register new user | No |
  | POST | `/users/login` | Login and receive JWT token | No |
  | GET | `/users` | List all users | Yes |
  | PUT | `/users/<id>` | Update user by ID | Yes |
  | DELETE | `/users/<id>` | Delete user by ID | Yes |

  JWT Authentication: Include the access token in headers:

  ```
  Authorization: Bearer <jwt_token>
  ```

  💻 Frontend (React + Vite)
  1. Install Dependencies & Run

  ```bash
  cd frontend
  npm install          # or pnpm install
  npm run dev
  # open http://localhost:5173
  ```

  2. Configure API Base URL

  Edit `frontend/src/services/api.jsx` or set a Vite env variable:

  ```
  VITE_API_BASE=http://localhost:5000
  ```

  3. Build for Production

  ```bash
  cd frontend
  npm run build
  # Serve the dist/ folder with any static server or integrate with Flask
  ```

  🛠️ Libraries / Dependencies

  Backend:

  Flask, Flask-JWT-Extended, Flask-Cors, Flask-Migrate, Flask-SQLAlchemy

  Alembic, PyMySQL, SQLAlchemy, bcrypt, python-dotenv, Werkzeug, Jinja2

  Frontend:

  React, React Router, React-Bootstrap, Bootstrap

  Axios, SweetAlert2
