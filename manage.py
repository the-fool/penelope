# -*- coding: utf-8 -*-
from flask.ext.migrate import Migrate, MigrateCommand
from flask.ext.script import Manager, Shell

from penelope.api import create_app
from penelope.models import Track
from penelope.tracks import ID3
from penelope.database import init_db, db_session

app = create_app()
manager = Manager(app)


def make_shell_context():
    return dict(app=app, Track=Track, sess=db_session, init_db=init_db,
                id3=ID3.get_id3)


manager.add_command('shell', Shell(make_context=make_shell_context))
manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()
