const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'public');

// Rules: [glob-pattern-substring, maxWidth, quality]
// Applied in order — first match wins
const RULES = [
  // Full-width hero images — cap at 1920px, quality 78
  { match: /^images\/(header|teens|tagline|DSC_|Gilt Counselling|office|ourservice)/i, maxW: 1920, q: 78 },
  // Events / outreach full-width banners
  { match: /^images\/(events|outreach\/otana)/i, maxW: 1600, q: 75 },
  // Outreach school photos (used at 40-50vw max, already 1080px wide)
  { match: /^images\/outreach\//i, maxW: 1080, q: 72 },
  // Workshop & conference photos
  { match: /^images\/(workshops|ccpa)/i, maxW: 1080, q: 72 },
  // Blog thumbnails (800×500 already fine, just recompress)
  { match: /^images\/blog\//i, maxW: 900, q: 72 },
  // Portrait / staff headshots
  { match: /^images\/(Dr |Dame |PROF)/i, maxW: 600, q: 78 },
  // User-uploaded profile pictures
  { match: /^uploads\/profiles\//i, maxW: 800, q: 78 },
  // Other uploads
  { match: /^uploads\//i, maxW: 1200, q: 75 },
  // Catch-all for anything else in /images
  { match: /^images\//i, maxW: 1920, q: 75 },
];

function findImages(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findImages(full, results);
    } else if (/\.(jpe?g|jpg|png)$/i.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

function ruleFor(relPath) {
  const rel = relPath.replace(/\\/g, '/');
  for (const rule of RULES) {
    if (rule.match.test(rel)) return rule;
  }
  return { maxW: 1920, q: 75 };
}

async function compress(file) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  const rule = ruleFor(rel);
  const before = fs.statSync(file).size;

  const meta = await sharp(file).metadata();
  if (!meta.width) return;

  const isPng = /\.png$/i.test(file);
  let pipeline = sharp(file);

  if (meta.width > rule.maxW) {
    pipeline = pipeline.resize({ width: rule.maxW, withoutEnlargement: true });
  }

  let buf;
  if (isPng) {
    buf = await pipeline.png({ compressionLevel: 9, effort: 10 }).toBuffer();
  } else {
    buf = await pipeline.jpeg({ quality: rule.q, mozjpeg: true, progressive: true }).toBuffer();
  }

  // Only write if we actually saved space (never inflate a file)
  if (buf.length < before) {
    const tmp = file + '.tmp';
    fs.writeFileSync(tmp, buf);
    fs.renameSync(tmp, file);
    const after = buf.length;
    const saved = Math.round((before - after) / 1024);
    const pct = Math.round(((before - after) / before) * 100);
    console.log(`✓ ${rel.padEnd(60)} ${kb(before)} → ${kb(after)}  (-${saved}KB, ${pct}%)`);
  } else {
    console.log(`~ ${rel.padEnd(60)} ${kb(before)}  (skipped — already optimal)`);
  }
}

function kb(bytes) {
  return (bytes / 1024).toFixed(1).padStart(7) + ' KB';
}

async function main() {
  const images = findImages(ROOT);
  console.log(`Found ${images.length} images in public/\n`);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of images) {
    const before = fs.statSync(file).size;
    totalBefore += before;
    await compress(file);
    totalAfter += fs.statSync(file).size;
  }

  const saved = Math.round((totalBefore - totalAfter) / 1024);
  const pct = Math.round(((totalBefore - totalAfter) / totalBefore) * 100);
  console.log(`\nTotal: ${kb(totalBefore)} → ${kb(totalAfter)}  (saved ${saved} KB, ${pct}%)`);
}

main().catch(err => { console.error(err); process.exit(1); });
