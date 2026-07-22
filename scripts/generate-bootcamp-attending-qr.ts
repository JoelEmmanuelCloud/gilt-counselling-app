import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.join(process.cwd(), 'qr-codes');
const LOGO_PATH = path.join(process.cwd(), 'public', 'Gilt Counselling Consult Profile.svg');
const LOGO_ASPECT_RATIO = 11692.91 / 8267.72;

const BRAND_GOLD = '#D9A85D';
const BRAND_TEAL = '#1BA5BB';

const PAGE_URL = 'https://giltcounselling.com/bootcamp/attending';

const EVENT_TITLE = 'I\'m Attending!';
const EVENT_THEME_LINE_1 = 'Create your badge, then share';
const EVENT_THEME_LINE_2 = 'that you\'re attending';

const PHOTO_ICON_PATH = 'M4 3.5A1.5 1.5 0 015.5 2h9A1.5 1.5 0 0116 3.5v9a1.5 1.5 0 01-.324.936l-3.28-3.28a1.5 1.5 0 00-2.12 0l-1.72 1.72-1.22-1.22a1.5 1.5 0 00-2.12 0L4 11.844V3.5zM4 13.5v.086a1.5 1.5 0 001.5 1.414h9a1.5 1.5 0 001.401-.973l-3.334-3.334-1.72 1.72a1.5 1.5 0 01-2.12 0l-1.22-1.22L4 13.5zM6.5 6a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z';

function extractQrContent(svgString: string): { viewBox: string; paths: string } {
  const viewBoxMatch = svgString.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 37 37';
  const paths = svgString.replace(/<svg[^>]*>/, '').replace('</svg>', '').trim();
  return { viewBox, paths };
}

function buildCard(qrViewBox: string, qrPaths: string, logoDataUri: string): string {
  const W = 500;
  const H = 760;
  const CORNER_R = 24;

  const FOOTER_H = 80;
  const FOOTER_Y = H - FOOTER_H;

  const LOGO_H = 150;
  const LOGO_W = LOGO_H * LOGO_ASPECT_RATIO;
  const LOGO_Y = 28;
  const LOGO_X = (W - LOGO_W) / 2;

  const DIVIDER_Y = LOGO_Y + LOGO_H + 17;

  const ICON_SIZE = 40;
  const ICON_Y = DIVIDER_Y + 20;
  const ICON_X = (W - ICON_SIZE) / 2;

  const TITLE_Y = ICON_Y + ICON_SIZE + 30;
  const THEME_Y_1 = TITLE_Y + 26;
  const THEME_Y_2 = THEME_Y_1 + 20;

  const QR_SIZE = 260;
  const QR_Y = THEME_Y_2 + 30;
  const QR_X = (W - QR_SIZE) / 2;

  const SCAN_Y = QR_Y + QR_SIZE + 30;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <clipPath id="card-clip">
      <rect width="${W}" height="${H}" rx="${CORNER_R}" ry="${CORNER_R}"/>
    </clipPath>
  </defs>

  <rect width="${W}" height="${H}" rx="${CORNER_R}" ry="${CORNER_R}" fill="#ffffff"/>

  <image x="${LOGO_X}" y="${LOGO_Y}" width="${LOGO_W}" height="${LOGO_H}" href="${logoDataUri}" xlink:href="${logoDataUri}"/>

  <line x1="${W / 2 - 60}" y1="${DIVIDER_Y}" x2="${W / 2 + 60}" y2="${DIVIDER_Y}" stroke="${BRAND_GOLD}" stroke-width="1.5"/>

  <path d="${PHOTO_ICON_PATH}" fill="${BRAND_TEAL}" transform="translate(${ICON_X}, ${ICON_Y}) scale(${ICON_SIZE / 20})"/>

  <text x="${W / 2}" y="${TITLE_Y}" text-anchor="middle" font-family="Georgia, serif" font-size="26" font-weight="bold" fill="#1a1a1a">${EVENT_TITLE}</text>
  <text x="${W / 2}" y="${THEME_Y_1}" text-anchor="middle" font-family="Arial, sans-serif" font-style="italic" font-size="14" fill="#666666">${EVENT_THEME_LINE_1}</text>
  <text x="${W / 2}" y="${THEME_Y_2}" text-anchor="middle" font-family="Arial, sans-serif" font-style="italic" font-size="14" fill="#666666">${EVENT_THEME_LINE_2}</text>

  <rect x="${QR_X - 10}" y="${QR_Y - 10}" width="${QR_SIZE + 20}" height="${QR_SIZE + 20}" rx="10" fill="#f7f7f7"/>
  <svg x="${QR_X}" y="${QR_Y}" width="${QR_SIZE}" height="${QR_SIZE}" viewBox="${qrViewBox}">
    ${qrPaths}
  </svg>

  <text x="${W / 2}" y="${SCAN_Y}" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#999999">Scan to build your "I'm Attending" badge</text>

  <rect y="${FOOTER_Y}" width="${W}" height="${FOOTER_H}" fill="${BRAND_TEAL}" clip-path="url(#card-clip)"/>
  <text x="${W / 2}" y="${FOOTER_Y + 30}" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="rgba(255,255,255,0.85)" letter-spacing="1.5">CREATE · SHARE · INVITE</text>
  <text x="${W / 2}" y="${FOOTER_Y + 56}" text-anchor="middle" font-family="Georgia, serif" font-size="17" font-weight="bold" fill="#ffffff">giltcounselling.com</text>

  <rect width="${W}" height="${H}" rx="${CORNER_R}" ry="${CORNER_R}" fill="none" stroke="${BRAND_GOLD}" stroke-width="2.5"/>
</svg>`;
}

async function generate() {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  const qrSvgString = await QRCode.toString(PAGE_URL, {
    type: 'svg',
    errorCorrectionLevel: 'H',
    margin: 1,
    color: { dark: '#000000', light: '#ffffff' },
  });

  const { viewBox, paths } = extractQrContent(qrSvgString);
  const logoBase64 = fs.readFileSync(LOGO_PATH).toString('base64');
  const logoDataUri = `data:image/svg+xml;base64,${logoBase64}`;
  const card = buildCard(viewBox, paths, logoDataUri);

  const outPath = path.join(OUT_DIR, 'qr-bootcamp-attending.svg');
  fs.writeFileSync(outPath, card, 'utf-8');
  console.log(`Saved: ${outPath}`);
  console.log(`Links to: ${PAGE_URL}`);
}

generate().catch((err) => {
  console.error('Error generating bootcamp attending QR code:', err);
  process.exit(1);
});
