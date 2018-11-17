from flask import Flask

def create_app():

    # creates the app
    app = Flask(__name__, static_folder='../static/dist', template_folder='../static/templates')

    # configuration
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
