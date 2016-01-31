from flask import Blueprint, send_file, current_app

bp = Blueprint('library', __name__, url_prefix='/library')

@bp.route('/')
def get_library():
    return send_file(current_app.config['LIBRARY_CACHE'])