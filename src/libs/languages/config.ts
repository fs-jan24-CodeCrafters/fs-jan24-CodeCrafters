import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';
import ua from './ua';

export const resources = {
  en,
  ua,
} as const;

i18n.use(initReactI18next).init({
  ns: ['common'],
  fallbackLng: 'ua',
  interpolation: {
    escapeValue: false,
  },
  resources,
  supportedLngs: ['en', 'ua'],
});
