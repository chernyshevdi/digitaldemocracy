import { deDE, enUS, esES, frFR, itIT, ruRU, ukUA } from '@material-ui/data-grid';
import { createTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

export const useLocalesThemeMaterial = () => {
  const { i18n } = useTranslation();

  const locale = (currentLang: string) => {
    const localeList = [
      {
        type: 'ru',
        lang: ruRU
      },
      {
        type: 'en',
        lang: enUS
      },
      {
        type: 'fr',
        lang: frFR
      },
      {
        type: 'it',
        lang: itIT
      },
      {
        type: 'de',
        lang: deDE
      },
      {
        type: 'es',
        lang: esES
      },
      {
        type: 'uk',
        lang: ukUA
      }
    ];
    return localeList.find((item) => item.type === currentLang);
  };

  return createTheme(
    {
      palette: {
        primary: { main: '#1976d2' },
      },
    },
    locale(i18n.language).lang || enUS
  );
};
