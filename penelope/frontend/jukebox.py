from flask import Blueprint, render_template

from . import route

bp = Blueprint('jukebox', __name__)

@route(bp, '/')
def jukebox():
    return render_template('jukebox.html')