"""
Flask application factory for Horus Fullstack Exam backend.

- Initializes Flask app
- Loads configuration
- Registers extensions (DB, Migrate, JWT, CORS)
- Registers Blueprints (user routes)
"""

from flask import Flask
from .config import Config
from .extensions import db, migrate, jwt, cors
from .routes.users import users_bp


def create_app(config_object: str | None = None) -> Flask:
    """
    Create and configure the Flask application.

    Args:
        config_object (str | None): Optional config class path or object.
            Defaults to None, which loads the default Config.

    Returns:
        Flask: Configured Flask application instance
    """
    app = Flask(__name__, instance_relative_config=False)

    # Load configuration
    if config_object:
        app.config.from_object(config_object)
    else:
        app.config.from_object(Config)

    # --------------------------
    # Initialize extensions
    # --------------------------
    cors.init_app(app, resources={r"/*": {"origins": "*"}})
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    # --------------------------
    # Register blueprints
    # --------------------------
    app.register_blueprint(users_bp)

    # --------------------------
    # Health check route
    # --------------------------
    @app.route("/health", methods=["GET"])
    def health() -> dict:
        """
        Simple health check endpoint.

        Returns:
            dict: Status of the app
        """
        return {"status": "ok"}, 200

    return app
