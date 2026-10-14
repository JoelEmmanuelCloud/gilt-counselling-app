export const CONSENT_COOKIE = 'gilt_cookie_consent';
export const CONSENT_MAX_AGE_DAYS = 180;
export const OPEN_COOKIE_SETTINGS_EVENT = 'gilt:open-cookie-settings';
export const CONSENT_CHANGED_EVENT = 'gilt:cookie-consent-changed';

export type OptionalCookieCategory = 'analytics' | 'marketing';

export interface CookieConsent {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
}

export function readCookieConsent(): CookieConsent | null {
  if (typeof document === 'undefined') return null;
  const raw = document.cookie
    .split('; ')
    .find((part) => part.startsWith(`${CONSENT_COOKIE}=`))
    ?.slice(CONSENT_COOKIE.length + 1);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(raw));
    if (typeof parsed?.analytics !== 'boolean' || typeof parsed?.marketing !== 'boolean') return null;
    return {
      necessary: true,
      analytics: parsed.analytics,
      marketing: parsed.marketing,
      updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : '',
    };
  } catch {
    return null;
  }
}

export function saveCookieConsent(choice: Record<OptionalCookieCategory, boolean>): CookieConsent {
  const consent: CookieConsent = {
    necessary: true,
    analytics: choice.analytics,
    marketing: choice.marketing,
    updatedAt: new Date().toISOString(),
  };
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(consent))}; Max-Age=${
    CONSENT_MAX_AGE_DAYS * 24 * 60 * 60
  }; Path=/; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: consent }));
  return consent;
}

export function hasCookieConsent(category: OptionalCookieCategory): boolean {
  return readCookieConsent()?.[category] === true;
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT));
}
