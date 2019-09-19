from flask import Flask
import os
from app.config import dev_config, prod_config


def create_app(config = dev_config):
    app = Flask(__name__)
    if "FLASK_ENV" in os.environ and os.environ["FLASK_ENV"] == "production":
        config = prod_config
    app.config.from_object(config)

    @app.route("/")
    def entry():
        return "HALLO"
    
    return app

