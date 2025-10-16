# Horus Sidik Exam

This repository contains a simple full-stack application used for an exam/project. It includes a Flask backend and a Vite + React frontend.

Contents
 - `backend/` - Flask API (authentication, user management)
 - `frontend/` - React + Vite SPA

Project structure

```
backend/
  .env             # environment file (not committed)
  requirements.txt # Python dependencies
  run.py           # entrypoint for running the Flask app
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
migrations/        # alembic migration files

frontend/
  package.json
  vite.config.js
  src/
    App.jsx
    main.jsx
    components/
    views/
```

Requirements / tested environment

- Windows 10/11 (bash shell recommended)
- Python 3.10+ (virtualenv recommended)
- Node 16+ / npm or pnpm

Backend (Flask)
----------------

Quickstart (backend + frontend)
--------------------------------

Follow these minimal steps to get both backend and frontend running locally. These commands assume you are using the repository root and a bash shell on Windows.

Backend (Flask API)
1. Create and activate a Python virtual environment (one-time):

```bash
# from repository root
python -m venv backend/resource
source backend/resource/Scripts/activate
```

Notes:
- If you already have a preferred virtualenv location replace `backend/resource` with your path.
- On Windows PowerShell, activation is `backend\resource\Scripts\Activate.ps1`.

2. Install dependencies:

```bash
pip install -r backend/requirements.txt
```

2. Install backend dependencies:

```bash
pip install -r backend/requirements.txt
```

3. Environment variables

Create a `.env` file in `backend/` (you can copy `.env.example`) and set the following keys at minimum. These names come from `backend/app/config.py`:

- `SECRET_KEY` — Flask secret key (used by extensions)
- `DATABASE_URL` — SQLAlchemy database URI, e.g. `mysql+pymysql://user:pass@host:3306/dbname` or a SQLite URL like `sqlite:///data.db`
- `JWT_SECRET_KEY` — secret used to sign JWT tokens
- `JWT_ACCESS_TOKEN_EXPIRES_SECONDS` — (optional) integer seconds for token expiry, default 7200
- `FLASK_APP` / `FLASK_ENV` — optional standard Flask env variables (e.g., `FLASK_APP=run.py`, `FLASK_ENV=development`)

Example `.env` (do NOT commit secrets)

```
# backend/.env (example values - replace before use)
SECRET_KEY=replace_with_secure_random_value
DATABASE_URL=sqlite:///data.db
JWT_SECRET_KEY=replace_with_secure_jwt_secret
JWT_ACCESS_TOKEN_EXPIRES_SECONDS=7200
FLASK_APP=run.py
FLASK_ENV=development
```

4. Database migrations (if needed)

If you are using a relational database and want to apply migrations:

```bash
# from repository root
cd backend
source resource/Scripts/activate
flask db upgrade
```

5. Run the backend server

```bash
cd backend
source resource/Scripts/activate
python run.py
# or if you prefer
# FLASK_APP=run.py flask run --host=0.0.0.0 --port=5000
```

API reference (important endpoints)
----------------------------------

All user routes are registered in `backend/app/routes/users.py`. The blueprint is registered without a prefix, so endpoints are mounted at the root under `/users`.

- POST /users/register — register new user (public)
- POST /users/login — authenticate and receive JWT access token (public)
- GET /users — list all users (protected, requires Authorization header)
- PUT /users/<id> — update user by id (protected)
- DELETE /users/<id> — delete user by id (protected)

Authentication
--------------
Authentication (JWT)
--------------------

After a successful login you receive a response containing `access_token` and `user` data, for example:

```json
{
  "access_token": "<jwt_token>",
  "user": { "id": 1, "username": "...", "email": "...", "nama": "..." }
}
```

Include the token in requests to protected endpoints using the Authorization header:

```
Authorization: Bearer <jwt_token>
```

Example curl requests
---------------------

Examples (curl)

Register a new user:

```bash
curl -sS -X POST http://localhost:5000/users/register \
  -H "Content-Type: application/json" \
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
