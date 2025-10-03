'use client'

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../lib/locales/en.json';
import zh from '../lib/locales/zh.json';
import pt from '../lib/locales/pt.json';
import es from '../lib/locales/es.json';
import fr from '../lib/locales/fr.json';
import ja from '../lib/locales/ja.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      zh: { translation: zh },
      pt: { translation: pt },
      es: { translation: es },
      fr: { translation: fr },
      ja: { translation: ja },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
