import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, TextField } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import { useRegister } from '../hooks/useRegister';
import { authActionCreators } from '../../../../slices/authSlice';
import { APIStatus } from '../../../../lib/axiosAPI';
import { Loading } from '../../../Loading/Loading';

const CreatePasswordRegister = () => {
  const { t } = useTranslation();
  const isMountedRef = useIsMountedRef();
  const { setRegisterStep } = authActionCreators();
  const { onRegister: register, error: { confPassError, passError }, status } = useRegister(setRegisterStep);

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
            password: '',
            confirmPassword: '',
            submit: null
          }}
          validationSchema={
            Yup
              .object()
              .shape({
                password: Yup
                  .string().required(t('errors.passwordRequired') || 'Введите пароль').min(8, t('errors.checkLengthPassword') || 'Минимальная длина пароля 8 символов'),
                confirmPassword: Yup
                  .string().oneOf([Yup.ref('password'), null], t('errors.checkPasswords') || 'Пароли не совпадают'),
              })
          }
          onSubmit={async (values, {
            setErrors,
            setStatus,
            setSubmitting,
          }): Promise<void> => {
            try {
              await register(values.password, values.confirmPassword);
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
              <TextField
                fullWidth
                helperText={errors.password || passError}
                error={!!errors.password || !!passError}
                value={values.password}
                onChange={handleChange}
                label={t('registration.step4.enterPassword') || 'Придумайте пароль'}
                variant="outlined"
                name="password"
                sx={{
                  mb: 2
                }}
              />
              <TextField
                fullWidth
                helperText={errors.confirmPassword || confPassError}
                error={!!errors.confirmPassword || !!confPassError}
                label={t('registration.step4.enterPasswordAgain') || 'Введите пароль повторно'}
                margin="normal"
                name="confirmPassword"
                variant="outlined"
                onChange={handleChange}
                value={values.confirmPassword}
              />
              <Box sx={{ mt: 3 }}>
                <Button
                  color="primary"
                  disabled={(!values.password && !values.confirmPassword) || status === APIStatus.Loading}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  {status === APIStatus.Loading ? <Loading /> : t('buttons.setPassword').toUpperCase() || 'ЗАДАТЬ ПАРОЛЬ'}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default CreatePasswordRegister;
