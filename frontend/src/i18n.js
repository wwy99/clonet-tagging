import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zhTranslation from './locales/zh.json';

const translationZH = {
  translation: zhTranslation
};

i18n.use(initReactI18next).init({
  resources: {
    zh: translationZH
  },
  lng: 'zh',
  fallbackLng: 'zh',

  interpolation: {
    escapeValue: false
  }
});

export default i18n;
