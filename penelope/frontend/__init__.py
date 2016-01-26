from functools import wraps

from flask import render_template

from .. import factory
from . import assets

def create_app(settings_override=None):
    """Returns the Penelope jukebox application instance"""
    app = factory.create_app(__name__, __path__, settings_override)
    
    assets.init_app(app)
    
    return app

def route(bp, *args, **kwargs):
    def decorator(f):
        @bp.route(*args, **kwargs)
        @wraps(f)
        def wrapper(*args, **kwargs):
            return f(*args, **kwargs)
        return f

    return decorator