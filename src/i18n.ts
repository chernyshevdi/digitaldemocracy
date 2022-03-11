import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import { apiSetting } from './config';

/*
const resources = {
  en: {
    translation: {
      title: 'Welcome'
    }
  },
  fr: {
    translation: {
      title: 'Bienvenue'
    }
  },
  ru: {
    translation: {
      title: 'Привет'
    }
  },
};
*/

i18n
  .use(LanguageDetector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    // resources,
    // lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false
    },
    debug: true,
    returnObjects: true,
    backend: {
      // loadPath: 'https://dev-backoffice.digitaldemocracy.ru/storage/lang/{{lng}}/{{ns}}.json',
      loadPath: `${apiSetting.url_api}getLangContent/{{lng}}`,
    },
    detection: {
      order: ['localStorage']
    },
  });

export default i18n;
