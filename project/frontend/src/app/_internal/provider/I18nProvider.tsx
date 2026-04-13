'use client';

import '@/i18n'; // side-effect init
import i18n from '@/i18n';
import { PropsWithChildren, useEffect } from 'react';

const LANG_KEY = 'lang';

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
