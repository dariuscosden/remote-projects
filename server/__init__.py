from flask import Flask
from config import DevelopmentConfig

def create_app():

    # creates the app
    app = Flask(__name__, static_folder='../static/dist', template_folder='../static/templates')

    # configuration
    app.config.from_object(DevelopmentConfig)

    # views
    with app.app_context():
        from server import views

    return app
