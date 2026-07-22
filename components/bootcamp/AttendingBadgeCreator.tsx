'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useToast } from '@/components/ui/Toast';
import Button from '@/components/ui/Button';
import { bootcampTitleFont, bootcampScriptFont } from '@/lib/bootcampFonts';

const CANVAS_W = 1080;
const CANVAS_H = 1350;

const GOLD = '#D9A85D';
const ORANGE = '#F5A623';
const TEAL = '#1BA5BB';
const GREEN = '#5FB74E';
const NAVY = '#12233F';
const DARK_TEXT = '#1A2B3C';
const GREY = '#5B6472';

const LOGO_SRC = '/Gilt Counselling Consult Profile.svg';
const LOGO_ASPECT_RATIO = 11692.91 / 8267.72;
const PLACEHOLDER_SRC = '/default-avatar.svg';

const EVENT_TITLE_SERIF = 'Psycho-Social Skills';
const EVENT_TITLE_SCRIPT = 'Bootcamp';
const EVENT_TITLE = `${EVENT_TITLE_SERIF} ${EVENT_TITLE_SCRIPT}`;
const EVENT_SUBTITLE = 'Gilt Consult Champions 2026 Holiday';
const EVENT_THEME = 'When My Child Is Mentored By Professionals';
const EVENT_AGES = 'Ages 9-14 & 15-18';
const EVENT_DATE = '10th - 28th Aug 2026 · 9am';

const WHATSAPP_NUMBER = '2347065734165';
const WHATSAPP_MESSAGE = 'Hello, I would like to register for the Gilt Counselling Consult Holiday BootCamp. Please share the registration details.';
export const WHATSAPP_REGISTER_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export const PAGE_URL = 'https://giltcounselling.com/bootcamp/attending';

const DEFAULT_CAPTION = `I'm attending the ${EVENT_SUBTITLE} ${EVENT_TITLE}! 🎉\n"${EVENT_THEME}"\n${EVENT_AGES} · ${EVENT_DATE}\n\nJoin me — register here: ${PAGE_URL}`;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function roundedRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (current && ctx.measureText(test).width > maxWidth) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function drawCenteredLines(ctx: CanvasRenderingContext2D, lines: string[], cx: number, startY: number, lineHeight: number): number {
  lines.forEach((line, i) => ctx.fillText(line, cx, startY + i * lineHeight));
  return startY + lines.length * lineHeight;
}

function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, cx: number, cy: number, r: number) {
  const size = r * 2;
  const scale = Math.max(size / img.width, size / img.height);
  const w = img.width * scale;
  const h = img.height * scale;
  ctx.drawImage(img, cx - w / 2, cy - h / 2, w, h);
}

function drawPill(ctx: CanvasRenderingContext2D, text: string, cx: number, cy: number, font: string, fill: string, textColor: string, paddingX: number, height: number) {
  ctx.font = font;
  const textWidth = ctx.measureText(text).width;
  const w = textWidth + paddingX * 2;
  roundedRectPath(ctx, cx - w / 2, cy - height / 2, w, height, height / 2);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, cx, cy + 2);
}

