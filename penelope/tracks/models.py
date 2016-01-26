from sqlalchemy import Column, Float, Integer, String, Text

from ..helpers import JsonSerializer
from ..database import Base

class TrackJsonSerializer(JsonSerializer):
    __json_hidden__ = ['path']

class Track(Base, TrackJsonSerializer):
    __tablename__ = 'Tracks'
    pk = Column(Integer, primary_key=True, sqlite_autoincrement=True)
    title = Column(String)
    length = Column(Integer)
    albmun = Column(String)
    artist = Column(String)
    path = Column(String)
    