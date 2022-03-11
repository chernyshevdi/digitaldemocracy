import React, { FC } from 'react';
import GoogleLogin from 'react-google-login';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@material-ui/core';
import styles from './OAuthBlockLogin.module.scss';
import { OAuthConfig } from '../../../config';
import YandexLogin from './YandexAuth/YandexLogin';
import { useOAuthRegister } from './hooks/useOAuthRegister';
import Yandex from '../../../icons/Yandex';
import { useSearchParams } from '../../../hooks/useSearchParams';

interface OAuthBlockLoginProps {
  isLogin?: boolean
}

const OAuthBlockLogin:FC<OAuthBlockLoginProps> = ({ isLogin }) => {
  const { t } = useTranslation();
  const { yandexOAuth, googleOAuth, yandexError, googleError } = useOAuthRegister(isLogin);
  /*
   onClick={() => {
              window.location.href = yandexOAuth();
              const yaWindow = yandexOAuth();
              yaWindow.onload = (e) => {
                console.log(yaWindow.location.hash);
              };
    }}
  */

  return (
    <Box>
      <Box className={styles.container}>
        <Box className={styles.item}>
          <GoogleLogin
            className={styles.google}
            clientId={OAuthConfig.googleClientID}
            buttonText={t('buttons.google') || 'Вход с аккаунтом Google'}
            onSuccess={googleOAuth}
            onFailure={(error) => {
              console.log(error);
            }}
          />
        </Box>
        <Box className={styles.item}>
          <YandexLogin
            onSuccess={yandexOAuth}
            clientID={OAuthConfig.yandexSecretID}
            redirectUri={`${window.location.origin}/?auth_modal=login`}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <Yandex />
              <Typography
                color="black"
                sx={{ ml: 2, paddingBottom: '0px!important', fontFamily: 'unset!important' }}
              >
                {t('buttons.yandex') || 'Вход с аккаунтом Yandex'}
              </Typography>
            </Box>
          </YandexLogin>
        </Box>
      </Box>
      {(googleError || yandexError) && (
        <Box
          className={styles.error}
        // style={{ textAlign: googleError ? 'left' : 'right' }}
        >
          {googleError || yandexError}
        </Box>
      )}
    </Box>
  );
};

export default OAuthBlockLogin;
