import os
basedir = os.path.abspath(os.path.dirname(__file__))

class DevelopmentConfig(object):
    SECRET_KEY = 'dev'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'instance/database.db')

    # stops app signaling on any changes
    SQLALCHEMY_TRACK_MODIFICATIONS = False
