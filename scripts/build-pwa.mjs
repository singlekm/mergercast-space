import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {PNG} from 'pngjs';
const root='dist';
const source=PNG.sync.read(await fs.readFile(path.join(root,'brand/ma_full_color_transparent.png')));
await fs.mkdir(path.join(root,'icons'),{recursive:true});
function icon(size,maskable=false){const image=new PNG({width:size,height:size});const fit=size*(maskable?.57:.78);const scale=Math.min(fit/source.width,fit/source.height),w=Math.max(1,Math.round(source.width*scale)),h=Math.max(1,Math.round(source.height*scale)),left=Math.floor((size-w)/2),top=Math.floor((size-h)/2);
for(let y=0;y<size;y++)for(let x=0;x<size;x++){const i=(y*size+x)*4;const glow=Math.max(0,1-Math.hypot(x-size*.5,y-size*.42)/(size*.72));image.data[i]=Math.round(5+7*glow);image.data[i+1]=Math.round(11+13*glow);image.data[i+2]=Math.round(23+26*glow);image.data[i+3]=255;if(x>=left&&x<left+w&&y>=top&&y<top+h){const sx=Math.min(source.width-1,Math.floor((x-left)/scale)),sy=Math.min(source.height-1,Math.floor((y-top)/scale)),j=(sy*source.width+sx)*4,a=source.data[j+3]/255;for(let c=0;c<3;c++)image.data[i+c]=Math.round(source.data[j+c]*a+image.data[i+c]*(1-a));}}
return PNG.sync.write(image)}
for(const [name,size,maskable] of [['icon-192.png',192,false],['icon-512.png',512,false],['maskable-512.png',512,true],['apple-touch-icon.png',180,false]])await fs.writeFile(path.join(root,'icons',name),icon(size,maskable));
async function walk(dir){const result=[];for(const entry of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);if(entry.isDirectory())result.push(...await walk(p));else if(entry.name!=='sw.js'&&!entry.name.endsWith('.map'))result.push(p)}return result}
const all=(await walk(root)).sort(),hash=createHash('sha256');for(const p of all){hash.update(p);hash.update(await fs.readFile(p))}const urls=all.map(p=>'/'+path.relative(root,p).split(path.sep).map(encodeURIComponent).join('/'));const version=hash.digest('hex').slice(0,16);
const worker=`const CACHE='mergercast-shell-${version}';
const ASSETS=${JSON.stringify(urls)};
const ALLOWED=new Set(ASSETS);
self.addEventListener('install',event=>event.waitUntil((async()=>{const cache=await caches.open(CACHE);await cache.addAll(ASSETS.map(url=>new Request(url,{cache:'reload'})));})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(key=>key.startsWith('mergercast-shell-')&&key!==CACHE).map(key=>caches.delete(key)));await self.clients.claim();})()));
self.addEventListener('fetch',event=>{const req=event.request,url=new URL(req.url);if(req.method!=='GET'||url.origin!==self.location.origin)return;if(req.mode==='navigate'){event.respondWith((async()=>{try{const response=await fetch(req);if(response.ok)return response;const cached=await caches.match('/index.html',{cacheName:CACHE});return cached||response}catch{const cached=await caches.match('/index.html',{cacheName:CACHE});return cached||new Response('Mergercast Aerospace is offline. Connect to the internet to finish setup.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}})}})());return}if(ALLOWED.has(url.pathname)){event.respondWith((async()=>{const cache=await caches.open(CACHE);const cached=await cache.match(url.pathname);return cached||fetch(req)})());}});
`;
await fs.writeFile(path.join(root,'sw.js'),worker);
console.log('MA PWA: '+urls.length+' precached assets, '+version);
