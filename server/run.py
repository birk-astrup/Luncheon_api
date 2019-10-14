from app.server import create_app
import os

if __name__ == "__main__":
    app = create_app()

    if os.environ["FLASK_ENV"] is "development": 
        app.run()