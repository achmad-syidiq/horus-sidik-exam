"""
Configuration module for Horus Exam Backend.
Handles environment variables and application settings.
"""

import os
from dotenv import load_dotenv

load_dotenv()  # load .env in project root if exists

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))

class Config:
    """
    Base configuration class for Flask application.
    
    Attributes:
        SQLALCHEMY_DATABASE_URI (str): Database connection string
        JWT_SECRET_KEY (str): Secret key for JWT token generation
        JWT_ACCESS_TOKEN_EXPIRES (timedelta): JWT token expiration time
    """

    # Database Configuration
    SECRET_KEY = os.environ.get("SECRET_KEY", "supersecretkey")
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL" or "mysql+pymysql://root:123456@localhost:3306/horus_sidik_db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # JWT Configuration
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "jwtsecretkey")
    JWT_ACCESS_TOKEN_EXPIRES = int(os.environ.get("JWT_ACCESS_TOKEN_EXPIRES_SECONDS", 7200))
