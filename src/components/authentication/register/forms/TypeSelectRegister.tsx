import React from 'react';
import { Box, TextField, Typography } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import '../RegisterStyles.css';
import { useSendCode } from '../hooks/useSendCode';
import { ArrowInputIcon } from '../../common/ArrowInputIcon';
import { authActionCreators, authSelectors, AuthType } from '../../../../slices/authSlice';
import OAuthBlockLogin from '../../common/OAuthBlockLogin';

const TypeSelectRegister = () => {
  const isMountedRef = useIsMountedRef();
  const { t } = useTranslation();
  const { setRegisterStep, setAuthType } = authActionCreators();
  const {
    send,
    error,
    resetError,
    status: { emailStatus, phoneStatus },
  } = useSendCode(setRegisterStep);
  const registerType = useSelector(authSelectors.getAuthType());

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          mt: 3,
        }}
      >
        <Formik
          initialValues={{
            email: '',
            phone: '',
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email(t('errors.email') || 'Неправильный e-mail'),
            phone: Yup.string(),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }): Promise<void> => {
            try {
              const { phone, email } = values;
              await send({ values: { phone, email }, registerType, setRegisterStep });
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
          {({ errors, handleChange, handleSubmit, values }): JSX.Element => (
            <form noValidate={false} onSubmit={handleSubmit}>
              <Typography color="#747373" mb={2}>
                {t('registration.step2.titleFieldEmail') || 'Регистрация через e-mail'}
              </Typography>
              <TextField
                fullWidth
                helperText={errors.email || (registerType === AuthType.Email && error)}
                value={values.email}
                onChange={(e) => {
                  resetError();
                  handleChange(e);
                }}
                label="E-mail"
                variant="outlined"
                error={!!errors.email || (registerType === AuthType.Email && !!error)}
                name="email"
                InputProps={{
                  endAdornment: (
                    <ArrowInputIcon
                      status={emailStatus}
                      disable={!values.email || !!errors.email}
                      onClick={() => {
                        setAuthType(AuthType.Email);
                      }}
                    />
                  ),
                }}
              />
              <Box sx={{ mt: 2.5 }} />
              <Typography color="#747373" gutterBottom mb={2}>
                {t('registration.step2.titleFieldPhone') || 'Регистрация через смс'}
              </Typography>
              <TextField
                fullWidth
                helperText={errors.phone || (registerType === AuthType.Phone && error)}
                error={!!errors.phone || (registerType === AuthType.Phone && !!error)}
                label="+7 XXX XXX XX XX"
                margin="normal"
                name="phone"
                variant="outlined"
                onChange={(e) => {
                  resetError();
                  handleChange(e);
                }}
                value={values.phone}
                InputProps={{
                  endAdornment: (
                    <ArrowInputIcon
                      status={phoneStatus}
                      id="sign-in-button"
                      disable={!values.phone || !!errors.phone}
                      onClick={() => {
                        setAuthType(AuthType.Phone);
                      }}
                    />
                  ),
                }}
              />
            </form>
          )}
        </Formik>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 5 }}>
          <OAuthBlockLogin />
        </Box>
      </Box>
    </>
  );
};

export default TypeSelectRegister;
