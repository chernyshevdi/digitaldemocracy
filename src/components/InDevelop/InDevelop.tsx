import React from 'react';
import { useTranslation } from 'react-i18next';
import SettingsIcon from '@material-ui/icons/Settings';
import './styles.scss';
import { Link } from 'react-router-dom';

const InDevelop = () => {
  const { t } = useTranslation();
  return (
    <div className="in-develop">
      <div className="container">
        <SettingsIcon
          fontSize="large"
          style={{ color: '#747373' }}
        />
        <span>{t('info.serviceDevelop')}</span>
        <Link to="/donation">{t('info.pushDonation')}</Link>
      </div>
    </div>
  );
};

export default InDevelop;
