from sqlalchemy import Column, Float, Integer, String, Text

from ..helpers import JsonSerializer
from ..database import Base

class TrackJsonSerializer(JsonSerializer):
    __json_hidden__ = ['path']

class Track(Base, TrackJsonSerializer):
    __tablename__ = 'Tracks'
    __table_args__ = {'sqlite_autoincrement': True}
    pk = Column(Integer, primary_key=True)
    title = Column(String)
    length = Column(Integer)
    album = Column(String)
    artist = Column(String)
    path = Column(String)
    track_num = Column(Integer)
    
    
    def __repr__(self):
        return "<Track({0}_{1})>".format(self.artist,self.title)
    
    
    @staticmethod
    def populate_tracks():
        from ..setings import MUSIC_DIR
        from . import get_id3
        for track in get_id3:
            print id3_to_sql(track)
    
    
    @staticmethod
    def id3_to_sql(a):
        tag = a.tag
        return Track(title=tag.title, 
                  album=tag.album, 
                  artist=tag.artist, 
                  track_num=tag.track_num[0], 
                  length=a.info.time_secs, 
                  path=a.path)
        
    