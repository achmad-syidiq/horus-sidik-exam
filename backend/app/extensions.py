"""
Extensions module for initializing Flask extensions.
This centralizes extension initialization for better maintainability.
"""

from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_migrate import Migrate

# Database ORM
db = SQLAlchemy()

# JWT Authentication
jwt = JWTManager()

# CORS handling for frontend communication
cors = CORS()

# Database migrations
migrate = Migrate()