import codecs

from flask import Blueprint, current_app
from . import route

bp = Blueprint('library', __name__, url_prefix='/library')

@bp.route('/')
def get_library():
    with codecs.open(current_app.config['LIBRARY_CACHE'], 'r', 'utf-8') as library:
        data = library.read()
    return data, 200, {'Content-Type': 'application/json; charset=utf-8'}