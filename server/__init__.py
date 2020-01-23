from flask import Flask
from server.database import db
from pathlib import Path
import os

# directories
current_dir = os.path.dirname(os.path.realpath(__file__))
parent_dir = os.path.dirname(current_dir)


def create_app():

    # creates the app
    app = Flask(__name__,
                static_folder=os.path.join(parent_dir, 'assets'),
                template_folder=os.path.join(parent_dir, 'templates'),
                )

    # loads config
    config = Path(os.path.join(app.instance_path, 'config.py'))

    from instance.config import dev_config

    # dev config
    app.config.from_object(dev_config)

    # views
    with app.app_context():
        from server import views

        # projects
        from server.projects import api as projects_api
        app.register_blueprint(projects_api.bp)

        # tags
        from server.tags import api as tags_api
        app.register_blueprint(tags_api.bp)

        # post
        from server.post import api as post_api
        app.register_blueprint(post_api.bp)

    # databbase
    with app.app_context():
        db.init_app(app)
        db.create_all()

    # test data
    with app.app_context():
        from server.test_data import inject_test_data
        inject_test_data()

    return app
