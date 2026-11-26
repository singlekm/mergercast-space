import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
const parts=await Promise.all(Array.from({length:10},(_,i)=>fs.readFile('media-source/intro-'+String(i).padStart(2,'0')+'.part')));
const video=Buffer.concat(parts);const expected='5242212eedc526e9d464707680da80b79844e8b0f6368a7622f139a5e6bc059e';if(video.length!==846118||createHash('sha256').update(video).digest('hex')!==expected)throw Error('Intro video integrity check failed');await fs.mkdir('public/media',{recursive:true});await fs.writeFile('public/media/ma-intro.mp4',video);console.log('Verified intro video: '+video.length+' bytes');
