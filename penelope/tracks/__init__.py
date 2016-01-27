import os, sys
from mutagen import File as load


class TrackHandler(object):
    dirs = []
    
    @staticmethod
    def get_id3(override_dir=False):
        from ..settings import MUSIC_DIRS
        if override_dir:
            TrackHandler.dirs = override_dir
        else:
            TrackHandler.dirs = MUSIC_DIRS
        for root in TrackHandler.dirs:
            for path in TrackHandler.walk_dir(root):
                try:
                    track = load(path, easy=True)
                    yield track, path
                except:
                    pass
                

    @staticmethod
    def walk_dir(root):
        for name in os.listdir(root):
            path = os.path.join(root, name)
            if os.path.isfile(path):
                yield path
            elif path not in TrackHandler.dirs:
                for p in TrackHandler.walk_dir(path):
                    yield p


