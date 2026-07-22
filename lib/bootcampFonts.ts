import { Playfair_Display, Alex_Brush } from 'next/font/google';

export const bootcampTitleFont = Playfair_Display({
  subsets: ['latin'],
  style: ['italic'],
  weight: ['700'],
  display: 'swap',
});

export const bootcampScriptFont = Alex_Brush({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});
