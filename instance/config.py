import os

# current dir
current_dir = os.path.abspath(os.path.dirname(__file__))


class dev_config:

    # testing
    TESTING = False

    # development
    DEVELOPMENT = True

    # dev app stuff
    SECRET_KEY = "dev"

    SQLALCHEMY_DATABASE_URI = "sqlite:///" + \
        os.path.join(current_dir, "database.db")

    # stops app signaling on any changes
    SQLALCHEMY_TRACK_MODIFICATIONS = False
