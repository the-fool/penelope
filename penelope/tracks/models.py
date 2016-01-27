# -*- coding: utf_8 -*-

from sqlalchemy import Column, Float, Integer, String, Text

from ..helpers import JsonSerializer
from ..database import Base, init_db, db_session as sess 

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
    def populate_tracks(custom_dir = None):
        def add_tracks(tentative):
            try:
                sess.commit()
                for t in tentative:
                    print "[Added] " + t
                del tentative[:]
            except:
                sess.rollback()
                raise
    
        if not custom_dir:
            init_db()
        from . import TrackHandler 
        
        i = 0
        phase = 10
        tentative = []
        for track, path in TrackHandler.get_id3(custom_dir):
            # the generator may throw exceptions and exit yielding None
            if not track:
                continue
            new_track = Track.id3_to_sql(track)
            new_track.path = path
            sess.add(new_track)
            tentative.append(new_track.path)
            # what if I am loading 10,000 songs?
            # Should it periodically commit changes?
            if i == 0:
                add_tracks(tentative)
            i = (i + 1) % phase
        add_tracks(tentative)
        
                    
                
    @staticmethod
    def id3_to_sql(t):
        tag = t.tags
        return Track(title=tag['title'][0], 
                  album=tag['album'][0], 
                  artist=tag['artist'][0], 
                  track_num=tag['tracknumber'][0].split('/')[0], # tracknumber = '5/12' 
                  length=int(t.info.length))
        
    