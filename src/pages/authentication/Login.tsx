import React, { useEffect } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';
import { ConfirmPasswordLogin, TypeSelectLogin } from '../../components/authentication/login';
import gtm from '../../lib/gtm';
import { ModalParams } from '../../types/routing';
import { useSearchParams } from '../../hooks/useSearchParams';
import { authActionCreators, authSelectors } from '../../slices/authSlice';
import { ModalWrapper } from '../../components/widgets/modals/ModalWrapper';
import OAuthBlockLogin from '../../components/authentication/common/OAuthBlockLogin';

const getCurrentStepComponent = (step: number) => {
  switch (step) {
  case 1:
    return <TypeSelectLogin />;
  case 2:
    return <ConfirmPasswordLogin />;
  default:
    return <TypeSelectLogin />;
  }
};

const Login: FC = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const { t } = useTranslation();

  const {
    [ModalParams.Auth]: { setValue: setAuthValue },
  } = useSearchParams(ModalParams.Auth);
  const loginStep = useSelector(authSelectors.getLoginStep());

  const { setLoginStep } = authActionCreators();

  useEffect(
    () => () => {
      setLoginStep(1);
    },
    []
  );

  return (
    <ModalWrapper>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography color="textPrimary" gutterBottom variant="h3" mb="0" fontWeight="300">
          {t('signIn.titleSignIn')}
        </Typography>
      </Box>
      {getCurrentStepComponent(loginStep)}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 5 }}>
        <OAuthBlockLogin isLogin />
      </Box>
      <Box
        sx={{
          justifyContent: 'flex-start',
          mt: 4,
        }}
      >
        {loginStep === 2 && (
          <Box>
            <Typography
              sx={{
                color: '#747373',
                textDecoration: 'underline',
                cursor: 'pointer',
                width: 230,
              }}
              onClick={() => setAuthValue('reset_password')}
            >
              {t('buttons.recoverPassword')}
            </Typography>
          </Box>
        )}
      </Box>
      <Box sx={{ mt: 4, justifyContent: 'space-between', alignItems: 'center', display: 'flex' }}>
        <Typography sx={{ pb: '0px!important' }}>{t('signIn.newUser')}</Typography>
        <Button
          className={styles.registerButton}
          // color="primary"
          size="medium"
          variant="outlined"
          onClick={() => setAuthValue('register')}
        >
          {t('buttons.registrationButtons')}
        </Button>
      </Box>
    </ModalWrapper>
  );
};

export default Login;
