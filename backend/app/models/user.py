"""
User model definition.
Represents the users table in the database with proper constraints and methods.
"""

from app.extensions import db
from datetime import datetime, timezone
import bcrypt


class User(db.Model):
    """
    User model for storing user authentication and profile data.
    
    Attributes:
        id (int): Primary key, auto-incrementing
        username (str): Unique username, max 50 characters
        password (str): Hashed password, max 255 characters
        email (str): Unique email, max 100 characters
        nama (str): Full name, max 100 characters
        created_at (datetime): Timestamp of user creation
    """
    
    __tablename__ = 'users'
    
    # Primary Key
    id = db.Column(
        db.Integer, 
        primary_key=True, 
        autoincrement=True,
        comment='Primary key, auto incrementing'
    )
    
    # Authentication Fields
    username = db.Column(
        db.String(50), 
        unique=True, 
        nullable=False,
        index=True,
        comment='Unique username, required'
    )
    
    password = db.Column(
        db.String(255), 
        nullable=False,
        comment='Hashed password, required'
    )
    
    email = db.Column(
        db.String(100), 
        unique=True, 
        nullable=False,
        index=True,
        comment='Unique email address, required'
    )
    
    # Profile Fields
    nama = db.Column(
        db.String(100), 
        nullable=False,
        comment='Full name, required'
    )
    
    # Timestamps
    created_at = db.Column(
        db.DateTime, 
        default=datetime.now(timezone.utc),
        nullable=False,
        comment='Timestamp of user creation, defaults to current time'
    )
    
    def set_password(self, password: str) -> None:
        """
        Hash and set user password.
        
        Args:
            password (str): Plain text password to hash
            
        Returns:
            None
        """
        salt = bcrypt.gensalt(rounds=12)
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
        self.password = hashed_password.decode('utf-8')
    
    def check_password(self, password: str) -> bool:
        """
        Verify password against stored hash.
        
        Args:
            password (str): Plain text password to verify
            
        Returns:
            bool: True if password matches, False otherwise
        """
        return bcrypt.checkpw(
            password.encode('utf-8'), 
            self.password.encode('utf-8')
        )
    
    def to_dict(self) -> dict:
        """
        Convert user object to dictionary for JSON serialization.
        Excludes sensitive information like password.
        
        Returns:
            dict: User data without password
        """
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'nama': self.nama,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self) -> str:
        """String representation of User object."""
        return f'<User {self.username} ({self.email})>'
    
    @classmethod
    def get_by_username(cls, username: str):
        """
        Get user by username.
        
        Args:
            username (str): Username to search for
            
        Returns:
            User: User object if found, None otherwise
        """
        return cls.query.filter_by(username=username).first()
    
    @classmethod
    def get_by_email(cls, email: str):
        """
        Get user by email.
        
        Args:
            email (str): Email to search for
            
        Returns:
            User: User object if found, None otherwise
        """
        return cls.query.filter_by(email=email).first()