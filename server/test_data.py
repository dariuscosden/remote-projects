from flask import current_app as app
from server.database import db
from server.models import Contract, Company, Tag
from server.functions import get_unix


def inject_test_data():

    if not Contract.query.all():

        # contract
        contract = Contract(
            title="Test Contract",
            location="Frankfurt, Germany",
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

        company.contracts.append(contract)

        # tags
        tag1 = Tag(
            name="react",
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
        db.session.add(tag2)
        db.session.add(tag3)

        contract.tags.append(tag1)
        contract.tags.append(tag2)
        contract.tags.append(tag3)

        db.session.commit()

    return
