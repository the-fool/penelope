
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
        return u"<Track({0}: {1})>".format(self.artist,self.title).encode('utf-8')
    
    
    @staticmethod
    def populate_tracks():
        from . import TrackHandler 
        for track, path in TrackHandler.get_id3():
            # the generator may throw exceptions and exit yielding None
            if not track:
                continue
            new_track = Track.id3_to_sql(track)
            new_track.path = path
            print new_track
            #print id3_to_sql(track)
    
    
    @staticmethod
    def id3_to_sql(t):
        tag = t.tags
        return Track(title=tag['title'][0], 
                  album=tag['album'][0], 
                  artist=tag['artist'][0], 
                  track_num=tag['tracknumber'][0].split('/')[0], # tracknumber = '5/12' 
                  length=int(t.info.length))
        
    