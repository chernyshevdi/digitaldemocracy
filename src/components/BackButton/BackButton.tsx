import React from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { Button } from '@material-ui/core';
import { userActionCreators } from 'src/slices/userSlice';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import styles from './styles.module.scss';

export const BackButton = () => {
  const { t } = useTranslation();
  const { push } = useHistory() as any;
  const { deleteLastRout } = userActionCreators();
  const { data } = useSelector((s: RootState) => s?.user?.routes);
  const lastRout = data[data.length - 2]?.path || '/';
  return (
    <div className={styles.buttonRow}>
      <Button
        variant="outlined"
        className={styles.backButton}
        onClick={() => {
          push(lastRout);
          deleteLastRout();
        }}
      >
        <div className={styles.icon}>←</div>
        <div className={styles.text}>{t('buttons.back')}</div>
      </Button>
    </div>
  );
};
