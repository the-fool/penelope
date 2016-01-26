import os
from mutagen.easyid3 import EasyID3 as ID3


def get_id3(override_dir=False):
    if override_dir:
        dirs = override_dir
    else:
        from ..settings import MUSIC_DIRS
        dirs = MUSIC_DIRS
    for root in dirs:
        for path in walk_dir(root, dirs):
            print path

def walk_dir(root, dir_list):
    for name in os.listdir(root):
        path = os.path.join(root, name)
        if os.path.isfile(path):
            yield path
        elif path not in dir_list:
            for p in walk_dir(path, dir_list):
                yield p
        
                
