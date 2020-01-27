from flask import current_app as app
from flask import Blueprint, request
from server.models import Project, Company, Tag
from server.database import db
from server.functions import get_unix
from server.error import RequestError, general_error
from server.projects.helpers import get_project
import json
import stripe

# sets stripe api key
stripe.api_key = app.config['STRIPE_API_KEY']

bp = Blueprint('post', __name__)


# creates a project preview
@bp.route('/api/v1/project_preview', methods=['POST'])
def project_preview():

    # company variables
    try:
        name = request.form['company_name']
        location = request.form['company_location']
        email = request.form['company_email']
    except KeyError as e:
        print(e)
        raise RequestError(general_error, 400)

    # checks for existing company
    company = Company.query.filter_by(email=email.lower()).first()

    # creates a company
    if not company:
        company = Company(
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
    except KeyError as e:
        print(e)
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
            demo=False,
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
    except KeyError as e:
        print(e)
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


# creates a payment intent
@bp.route('/api/v1/payment_intent', methods=['POST'])
def payment_intent():

    # gets the company email and source
    try:
        source = request.form['source']
        company_email = request.form['email']
    except KeyError as e:
        print(e)
        raise RequestError(general_error, 400)

    # finds the company which is already created here
    company = Company.query.filter_by(email=company_email.lower()).first()

    # checks for stripe customer
    customer = None
    if company.stripe_id:
        try:
            # updates source
            customer = stripe.Customer.modify(
                company.stripe_id,
                source=source
            )
        except Exception as e:
            print(e)
            raise RequestError(general_error, 400)

    # creates a stripe customer
    if not customer:
        try:
            customer = stripe.Customer.create(
                email=company.email,
                description=company.name,
                source=source,
            )

            # adds it to company
            company.stripe_id = customer.id
            db.session.commit()

        except Exception as e:
            print(e)
            raise RequestError(general_error, 400)

    # creates a payment intent
    try:
        payment_intent = stripe.PaymentIntent.create(
            amount=29900,
            currency="usd",
            payment_method=source,
            customer=customer,
        )
    except Exception as e:
        print(e)
        raise RequestError(
            'Something went wrong while processing your payment. Please try again later.', 400)

    return json.dumps({
        "client_secret": payment_intent.client_secret,
        "payment_intent_id": payment_intent.id,
    })


# publishes a project after payment
@bp.route('/api/v1/publish_project', methods=['POST'])
def publish_project():

    # gets the project id
    try:
        project_id = request.form['id']
    except KeyError as e:
        print(e)
        raise RequestError(general_error, 400)

    # finds the project
    project = Project.query.filter_by(id=project_id).first()

    project.published = True

    db.session.commit()

    return json.dumps([get_project(project)])
