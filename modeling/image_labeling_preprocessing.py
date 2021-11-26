import glob
import numpy as np
import os
import json

File_List = glob.glob('./*/S01/*/*/*.txt')
File_List += glob.glob('./*/S02/*/*/*.txt')
File_List += glob.glob('./*/S03/*/*/*.txt')

result=""
for fl in File_List:
  s=""
  jpg_name = "# "+fl.replace('.txt','.jpg').strip('./') + "\n"
  #id_num = jpg_name[2:10]
  #print(id_num)
  f = open(fl, mode='r', encoding='utf-8')
  lines = f.readlines()
  for line in lines:
    line=line.replace(' ',' ')
    line=line.replace('   ',' ')
    line=line.replace('    ',' ').strip('\n')
    line=line.replace('	',' ')
    line_tmp = line
    m = line_tmp.split()
    if len(m) == 4:
      s = line +' '+ s + "\n"
      result += jpg_name + s
      break
    s = s + line + ' '
  f.close()

print(result)

with open("./label", "w") as f:
  f.write(result)
f.close()
