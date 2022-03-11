import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Dialog, IconButton, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useFetchChanges } from '../../hooks/useFetchChanges';
import { Loading } from '../../../../components/Loading/Loading';
import styles from './CustomDialog.module.scss';

interface IProps {
  open?: boolean;
  next?: boolean;
  setNext?: any;
  handleClose?: any;
}

export const CustomDialog: FC<IProps> = ({ open, next, setNext, handleClose }) => {
  const { t } = useTranslation();
  const [info, setInfo] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState(false);
  const [isRequiredUrl, setIsRequiredUrl] = useState(false);
  const [isRequiredInfo, setIsRequiredInfo] = useState(false);
  const { fetch, status } = useFetchChanges();

  useEffect(() => {
    if (status === 'Success') {
      setNext(true);
    } else if (status === 'Failure') {
      setError(true);
    } else if (status === 'Initial') {
      setError(false);
    }
  }, [status]);

  const clearForms = () => {
    setUrl('');
    setInfo('');
    setIsRequiredUrl(false);
    setIsRequiredInfo(false);
  };

  useEffect(() => {
    if (info) {
      setIsRequiredInfo(false);
    }
    if (url) {
      setIsRequiredUrl(false);
    }
  }, [isRequiredInfo, isRequiredUrl, info, url]);

  const handeClick = () => {
    if (!info || !url) {
      if (!info) {
        setIsRequiredInfo(true);
      }
      if (!url) {
        setIsRequiredUrl(true);
      }
    }
  };

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
        <IconButton
          onClick={() => {
            handleClose();
            clearForms();
          }}
          className={styles.cross}
        >
          <CloseIcon />
        </IconButton>
      </div>
      {!next ? (
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            fetch(info, url);
          }}
          method="POST"
        >
          <div>
            <h2>{t('info.titleThanksSuggest')}</h2>
            <div className={styles.fieldWrapper}>
              <TextField
                id="info"
                label={t('info.titleSuggestInfo')}
                className={styles.textField}
                fullWidth
                placeholder={t('info.titleSuggestInfo')}
                rows={4}
                required
                multiline
                value={info}
                onChange={(e) => setInfo(e.target.value)}
                helperText={isRequiredInfo ? t('errors.requiredField') : false}
                error={isRequiredInfo}
              />
              <TextField
                id="url"
                label={t('info.linkForSubmit')}
                className={styles.textField}
                fullWidth
                placeholder={t('info.linkForSubmit')}
                required
                rows={2}
                multiline
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                helperText={isRequiredUrl ? t('errors.requiredField') : error ? t('errors.linkBroken') : false}
                error={error || isRequiredUrl}
              />
            </div>
          </div>
          <Button
            variant="outlined"
            color="primary"
            className={styles.submitButton}
            type="submit"
            onSubmit={(e) => {
              e.preventDefault();
            }}
            onClick={handeClick}
          >
            {status === 'Loading' ? <Loading /> : t('buttons.send')}
          </Button>
        </form>
      ) : (
        <h2>{t('info.titleSendSuggest')}</h2>
      )}
    </Dialog>
  );
};

export default CustomDialog;
