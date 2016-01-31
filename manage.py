# -*- coding: utf-8 -*-
# Author: Thomas Ruble
from flask.ext.migrate import Migrate, MigrateCommand
from flask.ext.script import Manager, Shell

from penelope.api import create_app
from penelope.core import db                        
from penelope.models import *
from penelope.tracks import TrackHandler
from penelope.database import init_db, init_library, db_session
from penelope.services import *
    
app = create_app()
manager = Manager(app)
migrate = Migrate(app, db)

def refresh_data():
    init_db()
    Track.populate_tracks()
    Album.populate_albums()
    init_library()

def make_shell_context():
    return dict(app=app, 
                Track=Track, 
                Album=Album, 
                sess=db_session, 
                init_db=init_db,
                init_library=init_library,
                get_id3=TrackHandler.get_id3,
                refresh_data=refresh_data)


manager.add_command('shell', Shell(make_context=make_shell_context))
manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()
