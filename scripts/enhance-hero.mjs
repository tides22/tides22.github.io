// 电脑首屏背景原图只有 1125px 宽，大屏上会被拉糊。
// 推荐做法：先用 Real-ESRGAN（开源 AI 超分辨率）把原图放大 4 倍，再运行本脚本：
//   node scripts/enhance-hero.mjs <放大后的图片路径>
// 不传参数时，退回到普通放大：Lanczos 放大 + 轻微锐化。
// 输出 src/assets/hero/desktop-hd.jpg（2880px 宽，正好是 1440 宽 Retina 屏需要的尺寸），不带 EXIF。
import sharp from 'sharp';

const ORIGINAL = 'materials/07-关于我/photos/电脑大背景.jpg';
const OUT = 'src/assets/hero/desktop-hd.jpg';
const WIDTH = 2880;
const upscaled = process.argv[2];

const image = upscaled
  ? sharp(upscaled).resize({ width: WIDTH, kernel: 'lanczos3' })
  : sharp(ORIGINAL).rotate().median(1).resize({ width: WIDTH, kernel: 'lanczos3' }).sharpen({ sigma: 1.1, m1: 0.6, m2: 1.8 });
await image.jpeg({ quality: 90, mozjpeg: true }).toFile(OUT);
console.log(`[hero] ${upscaled ?? ORIGINAL} → ${OUT} (${WIDTH}px)`);
