from flask import Blueprint, request
from server.models import Project, Company, Tag
from server.database import db
from server.functions import get_unix
from server.error import RequestError, general_error
from server.projects.helpers import get_project
import json

bp = Blueprint('post', __name__)


# creates a project preview
@bp.route('/api/v1/project-preview', methods=['POST'])
def project_preview():

    # company variables
    try:
        name = request.form['company_name']
        location = request.form['company_location']
        email = request.form['company_email']
    except KeyError:
        raise RequestError(general_error, 400)

    # checks for existing company
    company = Company.query.filter_by(email=email.lower()).first()

    # creates a company
    if not company:
        company = Company(
            published=False,
            name=name,
            location=location,
            email=email.lower(),
            logo="test-logo",
            created_at=get_unix(),
            modified_at=get_unix(),
        )
        db.session.add(company)

    # project variables
    try:
        title = request.form['title']
        description = request.form['description']
        restrictions = request.form['restrictions']
        link = request.form['link']
    except KeyError:
        raise RequestError(general_error, 400)

    # checks for existing project
    if request.form.get('project_id'):

        project_id = request.form.get('project_id')
        project = Project.query.filter_by(id=project_id).first()

        project.title = title
        project.description = description
        project.restrictions = restrictions
        project.link = link

        # removes tags as they will be re-added later
        project.tags = []

    else:

        # creates a project
        project = Project(
            published=False,
            title=title,
            description=description,
            restrictions=restrictions,
            link=link,
            created_at=get_unix(),
            modified_at=get_unix(),
        )
        db.session.add(project)

    # adds project to company
    company.projects.append(project)

    # tags variable
    try:
        tags = request.form['tags']
    except KeyError:
        raise RequestError(general_error, 400)

    # converts to list
    tags = tags.split(',')

    # creates tags
    if tags:
        for t in tags:

            # ignores ['']
            if t:

                # looks for existing tag
                tag = Tag.query.filter_by(name=t.lower()).first()
                if not tag:
                    tag = Tag(
                        name=t.lower(),
                        created_at=get_unix(),
                        modified_at=get_unix(),
                    )
                    db.session.add(tag)

                # adds tag to project
                project.tags.append(tag)

    # commits
    db.session.commit()

    return json.dumps([get_project(project)])
