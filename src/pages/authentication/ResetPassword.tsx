import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { ModalWrapper } from '../../components/widgets/modals/ModalWrapper';
import { TypeSelectLogin } from '../../components/authentication/login';
import { authActionCreators, authSelectors } from '../../slices/authSlice';
import PasswordResetSendEmail from '../../components/authentication/password-reset/PasswordResetSendEmail';
import { useSearchParams } from '../../hooks/useSearchParams';
import CreateNewPassword from '../../components/authentication/password-reset/forms/CreateNewPassword';

const InfoBlockResetPassword = () => {
  const { t } = useTranslation();
  return (
    <Typography
      align="center"
      mt={2}
    >
      {t('resetPassword.messageCheckEmail')}
    </Typography>
  );
};

const getCurrentStepComponent = (step: number) => {
  switch (step) {
  case 1:
    return <PasswordResetSendEmail />;
  case 2:
    return <InfoBlockResetPassword />;
  case 3:
    return <CreateNewPassword />;
  default:
    return <TypeSelectLogin />;
  }
};

const ResetPassword = () => {
  const { t } = useTranslation();
  const { setResetStep } = authActionCreators();
  const {
    email: { value: email },
    token: { value: token },
  } = useSearchParams('email', 'token');
  const resetStep = useSelector(authSelectors.getResetPasswordStep());

  useEffect(() => () => {
    setResetStep(1);
  }, []);

  useEffect(() => {
    if (email && token) {
      setResetStep(3);
    }
  }, [email, token]);

  return (
    <ModalWrapper>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h3"
          mb="0"
          fontWeight="300"
        >
          {t('resetPassword.titleResetPassword')}
        </Typography>
      </Box>
      {getCurrentStepComponent(resetStep)}
    </ModalWrapper>
  );
};

export default ResetPassword;
