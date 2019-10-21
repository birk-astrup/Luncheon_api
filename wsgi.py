from app.server import create_app
import logging
import os

app = create_app()

if __name__ != '__main__':
    gunicorn_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)

if "FLASK_ENV" in os.environ and os.environ["FLASK_ENV"] is "development": 
    app.run()