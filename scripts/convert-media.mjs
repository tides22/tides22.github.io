// 把 materials 里浏览器不能直接显示的素材，转换后复制进网站（并清除 EXIF / 定位）
//   HEIC → JPG（用 Mac 自带的 sips 转，再用 sharp 去掉元数据；构建时 Astro 会再转 WebP）
//   mov  → mp4（H.264，720p，适合网页播放；去掉所有元数据）
// 用法：node scripts/convert-media.mjs <源文件> <目标文件>
//   例：node scripts/convert-media.mjs "materials/02-山姆拼单/images/分装过程.HEIC" src/assets/sams/packing.jpg
//       node scripts/convert-media.mjs "materials/01-此地/images/演示视频.mov" public/files/cidi-demo.mp4
// 中文文件名改成英文后，记得在 sync/网站同步.md 的「素材文件名对照表」里加一行
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, statSync } from 'node:fs';
import { dirname, extname } from 'node:path';
import { tmpdir } from 'node:os';
import sharp from 'sharp';

const [src, out] = process.argv.slice(2);
if (!src || !out) {
  console.error('用法：node scripts/convert-media.mjs <源文件> <目标文件>');
  process.exit(1);
}
mkdirSync(dirname(out), { recursive: true });
const ext = extname(src).toLowerCase();

if (ext === '.heic' || ext === '.heif') {
  const tmp = `${tmpdir()}/convert-${Date.now()}.jpg`;
  execFileSync('sips', ['-s', 'format', 'jpeg', src, '--out', tmp], { stdio: 'ignore' });
  // rotate() 按拍摄方向摆正；输出时不带任何元数据；最长边限制 2400px
  await sharp(tmp).rotate().resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 88, mozjpeg: true }).toFile(out);
  rmSync(tmp);
} else if (ext === '.mov' || ext === '.mp4' || ext === '.m4v') {
  execFileSync(
    'ffmpeg',
    ['-y', '-i', src, '-map_metadata', '-1', '-vf', "scale='min(1280,iw)':-2", '-c:v', 'libx264', '-preset', 'slow', '-crf', '26', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', out],
    { stdio: 'ignore' },
  );
} else {
  console.error(`不支持的格式：${ext}`);
  process.exit(1);
}
console.log(`[media] ${src} → ${out}（${(statSync(out).size / 1024 / 1024).toFixed(1)} MB，已清除元数据）`);
