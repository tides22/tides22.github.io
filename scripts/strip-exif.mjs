// 清除 src/assets 里所有照片的 EXIF（拍摄时间、GPS 定位等）。
// 构建时 Astro 会把原图也复制一份到网站里，所以要在源头清掉。
// 只处理还带 EXIF 的图片，已经清过的不会重复压缩。
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import sharp from 'sharp';

const ROOT = 'src/assets';
const EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

async function collect(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) return collect(path);
      return EXTS.has(extname(entry.name).toLowerCase()) ? [path] : [];
    }),
  );
  return files.flat();
}

let cleaned = 0;
for (const file of await collect(ROOT)) {
  const input = await readFile(file);
  const meta = await sharp(input).metadata();
  if (!meta.exif && !meta.xmp && !meta.iptc) continue;

  // rotate() 按 EXIF 方向把照片摆正，之后输出时不带任何元数据
  const image = sharp(input).rotate();
  const ext = extname(file).toLowerCase();
  const output =
    ext === '.png'
      ? await image.png().toBuffer()
      : ext === '.webp'
        ? await image.webp({ quality: 90 }).toBuffer()
        : await image.jpeg({ quality: 90, mozjpeg: true }).toBuffer();
  await writeFile(file, output);
  cleaned++;
  console.log(`[exif] 已清除：${file}`);
}

console.log(`[exif] 检查完毕，本次清除 ${cleaned} 张`);
