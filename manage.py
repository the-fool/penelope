from flask.ext.migrate import Migrate, MigrateCommand
from flask.ext.script import Manager, Shell

from penelope.models import Track
from penelope.api import create_app
from penelope.database import init_db, db_session

app = create_app()
manager = Manager(app)

def make_shell_context():
    return dict(app=app, Track=Track, sess=db_session, init_db=init_db)

manager.add_command('shell', Shell(make_context=make_shell_context))
manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()