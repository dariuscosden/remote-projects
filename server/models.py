from server.database import db

tags = db.Table('tags',
                db.Column('tag_id', db.Integer, db.ForeignKey(
                    'tag.id'), primary_key=True),
                db.Column('project_id', db.Integer, db.ForeignKey(
                    'project.id'), primary_key=True)
                )


class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    restrictions = db.Column(db.String)
    link = db.Column(db.String, nullable=False)
    created_at = db.Column(db.Float, nullable=False)
    modified_at = db.Column(db.Float, nullable=False)

    # company relationship
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'),
                           nullable=False)

    # tags relationship
    tags = db.relationship('Tag', secondary=tags, lazy='subquery',
                           backref=db.backref('projects', lazy=True))

    # serializes
    @property
    def serialize(self):
        json_project = {
            "id": self.id,
            "title": self.title,
            "location": self.location,
            "description": self.description,
            "restrictions": self.restrictions,
            "link": self.link,
            "created_at": self.created_at,
            "modified_at": self.modified_at,
        }

        return json_project

    # repr
    def __repr__(self):
        return "<Project - {}>".format(self.title)


class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    created_at = db.Column(db.Float, nullable=False)
    modified_at = db.Column(db.Float, nullable=False)

    # serializes
    @property
    def serialize(self):
        json_tag = {
            "id": self.id,
            "name": self.name,
            "created_at": self.created_at,
            "modified_at": self.modified_at,
        }

        return json_tag

    # repr
    def __repr__(self):
        return "<Tag - {}>".format(self.name)


class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    logo = db.Column(db.String, nullable=False)
    created_at = db.Column(db.Float, nullable=False)
    modified_at = db.Column(db.Float, nullable=False)

    # projects relationship
    projects = db.relationship('Project', backref='company', lazy=True)

    # serializes
    @property
    def serialize(self):
        json_company = {
            "id": self.id,
            "name": self.name,
            "location": self.location,
            "email": self.email,
            "logo": self.logo,
            "created_at": self.created_at,
            "modified_at": self.modified_at,
        }

        return json_company

    # repr
    def __repr__(self):
        return "<Company - {}>".format(self.name)
