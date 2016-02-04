from sqlalchemy import Column, Integer, String

from ..helpers import JsonSerializer
from ..database import Base, db_session as sess 

class AlbumJsonSerializer(JsonSerializer):
    pass

class Album(Base, AlbumJsonSerializer):
    __tablename__ = 'Albums'
    __table_ars__ = {'sqlite_autoincrement': True}
    pk = Column(Integer, primary_key=True)
    album = Column(String)
    artist = Column(String)
    num_tracks = Column(Integer)
    year = Column(Integer)
    
    def __repr__(self):
        return u'<Album: {0} - {1} - [{2}] ({3})>'.format(self.artist, self.name, self.year, self.num_tracks)
    
    @staticmethod
    def populate_albums():
        from sqlalchemy import func
        from ..tracks import Track
        for track, count in sess.query(Track, func.count(Track.pk)).group_by(Track.album).all():
            a = Album(
                album=track.album,
                artist=track.artist,
                year=track.year,
                num_tracks=count
            )
            sess.add(a)
            sess.commit()
        
        
        