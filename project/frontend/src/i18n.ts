import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en.json';
import es from '../locales/es.json';
import fr from '../locales/fr.json';
import ko from '../locales/ko.json';

const resources = {
  en: { translation: en },
  ko: { translation: ko },
  es: { translation: es },
  fr: { translation: fr },
};
i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  supportedLngs: Object.keys(resources),
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
