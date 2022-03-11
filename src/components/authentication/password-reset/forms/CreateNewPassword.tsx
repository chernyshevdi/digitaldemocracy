import React from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Box, Button, TextField } from '@material-ui/core';
import { Formik } from 'formik';
import { APIStatus } from '../../../../lib/axiosAPI';
import { Loading } from '../../../Loading/Loading';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import { useCreateNewPassword } from '../hooks/useCreateNewPassword';

const CreateNewPassword = () => {
  const { t } = useTranslation();
  const isMountedRef = useIsMountedRef();
  const { status, error, create } = useCreateNewPassword();
  return (
    <Formik
      initialValues={{
        password: '',
        confirmPassword: ''
      }}
      validationSchema={
        Yup
          .object()
          .shape({
            password: Yup
              .string().required(t('errors.passwordRequired')).min(8, t('errors.checkLengthPassword')),
            confirmPassword: Yup
              .string().oneOf([Yup.ref('password'), null], t('errors.checkPasswords')),
          })
      }
      onSubmit={async (values, {
        setStatus,
        setSubmitting
      }): Promise<void> => {
        try {
          await create(
            values.password,
            values.confirmPassword,
          );
        } catch (err) {
          console.error(err);
          if (isMountedRef.current) {
            setStatus({ success: false });
            setSubmitting(false);
          }
        }
      }}
    >
      {({
        handleChange,
        handleSubmit,
        errors,
        values
      }): JSX.Element => (
        <form
          noValidate
          onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            helperText={errors.password || error}
            error={!!errors.password || !!error}
            value={values.password}
            onChange={handleChange}
            label={t('registration.step4.enterPassword')}
            variant="outlined"
            name="password"
            sx={{
              mb: 2,
              mt: 2
            }}
          />
          <TextField
            fullWidth
            helperText={error || errors.confirmPassword}
            error={!!error || !!errors.confirmPassword}
            value={values.confirmPassword}
            onChange={handleChange}
            label={t('registration.step4.enterPasswordAgain')}
            variant="outlined"
            name="confirmPassword"
            sx={{
              mb: 2
            }}
          />
          <Box sx={{ mt: 3 }}>
            <Button
              color="primary"
              disabled={!values.password || !values.confirmPassword || status === APIStatus.Loading}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              {status === APIStatus.Loading ? <Loading /> : t('buttons.continue')}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default CreateNewPassword;
