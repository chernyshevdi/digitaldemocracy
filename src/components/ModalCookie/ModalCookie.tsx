import React from 'react';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { setItem } from '../../lib/localStorageManager';
import styles from './ModalCookie.module.scss';

const ModalCookie = ({ onClick }) => {
  const { t } = useTranslation();
  const confirmCookie = () => {
    onClick(false);
    setItem('user_cookie_confirm', true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.message}>
        <h4 className={styles.message__title}>{ t('cookies.titleCookies') || 'Наш сайт использует cookies' }</h4>
        <p className={styles.message__discription}>
          { t('cookies.descriptionCookies') || `Этот сайт использует файлы cookie для аналитики и персонализации.
          Продолжая просматривать его, вы соглашаетесь на использование нами файлов cookie.`}
        </p>
        <Button
          color="primary"
          className={styles.buttonStyle}
          onClick={confirmCookie}
        >
          { t('buttons.acceptAndClose') || 'Принять и закрыть' }
        </Button>
      </div>
    </div>
  );
};

export default ModalCookie;
