// 把「得意黑」裁剪成只包含网站用到的字，避免手机上加载 1MB+ 的完整字体。
// 每次 npm run dev / npm run build 前自动运行，改了文字也不用手动处理。
import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises';
import { join, extname } from 'node:path';
import subsetFont from 'subset-font';

const SOURCE = 'fonts-src/SmileySans-Oblique.ttf';
const OUTPUT = 'public/fonts/smiley-sans.woff2';
const SCAN_DIRS = ['src'];
const SCAN_EXTS = new Set(['.md', '.astro', '.ts']);

async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) return collectFiles(path);
      return SCAN_EXTS.has(extname(entry.name)) ? [path] : [];
    }),
  );
  return files.flat();
}

const files = (await Promise.all(SCAN_DIRS.map(collectFiles))).flat();
const texts = await Promise.all(files.map((file) => readFile(file, 'utf8')));

// 常用英文、数字和标点始终保留
let ascii = '';
for (let code = 0x20; code <= 0x7e; code++) ascii += String.fromCharCode(code);
const chars = new Set([...ascii, ...'，。、：；！？“”‘’（）《》「」·—…→×', ...texts.join('')]);

const font = await readFile(SOURCE);
const subset = await subsetFont(font, [...chars].join(''), { targetFormat: 'woff2' });
await mkdir('public/fonts', { recursive: true });
await writeFile(OUTPUT, subset);

console.log(`[fonts] 得意黑：${chars.size} 个字符，${(subset.length / 1024).toFixed(0)} KB`);
