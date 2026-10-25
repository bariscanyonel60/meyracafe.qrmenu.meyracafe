"""Kaynak listesindeki görselleri tekrar indirir. Python 3 + Pillow gerekir.
Kurulum: python -m pip install Pillow
Çalıştırma: python download_images.py
İndirme, görsel kullanım hakkı kazandırmaz; CSV'deki kaynak notlarını inceleyin.
"""
import json,io,urllib.request,concurrent.futures
from pathlib import Path
from PIL import Image,ImageOps
ROOT=Path(__file__).resolve().parent
assets=json.loads((ROOT/'image-sources.json').read_text(encoding='utf-8'))
def run(a):
 dest=ROOT/a['localPath']
 if dest.exists():
  try:
   with Image.open(dest) as im: im.verify()
   return a['productName'],'mevcut'
  except Exception:pass
 try:
  req=urllib.request.Request(a['downloadUrl'],headers={'User-Agent':'Mozilla/5.0'})
  with urllib.request.urlopen(req,timeout=30) as r: content=r.read(20_000_000)
  im=Image.open(io.BytesIO(content));im.load();im=ImageOps.exif_transpose(im).convert('RGB');im.thumbnail((1200,1200))
  dest.parent.mkdir(parents=True,exist_ok=True);im.save(dest,'WEBP',quality=85)
  return a['productName'],'indirildi'
 except Exception as e:return a['productName'],'HATA: '+str(e)
if __name__=='__main__':
 with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
  for name,status in pool.map(run,assets):print(name,status)
