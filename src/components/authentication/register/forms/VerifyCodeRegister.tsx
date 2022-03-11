import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import { useVerifyCodeSend } from '../hooks/useVerifyCodeSend';
import { authActionCreators, authSelectors, AuthType } from '../../../../slices/authSlice';
import { APIStatus } from '../../../../lib/axiosAPI';
import { useVerifyFirebaseCode } from '../hooks/useVerifyFirebaseCode';
import { Loading } from '../../../Loading/Loading';
import { useLogin } from '../../login/hooks/useLogin';

const VerifyCodeRegister = () => {
  const { t } = useTranslation();
  const isMountedRef = useIsMountedRef();
  const { setRegisterStep } = authActionCreators();
  const { send, status, error } = useVerifyCodeSend(setRegisterStep);
  const registerType = useSelector(authSelectors.getAuthType());
  const { verify, error: firebaseError, status: firebaseStatus } = useVerifyFirebaseCode(setRegisterStep);
  const isLoading = status === APIStatus.Loading || firebaseStatus === APIStatus.Loading;
  const { resendFirebaseCode } = useLogin();

  const [resend, setResend] = useState<number>(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setResend((state) => (state !== 0 ? state - 1 : 0));
    }, 1000);
    if (resend === 0) {
      clearInterval(timer);
    }
  }, []);

  const resendCode = () => {
    if (resend === 0) {
      resendFirebaseCode();
      setResend(30);
    }
  };

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          mt: 3
        }}
      >
        <Formik
          initialValues={{
            code: undefined,
            submit: null
          }}
          validationSchema={
            Yup
              .object()
              .shape({
                code: Yup
                  .number()
                  .typeError(t('errors.confirmCode') || 'Код подтверждения не может содержать буквы')
                  .required(t('errors.codeNotEntered') || 'Код не введен'),
              })
          }
          onSubmit={async (values, {
            setErrors,
            setStatus,
            setSubmitting,
          }): Promise<void> => {
            try {
              if (registerType === AuthType.Phone) {
                await verify(values.code);
              } else {
                await send(values.code, registerType);
              }
            } catch (err) {
              console.error(err);
              if (isMountedRef.current) {
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
              }
            }
          }}
        >
          {({
            errors,
            handleChange,
            handleSubmit,
            values
          }): JSX.Element => (
            <form
              noValidate
              onSubmit={handleSubmit}
            >
              <Typography
                color="#222222"
                align="center"
                variant="h5"
                fontWeight="300"
              >
                {registerType === AuthType.Email ? t('registration.step3.descriptionConfirmEmail') : t('registration.step3.descriptionConfirmPhone')}
              </Typography>
              <Box sx={{ mt: 2 }} />
              <TextField
                fullWidth
                helperText={errors.code || error || firebaseError}
                error={!!errors.code || !!error || !!firebaseError}
                label={registerType === AuthType.Phone ? t('registration.step3.enterPhone') : t('registration.step3.enterEmail')}
                margin="normal"
                name="code"
                variant="outlined"
                onChange={handleChange}
                value={values.code}
              />
              <Box sx={{ mt: 1 }}>
                {registerType === AuthType.Phone && (
                  <Button
                    className="resend"
                    disabled={resend !== 0}
                    onClick={resendCode}
                    id="sign-in-button"
                  >
                    {
                      resend !== 0
                        ? `${t('registration.step3.codeWithSeconds')} ${resend} ${t('registration.step3.seconds')}`
                        : t('registration.step3.codeWithoutSeconds') || 'Отправить код повторно'
                    }
                  </Button>
                )}
              </Box>
              <Box sx={{ mt: 2 }}>
                <Button
                  id="sign-in-button"
                  color="primary"
                  disabled={!values.code || isLoading}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  {isLoading ? <Loading /> : t('buttons.confirmRegistration').toUpperCase() || 'ЗАРЕГИСТРИРОВАТЬСЯ'}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default VerifyCodeRegister;
