from flask import current_app as app
from server.database import db
from server.models import Project, Company, Tag
from server.functions import get_unix


def inject_test_data():

    if not Project.query.all():

        # projects
        project1 = Project(
            published=True,
            demo=True,
            title="Online Picure Converter (React)",
            description="""
            <h1>Project Description</h1>
            <p>
            We need a developer to create an online picture
            converter that will be able to convert images
            into different formats.
            </p>
            <p>
            This project needs to be built with React and needs
            to be a single page application (SPA).
            </p>
            """,
            link="https://letsconvert.app",
            created_at=get_unix(),
            modified_at=get_unix(),
        )
        project2 = Project(
            published=True,
            demo=True,
            title="Babysitting Booking Platform",
            description="""
            <h1>Project Description</h1>
            <p>
            We need a developer to migrate our existing buggy
            wordpress website to a new framework that is faster,
            more efficient, and can handle our increasing sales.
            </p>
            <p>
            Our company is an on-demand babysitter booking service
            that needs to allow users to book with real-time 
            availabilities and babysitter schedules.
            </p>
            """,
            link="https://kiid.ca/en",
            created_at=get_unix() + 1,
            modified_at=get_unix() + 1,
        )
        project3 = Project(
            published=True,
            demo=True,
            title="Persian Carpets Store CMS",
            description="""
            <h1>Project Description</h1>
            <p>
            We need a developer to build a custom CMS system
            that integrates with our existing protocols and
            ways of doing things.
            </p>
            <p>
            Our existing website is built on a framwork from
            1999 and is no longer performing adequately.
            We need something newer, better that can integrate
            with our existing inventory and procedures.
            </p>
            """,
            link="https://bashircarpets.com",
            created_at=get_unix() + 2,
            modified_at=get_unix() + 2,
        )
        project4 = Project(
            published=True,
            demo=True,
            title="Online 3D Art Gallery",
            description="""
            <h1>Project Description</h1>
            <p>
            We need a developer to build a 3D art gallery that
            will allow artists to upload their artworks and
            buyers to purchase them / view them in 3D.
            </p>
            <p>
            We also need a custom CMS solution to manage these
            artists and artworks, as well as a way to post events
            and have users be able to RSVP to the events they want
            to participate to.
            </p>
            """,
            restrictions="Europe Only",
            link="https://st-artamsterdam.com",
            created_at=get_unix() + 3,
            modified_at=get_unix() + 3,
        )

        db.session.add(project1)
        db.session.add(project2)
        db.session.add(project3)
        db.session.add(project4)

        # company
        company1 = Company(
            name="Let's Convert",
            location="International",
            email="info@letsconvert.app",
            logo="/assets/img/companies/logo-placeholder.png",
            created_at=get_unix(),
            modified_at=get_unix(),
        )
        company2 = Company(
            name="Kiid Babysitting",
            location="Montreal, Canada",
            email="info@kiid.ca",
            logo="/assets/img/companies/logo-placeholder.png",
            created_at=get_unix() + 1,
            modified_at=get_unix() + 1,
        )
        company3 = Company(
            name="Bashir Persian Rugs",
            location="Montreal, Canada",
            email="info@bashircarpets.com",
            logo="/assets/img/companies/logo-placeholder.png",
            created_at=get_unix() + 2,
            modified_at=get_unix() + 2,
        )
        company4 = Company(
            name="St-Art Amsterdam",
            location="Amsterdam, Netherlands",
            email="info@st-artamsterdam.com",
            logo="/assets/img/companies/logo-placeholder.png",
            created_at=get_unix() + 3,
            modified_at=get_unix() + 3,
        )

        db.session.add(company1)
        db.session.add(company2)
        db.session.add(company3)
        db.session.add(company4)

        company1.projects.append(project1)
        company2.projects.append(project2)
        company3.projects.append(project3)
        company4.projects.append(project4)

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

        project1.tags.append(tag1)
        project2.tags.append(tag1)
        project3.tags.append(tag1)
        project4.tags.append(tag1)

        project1.tags.append(tag2)
        project2.tags.append(tag2)
        project3.tags.append(tag2)
        project4.tags.append(tag2)

        db.session.commit()

    return
