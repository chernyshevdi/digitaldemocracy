import React, { useEffect, useMemo } from 'react';
import { Modal, Box } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import firebase from 'firebase';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useSelector } from 'react-redux';
import Register from '../../../../pages/authentication/Register';
import Login from '../../../../pages/authentication/Login';
import { AuthParam, ModalParams } from '../../../../types/routing';
import { useSearchParams } from '../../../../hooks/useSearchParams';
import { authActionCreators, authSelectors } from '../../../../slices/authSlice';
import ResetPassword from '../../../../pages/authentication/ResetPassword';

const getModal = (value: string) => {
  switch (value) {
  case AuthParam.login:
    return <Login />;
  case AuthParam.reset_password:
    return <ResetPassword />;
  case AuthParam.register:
    return <Register />;
  default:
    return <Login />;
  }
};

const AuthModal:React.FC = () => {
  const {
    [ModalParams.Auth]: { value: authValue, setValue: setAuthValue },
  } = useSearchParams(ModalParams.Auth);
  const { setRegisterStep, setLoginStep, setResetStep } = authActionCreators();
  const { loginStep, registerStep, resetStep } = useSelector(authSelectors.getSteps());

  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: () => {}
    });
  }, []);

  useEffect(() => () => {
    setAuthValue(undefined);
    setRegisterStep(1);
    setLoginStep(1);
    setResetStep(1);
  }, []);

  const onCloseModal = () => {
    setAuthValue(undefined);
    setRegisterStep(1);
    setLoginStep(1);
  };

  const handleBack = () => {
    switch (authValue) {
    case AuthParam.login:
      return setLoginStep(loginStep - 1);
    case AuthParam.reset_password:
      return setResetStep(resetStep - 1);
    case AuthParam.register:
      return setRegisterStep(registerStep - 1);
    default:
      return setLoginStep(loginStep - 1);
    }
  };

  const withoutBackButton = useMemo(() => {
    if (authValue === AuthParam.login) return loginStep === 1;
    if (authValue === AuthParam.register) return registerStep === 1 || registerStep === 5;
    return resetStep === 1 || resetStep === 3;
  }, [authValue, loginStep, registerStep, resetStep]);

  return (
    <Modal
      open={!!authValue}
      disableAutoFocus
      onClose={onCloseModal}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mx: 2,
      }}
    >
      <Box sx={{ position: 'relative', maxHeight: '100%', overflow: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: withoutBackButton ? 'flex-end' : 'space-between', position: 'absolute', top: 20, width: '100%' }}>
          {!withoutBackButton && (
            <ArrowBackIcon
              sx={{ left: 20, position: 'relative', color: '#B0B0B0', width: 35, height: 35, cursor: 'pointer' }}
              onClick={handleBack}
            />
          )}
          <CloseIcon
            onClick={onCloseModal}
            sx={{ cursor: 'pointer', color: '#B0B0B0', width: 40, height: 40, fontWeight: '300', right: 20, position: 'relative' }}
          />
        </Box>
        {getModal(authValue)}
      </Box>
    </Modal>
  );
};

export default AuthModal;
