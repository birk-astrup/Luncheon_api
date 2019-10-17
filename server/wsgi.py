from app.server import create_app
import os

app = create_app()

if "FLASK_ENV" in os.environ and os.environ["FLASK_ENV"] is "development": 
    app.run()