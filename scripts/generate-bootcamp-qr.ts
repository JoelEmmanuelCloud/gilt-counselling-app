import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.join(process.cwd(), 'qr-codes');
const LOGO_PATH = path.join(process.cwd(), 'public', 'Gilt Counselling Consult Profile.svg');
const LOGO_ASPECT_RATIO = 11692.91 / 8267.72;

const BRAND_GOLD = '#D9A85D';
const WHATSAPP_GREEN = '#25D366';

const WHATSAPP_NUMBER = '2347065734165';
const WHATSAPP_MESSAGE = 'Hello, I would like to register for the Gilt Counselling Consult Holiday BootCamp. Please share the registration details.';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const EVENT_TITLE = 'Holiday BootCamp';
const EVENT_THEME_LINE_1 = '"When My Child is Mentored';
const EVENT_THEME_LINE_2 = 'by The Professionals"';

const WHATSAPP_ICON_PATH = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z';

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

  <path d="${WHATSAPP_ICON_PATH}" fill="${WHATSAPP_GREEN}" transform="translate(${ICON_X}, ${ICON_Y}) scale(${ICON_SIZE / 24})"/>

  <text x="${W / 2}" y="${TITLE_Y}" text-anchor="middle" font-family="Georgia, serif" font-size="26" font-weight="bold" fill="#1a1a1a">${EVENT_TITLE}</text>
  <text x="${W / 2}" y="${THEME_Y_1}" text-anchor="middle" font-family="Arial, sans-serif" font-style="italic" font-size="14" fill="#666666">${EVENT_THEME_LINE_1}</text>
  <text x="${W / 2}" y="${THEME_Y_2}" text-anchor="middle" font-family="Arial, sans-serif" font-style="italic" font-size="14" fill="#666666">${EVENT_THEME_LINE_2}</text>

  <rect x="${QR_X - 10}" y="${QR_Y - 10}" width="${QR_SIZE + 20}" height="${QR_SIZE + 20}" rx="10" fill="#f7f7f7"/>
  <svg x="${QR_X}" y="${QR_Y}" width="${QR_SIZE}" height="${QR_SIZE}" viewBox="${qrViewBox}">
    ${qrPaths}
  </svg>

  <text x="${W / 2}" y="${SCAN_Y}" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#999999">Scan to chat with us on WhatsApp about registration</text>

  <rect y="${FOOTER_Y}" width="${W}" height="${FOOTER_H}" fill="${WHATSAPP_GREEN}" clip-path="url(#card-clip)"/>
  <text x="${W / 2}" y="${FOOTER_Y + 30}" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="rgba(255,255,255,0.85)" letter-spacing="1.5">REGISTER · INQUIRE · CONNECT</text>
  <text x="${W / 2}" y="${FOOTER_Y + 56}" text-anchor="middle" font-family="Georgia, serif" font-size="17" font-weight="bold" fill="#ffffff">giltcounselling.com</text>

  <rect width="${W}" height="${H}" rx="${CORNER_R}" ry="${CORNER_R}" fill="none" stroke="${BRAND_GOLD}" stroke-width="2.5"/>
</svg>`;
}

async function generate() {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  const qrSvgString = await QRCode.toString(WHATSAPP_URL, {
    type: 'svg',
    errorCorrectionLevel: 'H',
    margin: 1,
    color: { dark: '#000000', light: '#ffffff' },
  });

  const { viewBox, paths } = extractQrContent(qrSvgString);
  const logoBase64 = fs.readFileSync(LOGO_PATH).toString('base64');
  const logoDataUri = `data:image/svg+xml;base64,${logoBase64}`;
  const card = buildCard(viewBox, paths, logoDataUri);

  const outPath = path.join(OUT_DIR, 'qr-bootcamp-whatsapp.svg');
  fs.writeFileSync(outPath, card, 'utf-8');
  console.log(`Saved: ${outPath}`);
  console.log(`Links to: ${WHATSAPP_URL}`);
}

generate().catch((err) => {
  console.error('Error generating bootcamp QR code:', err);
  process.exit(1);
});
