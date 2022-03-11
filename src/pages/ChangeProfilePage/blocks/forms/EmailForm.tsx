/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-template-curly-in-string */
import React from 'react';
import { Button, TextField, InputLabel } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from 'src/store';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { setLocale } from 'yup';
import { Loading } from 'src/components/Loading/Loading';
import { APIStatus } from 'src/lib/axiosAPI';
import { useFetchEmail } from '../../hooks/useFetchEmail';
import styles from '../../ChangeProfilePage.module.scss';

export const EmailForm = () => {
  const { t } = useTranslation();
  /* eslint-disable prefer-template */
  setLocale({
    string: {
      max: t('errors.maxLength') + ' ${max}',
      min: t('errors.minLength') + ' ${min}',
    },
  });
  /* eslint-enable prefer-template */

  const { data } = useSelector((s: RootState) => s.profile);

  const checkEmailType = data?.userRegistrationTypes?.find(
    ({ user_registration_type }) => user_registration_type === ('Гугл аккаунт' || 'Яндекс аккаунт')
  );

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const {
    sendCodeEmail,
    sendEmail,
    statusCheckEmail,
    statusCodeMessage,
    statusEmailCode,
    statusEmailMessage,
    mail,
    statusPassword,
    statusCheckPassword,
    fetchSetNewPassword,
  } = useFetchEmail();

  return !checkEmailType ? (
    <div className={styles.emailWrapper}>
      <h4>{t('profile.linkOrChangeEmail')}</h4>
      <Formik
        initialValues={{
          email: '',
        }}
        onSubmit={async (values) => {
          await sendEmail(values.email);
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email(t('errors.enterValidEmail')).required(t('errors.requiredField')),
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
              <div className={styles.row}>
                <div className={styles.input}>
                  <InputLabel htmlFor="email" className={styles.inputLabel}>
                    E-mail
                  </InputLabel>
                  <TextField
                    type="email"
                    id="email"
                    variant={'outlined'}
                    fullWidth
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.email}
                    error={!!errors.email}
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
                    disabled={!values.email ? true : false}
                  >
                    {statusCheckEmail === APIStatus.Loading ? <Loading color="white" /> : t('buttons.confirmEmail')}
                  </Button>
                </div>
              </div>
              {statusCheckEmail === APIStatus.Success ? (
                <div className={styles.message} style={{ color: '#248232' }}>
                  {t('info.sendCodeEmail')}
                </div>
              ) : statusCheckEmail === APIStatus.Failure ? (
                <div className={styles.message} style={{ color: 'red' }}>
                  {statusEmailMessage}
                </div>
              ) : null}
            </form>
          );
        }}
      </Formik>
      <Formik
        initialValues={{
          codeEmail: '',
        }}
        onSubmit={async (values) => {
          sendCodeEmail(mail, values.codeEmail);
        }}
        validationSchema={Yup.object().shape({
          codeEmail: Yup.string().max(6).min(6).required(t('errors.requiredField')),
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
              <div className={styles.row}>
                <div className={styles.input}>
                  <InputLabel htmlFor="codeEmail" className={styles.inputLabel}>
                    {t('profile.inputCodeEmail')}
                  </InputLabel>
                  <TextField
                    type="text"
                    id="codeEmail"
                    variant={'outlined'}
                    fullWidth
                    value={values.codeEmail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.codeEmail}
                    error={!!errors.codeEmail}
                    disabled={statusCheckEmail !== APIStatus.Success}
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
                    disabled={statusCheckEmail !== APIStatus.Success}
                  >
                    {statusEmailCode === APIStatus.Loading ? <Loading color="white" /> : t('buttons.inputCode')}
                  </Button>
                </div>
              </div>
              {statusEmailCode === APIStatus.Success ? (
                <div className={styles.message} style={{ color: '#248232' }}>
                  {t('info.successUpdateData')}
                </div>
              ) : statusEmailCode === APIStatus.Failure ? (
                <div className={styles.message} style={{ color: 'red' }}>
                  {statusCodeMessage}
                </div>
              ) : null}
            </form>
          );
        }}
      </Formik>
      {statusPassword ? (
        <Formik
          initialValues={{
            password: '',
            passwordRepeat: '',
          }}
          onSubmit={async (values) => {
            await fetchSetNewPassword(mail, values.passwordRepeat);
          }}
          validationSchema={Yup.object().shape({
            password: Yup.string()
              .max(255)
              .min(8)
              .matches(passwordRegex, t('errors.ruleForPassword'))
              .required(t('errors.requiredField')),
            passwordRepeat: Yup.string()
              .oneOf([Yup.ref('password'), null], t('errors.checkPasswords'))
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
              <form onSubmit={handleSubmit} noValidate>
                <div className={styles.password}>
                  <div className={styles.input}>
                    <InputLabel htmlFor="password" className={styles.inputLabel}>
                      {t('profile.enterPassword')}
                    </InputLabel>
                    <TextField
                      type="password"
                      id="password"
                      variant={'outlined'}
                      fullWidth
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={errors.password}
                      error={!!errors.password}
                    />
                  </div>
                  <div className={styles.input}>
                    <InputLabel htmlFor="passwordRepeat" className={styles.inputLabel}>
                      {t('profile.enterPasswordAgain')}
                    </InputLabel>
                    <TextField
                      type="password"
                      id="passwordRepeat"
                      variant={'outlined'}
                      fullWidth
                      value={values.passwordRepeat}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={errors.passwordRepeat}
                      error={!!errors.passwordRepeat}
                    />
                  </div>
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
                  >
                    {statusCheckPassword === APIStatus.Loading ? <Loading color="white" /> : t('buttons.setPassword')}
                  </Button>
                </div>
                {statusCheckPassword === APIStatus.Success ? (
                  <div className={styles.message} style={{ color: '#248232' }}>
                    {t('info.successSetPassword')}
                  </div>
                ) : statusCheckPassword === APIStatus.Failure ? (
                  <div className={styles.message} style={{ color: 'red' }}>
                    {t('info.failSetPassword')}
                  </div>
                ) : null}
              </form>
            );
          }}
        </Formik>
      ) : null}
    </div>
  ) : null;
};

export default EmailForm;
