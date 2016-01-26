import os
from mutagen.easyid3 import EasyID3 as ID3


class ID3(object):
    
    @staticmethod
    def get_id3(override_dir=False):
        from ..settings import MUSIC_DIRS
        if override_dir:
            ID3.dirs = override_dir
        else:
            ID3.dirs = MUSIC_DIRS
        for root in ID3.dirs:
            for path in ID3.walk_dir(root):
                print path

    @staticmethod
    def walk_dir(root):
        for name in os.listdir(root):
            path = os.path.join(root, name)
            if os.path.isfile(path):
                yield path
            elif path not in ID3.dirs:
                for p in ID3.walk_dir(path):
                    yield p


