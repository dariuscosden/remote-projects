from flask import Blueprint, request
from server.models import Contract
from server.database import db
from server.error import RequestError, general_error
from .helpers import get_contract
import json

bp = Blueprint('contracts', __name__)


# fetches contracts
@bp.route('/api/v1/contracts')
def fetch_contracts():

    return json.dumps([get_contract(c) for c in Contract.query.all()])
