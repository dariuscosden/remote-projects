from flask import Flask
from pathlib import Path
import os


def create_app():

    # creates the app
    app = Flask(__name__, static_folder='../assets',
                template_folder='../templates')

    # loads config
    config = Path(os.path.join(app.instance_path, 'config.py'))

    from instance.config import DevConfig

    # dev config
    app.config.from_object(DevConfig)

    # views
    with app.app_context():
        from server import views

    return app
