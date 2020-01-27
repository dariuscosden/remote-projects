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

    # checks for id
    project_id = request.args.get('id')
    if project_id:

        project = Project.query.filter_by(id=project_id).first()

        return json.dumps([get_project(project)])

    return json.dumps([get_project(p) for p in Project.query.filter(Project.published == True).order_by(Project.created_at.desc()).all()])
