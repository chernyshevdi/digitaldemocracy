import React from 'react';
import { useTranslation } from 'react-i18next';
import SettingsIcon from '@material-ui/icons/Settings';
import styles from './styles.module.scss';

export const DonationPage = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.donation}>
      <div className={styles.container}>
        <SettingsIcon fontSize="large" style={{ color: '#747373' }} />
        <span>{t('info.serviceDevelop')}</span>
      </div>
    </div>
  );
};
