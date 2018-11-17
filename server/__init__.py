from flask import Flask
from pathlib import Path
import os

def create_app():

    # creates the app
    app = Flask(__name__, static_folder='../static/dist', template_folder='../static/templates')


    # configuration
    devConfig = Path(os.path.join(app.instance_path, 'devConfig.py'))
    prodConfig = Path(os.path.join(app.instance_path, 'prodConfig.py'))

    # dev over prod
    if devConfig.is_file():
        from instance.devConfig import DevelopmentConfig
        app.config.from_object(DevelopmentConfig)

    elif prodConfig.is_file():
        from instance.prodConfig import ProductionConfig
        app.config.from_object(ProductionConfig)

    # views
    with app.app_context():
        from server import views

    return app
