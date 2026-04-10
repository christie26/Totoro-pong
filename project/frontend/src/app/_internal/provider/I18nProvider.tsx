'use client';

import '@/i18n'; // IMPORTANT: side-effect import
import { PropsWithChildren, useEffect } from 'react';

export function I18nProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    // optional: language detection or sync
  }, []);

  return children;
}
