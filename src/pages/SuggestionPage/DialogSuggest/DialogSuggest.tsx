import React from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Dialog, IconButton, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import styles from './DialogSuggest.module.scss';
import Logo from '../../../components/Logo';

interface IProps {
  open?: boolean;
  handleClose?: any;
}

export const DialogSuggest: FC<IProps> = ({ open, handleClose }) => {
  const { t } = useTranslation();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      disableScrollLock={true}
      classes={{
        paper: styles.paper,
      }}
    >
      <div className={styles.crossWrapper}>
        <IconButton onClick={handleClose} className={styles.cross}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className={styles.textWrapper}>
        <div>{t('info.titleDialogSuggest1')}</div>
        <div>{t('info.titleDialogSuggest2')}</div>
        <div>{t('info.titleDialogSuggest3')}</div>
      </div>
      <div className={styles.logo}>
        <Logo />
      </div>
    </Dialog>
  );
};

export default DialogSuggest;
