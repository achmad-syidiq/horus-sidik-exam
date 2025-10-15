"""
User routes for Horus Fullstack Exam backend.

Endpoints:
- POST /users/register  -> register new user
- POST /users/login     -> authenticate user
- GET /users            -> list all users (protected)
- PUT /users/<id>       -> update user (protected)
- DELETE /users/<id>    -> delete user (protected)
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.extensions import db
from app.models.user import User
from app.utils.validator import validate_user_input

users_bp = Blueprint("users_bp", __name__)

# ----------------------------
# Register
# ----------------------------
@users_bp.route("/users/register", methods=["POST"])
def register_user():
    """
    Register a new user with hashed password.
    Validates email, username, password, and nama.
    """
    data = request.get_json() or {}
    username = data.get("username", "").strip()
    password = data.get("password", "")
    email = data.get("email", "").strip()
    nama = data.get("nama", "").strip()

    # Validate required fields
    validation = validate_user_input(username, email, password, nama)
    if not all(validation.values()):
        return jsonify({
            "message": "Validasi gagal",
            "errors": validation
        }), 400

    # Check uniqueness
    if User.get_by_username(username):
        return jsonify({"message": "Username sudah digunakan"}), 400
    if User.get_by_email(email):
        return jsonify({"message": "Email sudah digunakan"}), 400

    # Hash password and create user
    new_user = User(username=username, email=email, nama=nama)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Registrasi berhasil"}), 201

# ----------------------------
# Login
# ----------------------------
@users_bp.route("/users/login", methods=["POST"])
def login():
    """
    Authenticate user and return JWT access token.
    """
    data = request.get_json() or {}
    username = data.get("username", "").strip()
    password = data.get("password", "")

    user = User.get_by_username(username)
    if not user or not user.check_password(password):
        return jsonify({"message": "Username atau password salah"}), 401

    # Create JWT token (valid 1 day)
    access_token = create_access_token(identity=str(user.id))
    return jsonify({
        "access_token": access_token,
        "user": user.to_dict()
    }), 200

# ----------------------------
# Get all users (protected)
# ----------------------------
@users_bp.route("/users", methods=["GET"])
@jwt_required()
def get_users():
    users = User.query.all()
    data = [
        {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "nama": user.nama
        }
        for user in users
    ]
    return jsonify(data), 200

# ----------------------------
# Update user (protected)
# ----------------------------
@users_bp.route("/users/<int:user_id>", methods=["PUT"])
@jwt_required()
def update_user(user_id: int):
    """
    Update user by ID. Protected route.
    """
    data = request.get_json() or {}
    user = User.query.get_or_404(user_id)

    username = data.get("username", user.username).strip()
    email = data.get("email", user.email).strip()
    nama = data.get("nama", user.nama).strip()

    # Validate updated fields
    validation = validate_user_input(username, email, "DummyPass123!", nama)
    if not validation["username"] or not validation["email"] or not validation["nama"]:
        return jsonify({"message": "Validasi gagal", "errors": validation}), 400

    # Check uniqueness if changed
    if username != user.username and User.get_by_username(username):
        return jsonify({"message": "Username sudah digunakan"}), 400
    if email != user.email and User.get_by_email(email):
        return jsonify({"message": "Email sudah digunakan"}), 400

    # Update user
    user.username = username
    user.email = email
    user.nama = nama
    db.session.commit()

    return jsonify({"message": "Data user berhasil diperbarui"}), 200

# ----------------------------
# Delete user (protected)
# ----------------------------
@users_bp.route("/users/<int:user_id>", methods=["DELETE"])
@jwt_required()
def delete_user(user_id: int):
    """
    Delete user by ID. Protected route.
    """
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User berhasil dihapus"}), 200
