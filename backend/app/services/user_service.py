"""
User service layer for Horus Fullstack Exam backend.

Berisi helper functions untuk operasi CRUD User.
Memisahkan logika bisnis dari routes agar kode lebih bersih dan maintainable.
"""

from app.models.user import User
from app.extensions import db
from typing import List, Optional


def create_user(username: str, password: str, email: str, nama: str) -> User:
    """
    Create a new user with hashed password and save to database.

    Args:
        username (str): Unique username
        password (str): Plain text password
        email (str): Unique email
        nama (str): Full name

    Returns:
        User: Newly created User object
    """
    user = User(username=username, email=email, nama=nama)
    user.set_password(password)  # Use model's hashing method
    db.session.add(user)
    db.session.commit()
    return user


def get_all_users() -> List[User]:
    """
    Retrieve all users from the database.

    Returns:
        List[User]: List of all User objects
    """
    return User.query.all()


def get_user_by_id(user_id: int) -> Optional[User]:
    """
    Get a user by ID.

    Args:
        user_id (int): User's ID

    Returns:
        Optional[User]: User object if found, else None
    """
    return User.query.get(user_id)


def update_user(user: User, username: str, email: str, nama: str) -> User:
    """
    Update user's information.

    Args:
        user (User): User object to update
        username (str): New username
        email (str): New email
        nama (str): New full name

    Returns:
        User: Updated User object
    """
    user.username = username
    user.email = email
    user.nama = nama
    db.session.commit()
    return user


def delete_user(user: User) -> None:
    """
    Delete user from the database.

    Args:
        user (User): User object to delete

    Returns:
        None
    """
    db.session.delete(user)
    db.session.commit()
