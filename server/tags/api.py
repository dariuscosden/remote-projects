from flask import Blueprint, request
from server.models import Tag
from server.database import db
from server.error import RequestError, general_error
from .helpers import get_tag
import json

bp = Blueprint('tags', __name__)


# fetches tags
@bp.route('/api/v1/tags')
def fetch_tags():

    # query from input
    query = request.args.get('query')
    if query:

        return json.dumps([get_tag(t) for t in Tag.query.filter(Tag.name.contains(query)).limit(5).all()])

    return json.dumps([get_tag(t) for t in Tag.query.all()])
