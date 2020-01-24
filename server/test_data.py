from flask import current_app as app
from server.database import db
from server.models import Project, Company, Tag
from server.functions import get_unix


def inject_test_data():

    if not Project.query.all():

        # project
        project = Project(
            published=True,
            title="Test Project",
            description="Test Description",
            restrictions="Europe Only",
            link="https://test-link.com",
            created_at=get_unix(),
            modified_at=get_unix(),
        )

        # company
        company = Company(
            name="Test Company",
            location="Frankfurt, Germany",
            email="test@company.com",
            logo="test-logo",
            created_at=get_unix(),
            modified_at=get_unix(),
        )

        db.session.add(company)

        company.projects.append(project)

        # tags
        tag1 = Tag(
            name="react",
            created_at=get_unix(),
            modified_at=get_unix(),
        )
        tag1_1 = Tag(
            name="reactjs",
            created_at=get_unix(),
            modified_at=get_unix(),
        )
        tag1_2 = Tag(
            name="react-javascript",
            created_at=get_unix(),
            modified_at=get_unix(),
        )
        tag2 = Tag(
            name="python",
            created_at=get_unix(),
            modified_at=get_unix(),
        )
        tag3 = Tag(
            name="go",
            created_at=get_unix(),
            modified_at=get_unix(),
        )

        db.session.add(tag1)
        db.session.add(tag1_1)
        db.session.add(tag1_2)
        db.session.add(tag2)
        db.session.add(tag3)

        project.tags.append(tag1)
        project.tags.append(tag1_1)
        project.tags.append(tag1_2)
        project.tags.append(tag2)
        project.tags.append(tag3)

        db.session.commit()

    return
