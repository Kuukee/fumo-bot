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
            os.rename(dst+"/"+file, dst+"/"+file.lower())
            #print(file+" exists.")             #remove the comment to enable logging which files are or arent there
            pass
        else:
            #print(file+' does not exist.')     #remove the comment to enable logging which files are or arent there
            shutil.copy2(src, dst)
            os.rename(dst+"/"+file, dst+"/"+file.lower()) #renames all files to lowercase