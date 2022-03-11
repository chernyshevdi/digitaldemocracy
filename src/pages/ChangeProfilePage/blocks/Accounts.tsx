import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { useTranslation } from 'react-i18next';
import { APIStatus } from 'src/lib/axiosAPI';
import { Button, Box } from '@material-ui/core';
import { Loading } from 'src/components/Loading/Loading';
import GoogleLogin from 'react-google-login';
import { OAuthConfig } from 'src/config';
import Google from 'src/icons/pictures/Google.png';
import Yandex from 'src/icons/pictures/Yandex.png';
import YandexLogin from 'src/components/authentication/common/YandexAuth/YandexLogin';
import { useGoogleRegister } from '../hooks/useGoogleRegister';
import { useYandexRegiser } from '../hooks/useYandexRegiser';
import styles from '../ChangeProfilePage.module.scss';

export const Accounts = () => {
  const { t } = useTranslation();
  const { googleOAuth, googleExit, googleError, status } = useGoogleRegister();
  const { yandexExit, yandexOAuth, statusY, yandexError } = useYandexRegiser();
  const { data } = useSelector((s: RootState) => s.profile);
  const checkGoogleType = data?.userRegistrationTypes?.find((item) => item?.user_registration_type === 'Гугл аккаунт');
  const checkYandexType = data?.userRegistrationTypes?.find(
    (item) => item?.user_registration_type === 'Яндекс аккаунт'
  );
  return (
    <div className={styles.account}>
      <h4>{t('profile.linkAccount')}</h4>
      <div className={styles.border}>
        <img src={Yandex} alt="yandex" />
        <YandexLogin
          onSuccess={checkYandexType ? yandexExit : yandexOAuth}
          clientID={OAuthConfig.yandexSecretID}
          redirectUri={`${window.location.origin}/?auth_modal=login`}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <Button
              sx={{
                p: 1,
                paddingRight: 2,
                paddingLeft: 2,
                borderRadius: 100,
                mr: 3,
                textDecoration: 'none',
              }}
              size="small"
              variant="outlined"
              className={styles.accountButton}
            >
              {statusY === APIStatus.Loading ? <Loading color="white" /> : checkYandexType ? t('buttons.unlink') : t('buttons.link')}
            </Button>
          </Box>
        </YandexLogin>
      </div>
      {(
        <div className={styles.message} style={{ color: 'red', marginBottom: '15px' }}>
          {yandexError}
        </div>
      ) || null}
      <div className={styles.border}>
        <img src={Google} alt="google" />
        <GoogleLogin
          className={styles.google}
          clientId={OAuthConfig.googleClientID}
          buttonText="Вход с аккаунтом Google"
          render={(renderProps) => (
            <Button
              sx={{
                p: 1,
                paddingRight: 2,
                paddingLeft: 2,
                borderRadius: 100,
                mr: 3,
                textDecoration: 'none',
              }}
              size="small"
              variant="outlined"
              className={styles.accountButton}
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              {status === APIStatus.Loading ? <Loading color="white" /> : checkGoogleType ? t('buttons.unlink') : t('buttons.link')}
            </Button>
          )}
          onSuccess={checkGoogleType ? googleExit : googleOAuth}
          onFailure={(error) => {
            console.log(error);
          }}
        />
      </div>
      {(
        <div className={styles.message} style={{ color: 'red' }}>
          {googleError}
        </div>
      ) || null}
    </div>
  );
};

export default Accounts;
