/* eslint-disable no-unneeded-ternary */
import React, { useState, useEffect } from 'react';
import { RootState } from 'src/store';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, InputLabel, Autocomplete } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { profileActionCreators } from 'src/slices/profileSlice';
import { Loading } from 'src/components/Loading/Loading';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { setLocale } from 'yup';
import { APIStatus } from 'src/lib/axiosAPI';
import { useFetchProfileInfo } from '../../hooks/useFetchProfileInfo';
import styles from '../../ChangeProfilePage.module.scss';
import { useFetchUserData } from '../../../ProfilePage/hooks/useFetchUserData';

export const MainForm = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const { data, religions, genders, countries, political_views, educations, cities, regions } = useSelector(
    (s: RootState) => s.profile
  );

  const [update, setUpdate] = useState(true);

  const { changeCountyId, changeRegionId } = profileActionCreators();

  const { statusCity, statusRegion, fetchRegionData, fetchCityData, sendEditData, statusPOST } = useFetchProfileInfo();
  const { status, fetch } = useFetchUserData();

  const [postData, setPostData] = useState({
    name: data?.userProfile?.first_name ?? '',
    lastname: data?.userProfile?.last_name ?? '',
    day: data?.userProfile?.birth_date?.split('-')?.reverse()?.join('-') ?? '',
    gender: data?.userProfile?.gender_id?.id ?? null,
    country: data?.userProfile?.country_id?.id ?? null,
    region: data?.userProfile?.region_id?.id ?? null,
    city: data?.userProfile?.city_id?.id ?? null,
    religion: data?.userProfile?.religion_id?.id ?? null,
    education: data?.userProfile?.education_id?.id ?? null,
    political_views: data?.userProfile?.political_view_id?.id ?? null,
  });

  setLocale({
    string: {
      max: t('errors.maxLength'),
    },
  });

  useEffect(() => {
    if (data?.userProfile?.country_id?.id) {
      fetchRegionData(data?.userProfile?.country_id?.id);
    }
  }, [data?.userProfile?.country_id?.id]);

  useEffect(() => {
    if (data?.userProfile?.region_id?.id) {
      fetchCityData(data?.userProfile?.region_id?.id);
    }
  }, [data?.userProfile?.region_id?.id]);

  useEffect(() => {
    fetch();
  }, [update]);

  return (
    <Formik
      initialValues={{
        name: data?.userProfile?.first_name ?? '',
        lastname: data?.userProfile?.last_name ?? '',
        day:
          data?.userProfile?.birth_date?.split('-')[0].length !== 4
            ? data?.userProfile?.birth_date?.split('-')?.reverse()?.join('-')
            : data?.userProfile?.birth_date ?? '',
        gender: data?.userProfile?.gender_id?.title?.[currentLang] ?? data?.userProfile?.gender_id?.title?.ru ?? '',
        country: data?.userProfile?.country_id?.title?.[currentLang] ?? data?.userProfile?.country_id?.title?.ru ?? '',
        region: data?.userProfile?.region_id?.title?.[currentLang] ?? data?.userProfile?.region_id?.title?.ru ?? '',
        city: data?.userProfile?.city_id?.title?.[currentLang] ?? data?.userProfile?.city_id?.title?.ru ?? '',
        religion: data?.userProfile?.religion_id?.title?.[currentLang] ?? data?.userProfile?.religion_id?.title?.ru ?? '',
        education: data?.userProfile?.education_id?.title?.[currentLang] ?? data?.userProfile?.education_id?.title?.ru ?? '',
        political_views: data?.userProfile?.political_view_id?.title?.[currentLang] ?? data?.userProfile?.political_view_id?.title?.ru ?? '',
      }}
      onSubmit={async (values) => {
        const { name, lastname, day } = values;
        setPostData({ ...postData, name, lastname, day });
        try {
          await sendEditData(postData, name, lastname, day);
          // await fetchUserData();
          await setUpdate(!update);
        } catch (e) {
          console.log(e);
        }
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(255),
        lastname: Yup.string().max(255),
        day: Yup.date(),
        gender: Yup.string(),
        country: Yup.string().required(t('errors.requiredField')),
        region: Yup.string(),
        city: Yup.string(),
        religion: Yup.string(),
        education: Yup.string(),
        political_views: Yup.string(),
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
          <form onSubmit={handleSubmit} className={styles.mainForm} onReset={handleReset} noValidate>
            <InputLabel htmlFor="name" className={styles.inputLabel}>
              {t('profile.name')}
            </InputLabel>
            <TextField
              type="text"
              id="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
            />
            <InputLabel htmlFor="lastname" className={styles.inputLabel}>
              {t('profile.lastName')}
            </InputLabel>
            <TextField
              type="text"
              id="lastname"
              value={values.lastname}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
            />
            <div className={styles.multiInputs}>
              <div className={styles.rowInput}>
                <InputLabel htmlFor="day" className={styles.inputLabel}>
                  {t('profile.birthday')}
                </InputLabel>
                <TextField
                  type="date"
                  id="day"
                  value={values.day}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className={styles.rowInput}>
                <InputLabel htmlFor="gender" className={styles.inputLabel}>
                  {t('profile.gender')}
                </InputLabel>
                <Autocomplete
                  id="gender"
                  limitTags={10}
                  options={genders}
                  value={values.gender}
                  getOptionLabel={(option) => option?.title?.[currentLang] || option?.title?.ru || values.gender}
                  isOptionEqualToValue={(option, value) =>
                    option.title?.[currentLang] === value || option.title?.ru === value}
                  noOptionsText={<>{t('info.noVariants')}</>}
                  onChange={(_, newValue) => {
                    if (newValue && newValue !== null) {
                      setFieldValue('gender', newValue.title?.[currentLang] || newValue.title?.ru);
                      setPostData({ ...postData, gender: newValue.id });
                    } else {
                      setFieldValue('gender', '');
                      setPostData({ ...postData, gender: null });
                    }
                  }}
                  renderInput={(params) => (
                    <TextField {...params} type="text" onBlur={handleBlur} variant="outlined" fullWidth />
                  )}
                />
              </div>
            </div>
            <InputLabel htmlFor="country" className={styles.inputLabel}>
              {t('profile.country')}
            </InputLabel>
            <Autocomplete
              id="country"
              limitTags={5}
              options={countries}
              value={values.country}
              getOptionLabel={(option) => option?.title?.[currentLang] || option?.title?.ru || values.country}
              isOptionEqualToValue={(option, value) =>
                option.title?.[currentLang] === value || option.title?.ru === value}
              noOptionsText={<>{t('info.noVariants')}</>}
              onChange={(_, newValue) => {
                if (newValue && newValue !== null) {
                  setFieldValue('country', newValue.title?.[currentLang] || newValue.title?.ru);
                  changeCountyId(newValue.id);
                  setPostData({ ...postData, country: newValue.id, region: null, city: null });
                  setFieldValue('region', '');
                } else {
                  setFieldValue('country', '');
                  setFieldValue('region', '');
                  setPostData({ ...postData, country: null, region: null, city: null });
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  type="text"
                  onBlur={handleBlur}
                  variant="outlined"
                  fullWidth
                  helperText={errors.country}
                  error={!!errors.country}
                />
              )}
            />
            <InputLabel htmlFor="region" className={styles.inputLabel}>
              {t('profile.region')}
            </InputLabel>
            <Autocomplete
              id="region"
              limitTags={5}
              options={regions}
              disabled={!values.country || statusRegion !== APIStatus.Success ? true : false}
              value={values.region}
              getOptionLabel={(option) => option?.title?.[currentLang] || option?.title?.ru || values.region}
              isOptionEqualToValue={(option, value) =>
                option.title?.[currentLang] === value || option.title?.ru === value}
              noOptionsText={<>{t('info.noVariants')}</>}
              onChange={(_, newValue) => {
                if (newValue && newValue !== null) {
                  setFieldValue('region', newValue.title?.[currentLang] || newValue.title?.ru);
                  changeRegionId(newValue.id);
                  setPostData({ ...postData, region: newValue.id, city: null });
                  setFieldValue('city', '');
                } else {
                  setFieldValue('region', '');
                  setFieldValue('city', '');
                  setPostData({ ...postData, region: null, city: null });
                }
              }}
              renderInput={(params) => (
                <TextField {...params} type="text" onBlur={handleBlur} variant="outlined" fullWidth />
              )}
            />
            <InputLabel htmlFor="city" className={styles.inputLabel}>
              {t('profile.city')}
            </InputLabel>
            <Autocomplete
              id="city"
              limitTags={5}
              options={cities}
              value={values.city}
              disabled={!values.region || statusCity !== APIStatus.Success ? true : false}
              getOptionLabel={(option) => option?.title?.[currentLang] || option?.title?.ru || values.city}
              isOptionEqualToValue={(option, value) =>
                option.title?.[currentLang] === value || option.title?.ru === value}
              noOptionsText={<>{t('info.noVariants')}</>}
              onChange={(_, newValue) => {
                if (newValue && newValue !== null) {
                  setFieldValue('city', newValue.title?.[currentLang] || newValue.title?.ru);
                  setPostData({ ...postData, city: newValue.id });
                } else {
                  setFieldValue('city', '');
                  setPostData({ ...postData, city: null });
                }
              }}
              renderInput={(params) => (
                <TextField {...params} type="text" onBlur={handleBlur} variant="outlined" fullWidth />
              )}
            />
            <InputLabel htmlFor="religion" className={styles.inputLabel}>
              {t('profile.religiousViews')}
            </InputLabel>
            <Autocomplete
              id="religion"
              limitTags={10}
              options={religions}
              value={values.religion}
              getOptionLabel={(option) => option?.title?.[currentLang] || values.religion}
              isOptionEqualToValue={(option, value) => option.title === value}
              noOptionsText={<>Нет доступных вариантов</>}
              onChange={(_, newValue) => {
                if (newValue && newValue !== null) {
                  setFieldValue('religion', newValue.title?.[currentLang] || newValue.title?.ru);
                  setPostData({ ...postData, religion: newValue.id });
                } else {
                  setFieldValue('religion', '');
                  setPostData({ ...postData, religion: null });
                }
              }}
              renderInput={(params) => (
                <TextField {...params} type="text" onBlur={handleBlur} variant="outlined" fullWidth />
              )}
            />
            <InputLabel htmlFor="education" className={styles.inputLabel}>
              {t('profile.education')}
            </InputLabel>
            <Autocomplete
              id="education"
              limitTags={10}
              options={educations}
              value={values.education}
              getOptionLabel={(option) => option?.title?.[currentLang] || option?.title?.ru || values.education}
              isOptionEqualToValue={(option, value) =>
                option.title?.[currentLang] === value || option.title?.ru === value}
              noOptionsText={<>{t('info.noVariants')}</>}
              onChange={(_, newValue) => {
                if (newValue && newValue !== null) {
                  setFieldValue('education', newValue.title?.[currentLang] || newValue.title?.ru);
                  setPostData({ ...postData, education: newValue.id });
                } else {
                  setFieldValue('education', '');
                  setPostData({ ...postData, education: null });
                }
              }}
              renderInput={(params) => (
                <TextField {...params} type="text" onBlur={handleBlur} variant="outlined" fullWidth />
              )}
            />
            <InputLabel htmlFor="political_views" className={styles.inputLabel}>
              {t('profile.politicianViews')}
            </InputLabel>
            <Autocomplete
              id="political_views"
              limitTags={10}
              options={political_views}
              value={values.political_views}
              getOptionLabel={(option) => option?.title?.[currentLang] || option?.title?.ru || values.political_views}
              isOptionEqualToValue={(option, value) =>
                option.title?.[currentLang] === value || option.title?.ru === value}
              noOptionsText={<>{t('info.noVariants')}</>}
              onChange={(_, newValue) => {
                if (newValue && newValue !== null) {
                  setFieldValue('political_views', newValue.title?.[currentLang] || newValue.title?.ru);
                  setPostData({ ...postData, political_views: newValue.id });
                } else {
                  setFieldValue('political_views', '');
                  setPostData({ ...postData, political_views: null });
                }
              }}
              renderInput={(params) => (
                <TextField {...params} type="text" onBlur={handleBlur} variant="outlined" fullWidth />
              )}
            />
            <div className={styles.buttons}>
              <Button
                className={styles.submitButton}
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
                type="submit"
                disabled={!values.country}
              >
                {statusPOST === APIStatus.Loading ? <Loading color="white" /> : t('buttons.confirmChange')}
              </Button>
              <Button
                className={styles.clearButton}
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
                type="reset"
              >
                {t('buttons.resetInputData')}
              </Button>
            </div>
            {statusPOST === APIStatus.Success ? (
              <div className={styles.message} style={{ color: '#248232' }}>
                {t('info.successUpdateData')}
              </div>
            ) : statusPOST === APIStatus.Failure ? (
              <div className={styles.message} style={{ color: 'red' }}>
                {t('info.failUpdateData')}
              </div>
            ) : null}
          </form>
        );
      }}
    </Formik>
  );
};

export default MainForm;
