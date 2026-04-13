'use client';

import '@/i18n'; // side-effect init
import i18n from '@/i18n';
import { PropsWithChildren, useEffect } from 'react';

const LANG_KEY = 'lang';
export type Lang = 'en' | 'ko' | 'es' | 'fr';

export const languageMap: Record<Lang, { text: string; icon: string }> = {
  en: { text: 'English', icon: '🇬🇧' },
  ko: { text: '한국어', icon: '🇰🇷' },
  es: { text: 'Español', icon: '🇪🇸' },
  fr: { text: 'Français', icon: '🇫🇷' },
};

export function I18nProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    const savedLang = localStorage.getItem(LANG_KEY);

    if (savedLang) {
      i18n.changeLanguage(savedLang);
    } else {
      const browserLang = navigator.language.split('-')[0];

      const supported = ['en', 'ko', 'es', 'fr'];
      const initialLang = supported.includes(browserLang) ? browserLang : 'en';

      i18n.changeLanguage(initialLang);
      localStorage.setItem(LANG_KEY, initialLang);
    }
  }, []);

  return <>{children}</>;
}
