import os
basedir = os.path.abspath(os.path.dirname(__file__))

#: Set this list of directories to config the music search path
MUSIC_DIRS = [os.path.expanduser('~/Music')]

DEBUG = True
SECRET_KEY = 'penelope'

SQLALCHEMY_COMMIT_ON_TEARDOWN = True
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')

