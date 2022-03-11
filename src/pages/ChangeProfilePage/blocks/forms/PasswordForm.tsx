/* eslint-disable no-unneeded-ternary */
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { useTranslation } from 'react-i18next';
import { Button, TextField, InputLabel } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { setLocale } from 'yup';
import { Loading } from 'src/components/Loading/Loading';
import { APIStatus } from 'src/lib/axiosAPI';
import { useChangePassword } from '../../hooks/useChangePassword';
import styles from '../../ChangeProfilePage.module.scss';

export const PasswordForm = () => {
  const { t } = useTranslation();
  const { fetchSetNewPassword, statusCheckPassword, statusPasswordMessage } = useChangePassword();
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const { data } = useSelector((s: RootState) => s.profile);

  const checkEmailType = data?.userRegistrationTypes?.find(
    ({ user_registration_type }) => user_registration_type === 'Email'
  );

  return checkEmailType ? (
    <div className={styles.passwordWrapper}>
      <h4>{t('profile.changePassword')}</h4>
      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
          newPasswordRepeat: '',
        }}
        onSubmit={async (values) => {
          await fetchSetNewPassword(values.newPasswordRepeat, values.oldPassword);
        }}
        validationSchema={Yup.object().shape({
          oldPassword: Yup.string().max(255).min(8).required(t('errors.requiredField')),
          newPassword: Yup.string()
            .max(255)
            .min(8)
            .matches(passwordRegex, t('errors.ruleForPassword'))
            .required(t('errors.requiredField')),
          newPasswordRepeat: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], t('errors.checkPasswords'))
            .required(t('errors.requiredField')),
        })}
        enableReinitialize={true}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
            setFieldValue,
          } = props;
          const disabled = !!Object.entries(errors).length || !dirty;
          return (
            <form className={styles.email} onSubmit={handleSubmit} noValidate>
              <div className={styles.password}>
                <div className={styles.input}>
                  <InputLabel htmlFor="oldPassword" className={styles.inputLabel}>
                    {t('profile.enterOldPassword')}
                  </InputLabel>
                  <TextField
                    type="password"
                    id="oldPassword"
                    variant={'outlined'}
                    fullWidth
                    value={values.oldPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className={styles.input}>
                  <InputLabel htmlFor="newPassword" className={styles.inputLabel}>
                    {t('profile.enterNewPassword')}
                  </InputLabel>
                  <TextField
                    type="password"
                    id="newPassword"
                    variant={'outlined'}
                    fullWidth
                    value={values.newPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.newPassword}
                    error={!!errors.newPassword}
                  />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.input}>
                  <InputLabel htmlFor="newPasswordRepeat" className={styles.inputLabel}>
                    {t('profile.repeatNewPassword')}
                  </InputLabel>
                  <TextField
                    type="password"
                    id="newPasswordRepeat"
                    variant={'outlined'}
                    fullWidth
                    value={values.newPasswordRepeat}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.newPasswordRepeat}
                    error={!!errors.newPasswordRepeat}
                  />
                </div>
                <div className={styles.buttons}>
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
                    className={styles.button}
                    type="submit"
                    disabled={!values.newPasswordRepeat ? true : false}
                  >
                    {statusCheckPassword === APIStatus.Loading ? <Loading color="white" /> : t('buttons.confirmChange')}
                  </Button>
                </div>
              </div>
              {statusCheckPassword === APIStatus.Success ? (
                <div className={styles.message} style={{ color: '#248232' }}>
                  {t('info.successChangePassword')}
                </div>
              ) : statusCheckPassword === APIStatus.Failure ? (
                <div className={styles.message} style={{ color: 'red' }}>
                  {statusPasswordMessage}
                </div>
              ) : null}
            </form>
          );
        }}
      </Formik>
    </div>
  ) : null;
};

export default PasswordForm;
