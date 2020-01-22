from flask import Blueprint, request
from server.models import Project
from server.database import db
from server.error import RequestError, general_error
from .helpers import get_project
import json

bp = Blueprint('projects', __name__)


# fetches projects
@bp.route('/api/v1/projects')
def fetch_projects():

    return json.dumps([get_project(c) for c in Project.query.all()])
