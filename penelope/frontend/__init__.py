from flask import render_template
from .. import factory

def create_app(settings_override=None):
    """Returns the Penelope jukebox application instance"""
    app = factory.create_app(__name__, __path__, settings_override)

    return app