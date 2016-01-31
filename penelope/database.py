
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

import settings

# JSON of entire library cached in memory
# this is the fundamental return from initial API get calls to the app
# and since it rarely changes, we may as well avoid troubling our database for it
LIBRARY_CACHE = ''

engine = create_engine(settings.SQLALCHEMY_DATABASE_URI, convert_unicode=True)
engine.raw_connection().connection.text_factory = lambda x: unicode(x, 'utf-8', 'ignore')
db_session = scoped_session(sessionmaker(autocommit=False, autoflush=True, bind=engine))

Base = declarative_base()
Base.query = db_session.query_property()

def init_db():
    import models
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)


def init_library(to_add=None):
    # TO DO -- let clients upload and add folders to the library
    
    from .services import tracks, albums
    
    rv = []
    for a in albums.all():
        entry = a.to_json()
        entry['tracks'] = [t.to_json(hidden=['album', 'artist', 'year']) for t in tracks.find(album=a.name).all()]
        rv.append(entry)
    print rv
        