from flask import Blueprint

from . import route
from ..services import tracks

bp = Blueprint('tracks', __name__, url_prefix='/tracks')

@route(bp, '/')
def get_tracks():
    return tracks.all()