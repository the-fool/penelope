from sqlalchemy import Column, Integer, String

from ..helpers import JsonSerializer
from ..database import Base, init_db, db_session as sess 

class AlbumJsonSerializer(JsonSerializer):
    pass

class Album(Base, AlbumJsonSerializer):
    __tablename__ = 'Albums'
    __table_ars__ = {'sqlite_autoincrement': True}
    pk = Column(Integer, primary_key=True)
    name = Column(String)
    artist = Column(String)
    num_tracks = Column(Integer)
    year = Column(Integer)
    
    def __repr__(self):
        return u'<Album: {0} - {1} - [{2}] ({3})'.format(self.name, self.artist, self.year, self.num_tracks)