export default function AttendingBadgeCreator() {
  const toast = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoImgRef = useRef<HTMLImageElement | null>(null);

  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState(DEFAULT_CAPTION);
  const [isDrawing, setIsDrawing] = useState(true);
  const [canShareFiles, setCanShareFiles] = useState(false);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'canShare' in navigator) {
      try {
        setCanShareFiles(navigator.canShare({ files: [new File([], 'test.png', { type: 'image/png' })] }));
      } catch {
        setCanShareFiles(false);
      }
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function draw() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      setIsDrawing(true);

      const titleFontFamily = bootcampTitleFont.style.fontFamily;
      const scriptFontFamily = bootcampScriptFont.style.fontFamily;

      const [logoImg, subjectImg] = await Promise.all([
        loadImage(LOGO_SRC),
        photoDataUrl ? loadImage(photoDataUrl) : loadImage(PLACEHOLDER_SRC),
        document.fonts.load(`italic 700 56px ${titleFontFamily}`),
        document.fonts.load(`400 100px ${scriptFontFamily}`),
        document.fonts.ready,
      ]);

      if (cancelled) return;

      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
      roundedRectPath(ctx, 0, 0, CANVAS_W, CANVAS_H, 48);
      ctx.save();
      ctx.clip();

      const bgGradient = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
      bgGradient.addColorStop(0, '#FFF4E6');
      bgGradient.addColorStop(1, '#E8F4F6');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      const logoH = 130;
      const logoW = logoH * LOGO_ASPECT_RATIO;
      ctx.drawImage(logoImg, (CANVAS_W - logoW) / 2, 50, logoW, logoH);

      ctx.textAlign = 'center';
      ctx.fillStyle = GREY;
      ctx.font = '700 24px Arial, sans-serif';
      ctx.fillText(EVENT_SUBTITLE, CANVAS_W / 2, 218);

      drawPill(ctx, 'I\'M ATTENDING', CANVAS_W / 2, 272, '700 32px Arial', TEAL, '#FFFFFF', 38, 58);

      const photoCx = CANVAS_W / 2;
      const photoCy = 532;
      const photoR = 175;

      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,0.25)';
      ctx.shadowBlur = 30;
      ctx.shadowOffsetY = 10;
      ctx.beginPath();
      ctx.arc(photoCx, photoCy, photoR + 14, 0, Math.PI * 2);
      ctx.fillStyle = GOLD;
      ctx.fill();
      ctx.restore();

      ctx.beginPath();
      ctx.arc(photoCx, photoCy, photoR + 6, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      ctx.save();
      ctx.beginPath();
      ctx.arc(photoCx, photoCy, photoR, 0, Math.PI * 2);
      ctx.clip();
      drawCover(ctx, subjectImg, photoCx, photoCy, photoR);
      ctx.restore();

      ctx.textAlign = 'center';
      ctx.fillStyle = NAVY;
      ctx.font = `italic 700 54px ${titleFontFamily}`;
      const titleLines = wrapLines(ctx, EVENT_TITLE_SERIF, 820);
      let cursorY = drawCenteredLines(ctx, titleLines, CANVAS_W / 2, 787, 58);

      ctx.fillStyle = ORANGE;
      ctx.font = `400 110px ${scriptFontFamily}`;
      ctx.fillText(EVENT_TITLE_SCRIPT, CANVAS_W / 2, cursorY + 78);
      cursorY += 78;

      ctx.fillStyle = NAVY;
      ctx.font = '700 26px Arial, sans-serif';
      const themeLines = wrapLines(ctx, EVENT_THEME.toUpperCase(), 780);
      cursorY = drawCenteredLines(ctx, themeLines, CANVAS_W / 2, cursorY + 46, 34);

      ctx.fillStyle = DARK_TEXT;
      ctx.font = '700 27px Arial, sans-serif';
      ctx.fillText(EVENT_AGES.toUpperCase(), CANVAS_W / 2, cursorY + 40);

      ctx.fillStyle = GREEN;
      ctx.font = `400 52px ${scriptFontFamily}`;
      ctx.fillText(EVENT_DATE, CANVAS_W / 2, cursorY + 100);

      const footerH = 170;
      const footerY = CANVAS_H - footerH;
      ctx.fillStyle = NAVY;
      ctx.fillRect(0, footerY, CANVAS_W, footerH);

      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.font = '700 20px Arial, sans-serif';
      ctx.fillText('REGISTER TODAY', CANVAS_W / 2, footerY + 42);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '700 38px Georgia, serif';
      ctx.fillText('giltcounselling.com', CANVAS_W / 2, footerY + 90);

      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.font = '400 24px Arial, sans-serif';
      ctx.fillText('+234 706 573 4165 · +234 706 446 7658', CANVAS_W / 2, footerY + 132);

      ctx.restore();

      ctx.save();
      roundedRectPath(ctx, 3, 3, CANVAS_W - 6, CANVAS_H - 6, 46);
      ctx.strokeStyle = GOLD;
      ctx.lineWidth = 6;
      ctx.stroke();
      ctx.restore();

      if (!cancelled) setIsDrawing(false);
    }

    draw();
    return () => {
      cancelled = true;
    };
  }, [photoDataUrl]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.warning('Please select a valid image file (JPEG, PNG, or WebP)');
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast.warning('File size must be less than 8MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoDataUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const getBadgeBlob = (): Promise<Blob | null> => {
    return new Promise((resolve) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        resolve(null);
        return;
      }
      canvas.toBlob((blob) => resolve(blob), 'image/png', 0.95);
    });
  };

  const handleDownload = async () => {
    const blob = await getBadgeBlob();
    if (!blob) {
      toast.error('Could not generate the badge image. Please try again.');
      return;
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'gilt-bootcamp-im-attending.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('Badge downloaded! Share it on WhatsApp, Instagram, or Facebook.');
  };

  const handleShare = async () => {
    const blob = await getBadgeBlob();
    if (!blob) {
      toast.error('Could not generate the badge image. Please try again.');
      return;
    }
    const file = new File([blob], 'gilt-bootcamp-im-attending.png', { type: 'image/png' });
    try {
      await navigator.share({
        files: [file],
        title: 'I\'m attending the Gilt Consult Bootcamp',
        text: caption,
      });
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        toast.error('Could not open the share sheet. Try downloading the image instead.');
      }
    }
  };

  const handleCopyCaption = async () => {
    try {
      await navigator.clipboard.writeText(caption);
      toast.success('Caption copied to clipboard');
    } catch {
      toast.error('Could not copy caption. Please select and copy it manually.');
    }
  };

  const shareTextEncoded = encodeURIComponent(caption);
  const hasPhoto = Boolean(photoDataUrl);

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-5 sm:p-8 md:p-10">
      <span aria-hidden className={`${bootcampTitleFont.className} ${bootcampScriptFont.className} hidden`}>.</span>
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-sm mx-auto rounded-[2rem] shadow-xl overflow-hidden bg-white ring-1 ring-gray-100">
            <canvas
              ref={canvasRef}
              width={CANVAS_W}
              height={CANVAS_H}
              className="w-full h-auto block"
              aria-label="I'm attending the Gilt Consult Bootcamp badge preview"
            />
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileSelect}
            className="hidden"
            id="bootcamp-photo-upload"
          />
          <label
            htmlFor="bootcamp-photo-upload"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gilt-gold text-white rounded-lg cursor-pointer hover:bg-gilt-orange transition font-semibold shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {hasPhoto ? 'Choose a Different Photo' : 'Add Your Photo'}
          </label>
          <p className="text-xs text-gray-500 mt-3 text-center max-w-xs leading-relaxed">
            Square photo works best. Max 8MB. JPG, PNG, or WebP. Your photo stays on your device — nothing is uploaded to our servers.
          </p>
        </div>

        <div className="space-y-5">
          <div className="bg-warm-cream/70 rounded-2xl border border-soft-beige/60 p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gilt-gold text-white font-bold text-sm flex items-center justify-center">1</span>
              <h3 className="font-heading text-base sm:text-lg font-bold text-gray-900">Download or share your badge</h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={handleDownload} disabled={!hasPhoto || isDrawing} variant="primary" className="w-full sm:w-auto inline-flex items-center justify-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download Badge
              </Button>
              {canShareFiles && (
                <Button onClick={handleShare} disabled={!hasPhoto || isDrawing} variant="secondary" className="w-full sm:w-auto inline-flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                  </svg>
                  Share Now
                </Button>
              )}
            </div>
            {!hasPhoto && (
              <p className="text-sm text-gray-500 mt-3 flex items-center gap-1.5">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Add your photo above to unlock these.
              </p>
            )}
          </div>

          <div className="bg-warm-cream/70 rounded-2xl border border-soft-beige/60 p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gilt-gold text-white font-bold text-sm flex items-center justify-center">2</span>
              <h3 className="font-heading text-base sm:text-lg font-bold text-gray-900">Copy or edit your caption</h3>
            </div>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={5}
              className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-700 leading-relaxed focus:outline-none focus:ring-2 focus:ring-gilt-gold focus:border-transparent"
            />
            <button
              onClick={handleCopyCaption}
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-teal hover:text-gilt-teal transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy caption
            </button>
          </div>

          <div className="bg-warm-cream/70 rounded-2xl border border-soft-beige/60 p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gilt-gold text-white font-bold text-sm flex items-center justify-center">3</span>
              <h3 className="font-heading text-base sm:text-lg font-bold text-gray-900">Post it</h3>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Attach the downloaded badge to your post, or use these to share the caption and link directly.
            </p>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <a
                href={`https://wa.me/?text=${shareTextEncoded}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on WhatsApp"
                className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-3 rounded-lg font-medium text-white bg-[#25D366] hover:opacity-90 active:scale-[0.98] transition-all shadow-sm text-xs sm:text-sm"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(PAGE_URL)}&quote=${shareTextEncoded}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Facebook"
                className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-3 rounded-lg font-medium text-white bg-[#1877F2] hover:opacity-90 active:scale-[0.98] transition-all shadow-sm text-xs sm:text-sm"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
