from .models import Album
from ..core import Service


class AlbumsService(Service):
    __model__ = Album