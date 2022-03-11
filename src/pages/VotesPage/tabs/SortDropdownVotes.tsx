import React, { useState, useEffect } from 'react';
import { RootState } from 'src/store';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { InputLabel, Autocomplete, Checkbox } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import { Formik } from 'formik';
import { useFetchPoliticians } from 'src/pages/RatingPage/hooks/useFetchPoliticians';
import { useFetchSort } from '../hooks/useFetchSort';
import styles from './Tabs.module.scss';
import { electionsActionCreators } from '../../../slices/votesPageSlice';

export const SortDropdownVotes = ({ field, world, setWorld, update, setUpdate, worldVotes, setWorldVotes }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const { fetchCountries, fetchRegions, fetchCities } = useFetchSort();
  const {
    setSortGeography,
    setCountryGeography,
    setCitiesGeography,
    setRegionsGeography,
  } = electionsActionCreators();
  const { countries, cities, regions } = useSelector((s: RootState) => s.votes[field]);

  const [postData, setPostData] = useState({
    country_idArray: null,
    region_idArray: null,
    city_idArray: null,
  });

  const clearValue = (key, setValue) => {
    setValue(key, []);
  };

  const getIdArray = (item) =>
    item.map((i) => {
      return { id: i.id };
    });

  const sendDataForSort = (func, key, value, sortFunc) => {
    func((prevState) => {
      const newState = {
        ...prevState,
        [key]: getIdArray(value).length ? getIdArray(value) : null,
      };
      sortFunc(newState);
      return newState;
    });
  };

  useEffect(() => {
    fetchCountries(field);
    if (field === 'geography') {
      if (postData.country_idArray && postData.country_idArray.length) {
        setWorld(false);
        fetchRegions(postData.country_idArray, field);
        if (postData.region_idArray && postData.region_idArray.length) {
          fetchCities(postData.region_idArray, field);
        } else {
          setCitiesGeography(null);
        }
      } else {
        setPostData((prevState) => {
          const newState = {
            ...prevState,
            country_idArray: null,
            region_idArray: null,
            city_idArray: null,
          };
          setSortGeography(newState);
          setRegionsGeography(null);
          setCitiesGeography(null);
          setWorld(true);
          return newState;
        });
      }
    }
    setUpdate(!update);
  }, [
    postData.country_idArray,
    postData.region_idArray,
    postData.city_idArray,
  ]);

  return (
    <Formik
      initialValues={{
        country: [],
        region: [],
        city: [],
      }}
      onSubmit={() => {
        setPostData(postData);
      }}
      enableReinitialize={true}
    >
      {(props) => {
        const { values, errors, handleChange, handleBlur, handleSubmit, handleReset, setFieldValue } = props;

        useEffect(() => {
          const newValueCity = [];
          const newValueRegion = [];
          if (values.country.length) {
            values.country.forEach((item) => {
              values.region.forEach((i) => {
                if (item.id === i.country_id) {
                  newValueRegion.push(i);
                }
              });
            });
          }
          if (values.country.length) {
            values.country.forEach((item) => {
              values.city.forEach((i) => {
                if (item.id === i.country_id) {
                  newValueCity.push(i);
                }
              });
            });
          }
          setFieldValue('region', newValueRegion);
          setFieldValue('city', newValueCity);
          sendDataForSort(
            field === 'geography' ? setPostData : setPostData,
            field === 'geography' ? 'region_idArray' : 'region_user_idArray',
            newValueRegion,
            field === 'geography' ? setSortGeography : setSortGeography
          );
          sendDataForSort(
            field === 'geography' ? setPostData : setPostData,
            field === 'geography' ? 'city_idArray' : 'city_user_idArray',
            newValueRegion,
            field === 'geography' ? setSortGeography : setSortGeography
          );
        }, [values.country]);

        useEffect(() => {
          const newValue = [];
          if (values.region.length) {
            values.region.forEach((item) => {
              values.city.forEach((i) => {
                if (item.id === i.region_id) {
                  newValue.push(i);
                }
              });
            });
          }
          setFieldValue('city', newValue);
          sendDataForSort(
            field === 'geography' ? setPostData : setPostData,
            field === 'geography' ? 'city_idArray' : 'city_user_idArray',
            newValue,
            field === 'geography' ? setSortGeography : setSortGeography
          );
        }, [values.region]);

        return (
          <div className={styles.mainTitle}>
            <form
              onSubmit={handleSubmit}
              style={{ width: '270px', marginRight: '15px' }}
              className={styles.mainForm}
              onReset={handleReset}
              noValidate
            >
              <div style={{ marginRight: '30px' }}>
                <InputLabel htmlFor="country" className={styles.inputLabel}>
                  {t('buttons.sort.countryFullTitle')}
                </InputLabel>
                <Autocomplete
                  value={values.country}
                  multiple
                  id="country"
                  options={countries ?? []}
                  style={{ width: '292px' }}
                  getOptionLabel={(option: any) => option?.title?.[currentLang] || option?.title?.ru || values.country}
                  isOptionEqualToValue={(option, value) => {
                    return option.title?.[currentLang] === value || option.title?.ru === value;
                  }}
                  noOptionsText={<>{t('info.noVariants')}</>}
                  onChange={(_, newValue) => {
                    if (newValue) {
                      setFieldValue('country', newValue);
                      if (field === 'geography') {
                        sendDataForSort(setPostData, 'country_idArray', newValue, setSortGeography);
                      }
                    }
                  }}
                  renderInput={(params) => (
                    <TextField {...params} type="text" onBlur={handleBlur} fullWidth helperText={errors.country} />
                  )}
                />
              </div>
              {regions ? (
                <div style={{ marginRight: '30px' }}>
                  <InputLabel htmlFor="region" className={styles.inputLabel}>
                    {t('buttons.sort.regionFullTitle')}
                  </InputLabel>
                  <Autocomplete
                    value={values.region}
                    multiple
                    id="region"
                    options={regions}
                    style={{ width: '292px' }}
                    getOptionLabel={(option: any) => option?.title?.[currentLang] || option?.title?.ru || values.region}
                    isOptionEqualToValue={(option, value) => {
                      return option.title?.[currentLang] === value || option.title?.ru === value;
                    }}
                    noOptionsText={<>{t('info.noVariants')}</>}
                    onChange={(_, newValue) => {
                      if (newValue) {
                        setFieldValue('region', newValue);
                        if (field === 'geography') {
                          sendDataForSort(setPostData, 'region_idArray', newValue, setSortGeography);
                        }
                        if (field === 'vote') {
                          // sendDataForSort(setPostData2, 'region_user_idArray', newValue, setSortVote);
                        }
                      }
                    }}
                    renderInput={(params) => (
                      <TextField {...params} type="text" onBlur={handleBlur} variant="outlined" fullWidth />
                    )}
                  />
                </div>
              ) : null}
              {cities ? (
                <div style={{ marginRight: '5px' }}>
                  <InputLabel htmlFor="city" className={styles.inputLabel}>
                    {t('buttons.sort.citiesFullTitle')}
                  </InputLabel>
                  <Autocomplete
                    value={values.city}
                    multiple
                    id="city"
                    options={cities}
                    style={{ width: '292px' }}
                    getOptionLabel={(option: any) => option?.title?.[currentLang] || option?.title?.ru || values.city}
                    isOptionEqualToValue={(option, value) => {
                      return option.title?.[currentLang] === value || option.title?.ru === value;
                    }}
                    noOptionsText={<>{t('info.noVariants')}</>}
                    onChange={(_, newValue) => {
                      if (newValue) {
                        setFieldValue('city', newValue);
                        if (field === 'geography') {
                          sendDataForSort(setPostData, 'city_idArray', newValue, setSortGeography);
                        }
                      }
                    }}
                    renderInput={(params) => (
                      <TextField {...params} type="text" onBlur={handleBlur} variant="outlined" fullWidth />
                    )}
                  />
                </div>
              ) : null}
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default SortDropdownVotes;
