import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const QR_DIR = path.join(process.cwd(), 'qr-codes');
const SCALE = 3;

async function generate() {
  const files = fs.readdirSync(QR_DIR).filter((f) => f.endsWith('.svg'));

  for (const file of files) {
    const svgPath = path.join(QR_DIR, file);
    const svgBuffer = fs.readFileSync(svgPath);
    const pngPath = path.join(QR_DIR, file.replace(/\.svg$/, '.png'));

    const metadata = await sharp(svgBuffer).metadata();
    const width = Math.round((metadata.width ?? 500) * SCALE);

    await sharp(svgBuffer, { density: 96 * SCALE })
      .resize({ width })
      .png()
      .toFile(pngPath);

    console.log(`${file} -> ${path.basename(pngPath)}`);
  }

  console.log(`\nExported ${files.length} PNG files to: ${QR_DIR}`);
}

generate().catch((err) => {
  console.error('Error exporting QR PNGs:', err);
  process.exit(1);
});
