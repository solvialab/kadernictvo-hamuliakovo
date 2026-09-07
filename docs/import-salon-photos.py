from PIL import Image, ImageOps
from pathlib import Path
import json
src=Path('fotky'); out=Path('public/images')
items=[
('salon-medene-tony','485615666_627931190109278_1674695344848545112_n.jpg'),
('salon-svetle-pramene','557243681_777721785130217_151341240848382753_n.jpg'),
('salon-medena-premena','561596730_793468436888885_891786229733913275_n.jpg'),
('salon-medene-vlny','585894886_822568763978852_5193041782109998036_n.jpg'),
('salon-svetle-a-tmave','585914205_822570547312007_4029415600876929434_n.jpg'),
('salon-dlhe-tmave','636891873_892578853644509_7478396871891583193_n.jpg'),
('salon-pramene-a-vlny','700955871_964133579822369_5084755343280952907_n.jpg'),
('salon-interier','468293791_546848238217574_646551672757237120_n.jpg')]
manifest=[]
for name,file in items:
 im=ImageOps.exif_transpose(Image.open(src/file)).convert('RGB')
 im.save(out/(name+'.webp'),quality=90,method=6)
 small=im.copy();small.thumbnail((720,900));small.save(out/(name+'-small.webp'),quality=86,method=6)
 manifest.append({'id':name,'source':file,'width':im.width,'height':im.height,'thumbnailWidth':small.width,'thumbnailHeight':small.height,'bytes':(out/(name+'.webp')).stat().st_size})
Path('docs/salon-photo-sources.json').write_text(json.dumps({'source':'Fotografie dodané používateľom, 7. 9. 2026','processing':'Zachovaný celý obraz, iba optimalizácia WebP a správna orientácia.','images':manifest,'omitted':['571756545_803667192535676_3342153080968499971_n.jpg','585545879_822570550645340_4157505068276353445_n.jpg'],'omittedReason':'Súhrnné koláže opakujú zábery z vybraných samostatných koláží.'},ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(manifest,ensure_ascii=False))
