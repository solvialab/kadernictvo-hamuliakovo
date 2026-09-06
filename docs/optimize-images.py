from PIL import Image
from pathlib import Path
out=Path('public/images')
gen=Path('C:/Users/skulik/.codex/generated_images/01a0776b-455d-7f72-b71d-49dc9d69a0ea')
files={'hero':gen/'exec-ec8108a0-ca30-446d-9960-789502208324.png','detail':gen/'exec-64280671-2d0d-4f09-8346-8b45e267fabe.png','interior':gen/'exec-84757c25-f317-4864-aab3-002364d2b360.png'}
for name in ['bob','red','natural-blonde','balayage','bun','long']:
 files[name]=Path('C:/Users/skulik/.codex/gallery-assets-hamuliakovo')/(name+'.jpg')
for name,path in files.items():
 im=Image.open(path).convert('RGB'); im.thumbnail((1600,1600)); im.save(out/(name+'.webp'),quality=84,method=6)
 small=im.copy(); small.thumbnail((640,800)); small.save(out/(name+'-small.webp'),quality=80,method=6)
 print(name,im.size,(out/(name+'.webp')).stat().st_size)
