import json
import shutil
import os

with open ('config.json') as f:
    x = f.read()
json_dict = json.loads(x)

src = json_dict['fumoFolder']
dst = os.getcwd()+r'/fumoFolder'
print(dst)

for folder, subfolders, files in os.walk(src):
    for file in files:
        src=os.path.join(folder, file)
        if file in os.listdir(dst):
            print(file+" exists.")
        else:
            print(file+' does not exist.')
            shutil.copy2(src, dst)