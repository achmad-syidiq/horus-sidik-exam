"""
Entry point for Horus Fullstack Exam backend.

Runs the Flask development server on localhost:5000 by default.
"""

from app import create_app
from flask import Flask

# Create Flask app using application factory
app: Flask = create_app()

# --------------------------
# Main entry
# --------------------------
if __name__ == "__main__":
    # host="0.0.0.0" allows access from external devices; change to "127.0.0.1" for local only
    # debug=True enables hot reload and debug toolbar for development
    app.run(host="0.0.0.0", port=5000, debug=True)
