import React, { useEffect, useState } from 'react';
import { Box, Button, Switch, TextField, Typography } from '@material-ui/core';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ReCAPTCHA from 'react-google-recaptcha';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import { useLogin } from '../hooks/useLogin';
import { authSelectors, AuthType } from '../../../../slices/authSlice';
import { recaptchaConfig } from '../../../../config';
import { APIStatus } from '../../../../lib/axiosAPI';
import { Loading } from '../../../Loading/Loading';
import './styles.scss';

const ConfirmPasswordLogin = () => {
  const { t } = useTranslation();
  const isMountedRef = useIsMountedRef();
  const { passwordVerify, codeVerify, error, status, resendFirebaseCode } = useLogin();
  const { rememberMe, authType } = useSelector(authSelectors.getAllData());
  const loginThroughEmail = authType === AuthType.Email;
  const [resend, setResend] = useState<number>(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setResend((state) => (state !== 0 ? state - 1 : 0));
    }, 1000);
    if (resend === 0) {
      clearInterval(timer);
    }
  }, []);

  const onChangeRecaptcha = (value) => {
    console.log('Captcha value:', value);
  };

  const resendCode = () => {
    if (resend === 0) {
      resendFirebaseCode();
      setResend(30);
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        mt: 3
      }}
    >
      <Formik
        initialValues={{
          password: '',
          submit: null,
          code: '',
          rememberMe
        }}
        onSubmit={async (values, {
          setErrors,
          setStatus,
          setSubmitting,
        }): Promise<void> => {
          try {
            if (loginThroughEmail) {
              await passwordVerify(values.password, values.rememberMe);
            } else {
              await codeVerify(values.code);
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
          handleChange,
          handleSubmit,
          values
        }): JSX.Element => (
          <form
            noValidate
            onSubmit={handleSubmit}
          >
            <TextField
              fullWidth
              helperText={error}
              error={!!error}
              value={loginThroughEmail ? values.password : values.code}
              onChange={handleChange}
              label={loginThroughEmail ? t('signIn.titlePassword') : t('signIn.titlePhone')}
              variant="outlined"
              name={loginThroughEmail ? 'password' : 'code'}
              sx={{
                mb: 2
              }}
            />
            {!loginThroughEmail && (
              <Button
                className="resend"
                disabled={resend !== 0}
                onClick={resendCode}
                id="sign-in-button"
              >
                {resend !== 0 ? `${t('registration.step3.codeWithSeconds')} ${resend} ${t('registration.step3.seconds')}` : t('registration.step3.codeWithoutSeconds')}
              </Button>
            )}
            <Box>
              {false && (
                <ReCAPTCHA
                  sitekey={recaptchaConfig.siteKey}
                  onChange={onChangeRecaptcha}
                />
              )}
              {loginThroughEmail && (
                <Box sx={{
                  mt: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                >
                  <Typography sx={{
                    paddingBottom: '0!important'
                  }}
                  >
                    {t('buttons.rememberMe')}
                  </Typography>
                  <Switch
                    color="primary"
                    value={values.rememberMe}
                    name="rememberMe"
                    onChange={handleChange}
                  />
                </Box>
              )}
            </Box>
            <Box sx={{ mt: 3 }}>
              <Button
                color="primary"
                disabled={(loginThroughEmail ? !values.password : !values.code) || status === APIStatus.Loading}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                {status === APIStatus.Loading ? <Loading /> : t('buttons.enter').toUpperCase()}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default ConfirmPasswordLogin;
