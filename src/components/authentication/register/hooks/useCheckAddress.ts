import { useCallback, useState } from 'react';
import { APIStatus } from '../../../../lib/axiosAPI';
import { authAPI } from '../../../../api/authAPI';
import { authActionCreators } from '../../../../slices/authSlice';

export const useCheckAddress = (setRegisterStep: (value: number) => void) => {
  const { setAuthUserData } = authActionCreators();
  const check = useCallback(
    ({ country_title, region_title, city_title, countries, regions, cities, withCountry, withRegion, withCity }) => {
      if (withCountry) {
        setRegisterStep(2);
        setAuthUserData({
          key: 'country_id',
          value: countries.find((it) => it?.title?.toLowerCase() === country_title?.toLowerCase()).id,
        });
        if (withRegion) {
          setAuthUserData({
            key: 'region_id',
            value: regions.find((it) => it?.title?.toLowerCase() === region_title?.toLowerCase()).id,
          });
        }
        if (withCity) {
          setAuthUserData({
            key: 'city_id',
            value: cities.find((it) => it?.title?.toLowerCase() === city_title?.toLowerCase()).id,
          });
        }
      }
    },
    []
  );

  return {
    check,
  };
};
