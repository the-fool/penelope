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
    albmun = Column(String)
    artist = Column(String)
    path = Column(String)
    
    def __repr__(self):
        return "<Track({0}_{1})>".format(self.artist,self.title)
    