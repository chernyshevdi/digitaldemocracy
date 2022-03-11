import { useState, useCallback } from 'react';
import { profileAPI } from 'src/api/profileAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { getItem } from '../../../lib/localStorageManager';
import { profileActionCreators } from '../../../slices/profileSlice';

export const useFetchProfileInfo = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const [statusRegion, setStatusRegion] = useState<APIStatus>(APIStatus.Initial);
  const [statusCity, setStatusCity] = useState<APIStatus>(APIStatus.Initial);
  const [statusPOST, setStatusPOST] = useState<APIStatus>(APIStatus.Initial);
  const token = getItem('token');
  const {
    fetchProfile,
    fetchCountries,
    fetchEducations,
    fetchGenders,
    fetchPoliticalViews,
    fetchReligions,
    fetchCities,
    fetchRegions,
    fetchEditData,
  } = profileAPI();
  const {
    setProfileInfo,
    setCountry,
    setEducation,
    setGender,
    setPoliticianViews,
    setReligion,
    setCities,
    setRegions,
  } = profileActionCreators();

  const fetch = useCallback(() => {
    setStatus(APIStatus.Loading);
    fetchProfile({
      onSuccess: (response) => {
        setProfileInfo(response);
        setStatus(APIStatus.Success);
      },
      onError: (errorResponse) => {
        console.log(errorResponse);
        setStatus(APIStatus.Failure);
      },
      payload: {
        token,
      },
    });
  }, [token]);

  const fetchGenderData = useCallback(() => {
    fetchGenders({
      onSuccess: (response) => {
        setGender(response);
      },
      onError: (errorResponse) => {
        console.log(errorResponse);
      },
    });
  }, []);

  const fetchEducationData = useCallback(() => {
    fetchEducations({
      onSuccess: (response) => {
        setEducation(response);
      },
      onError: (errorResponse) => {
        console.log(errorResponse);
      },
    });
  }, []);

  const fetchCountryData = useCallback(() => {
    fetchCountries({
      onSuccess: (response) => {
        setCountry(response);
      },
      onError: (errorResponse) => {
        console.log(errorResponse);
      },
    });
  }, []);

  const fetchPoliticalViewData = useCallback(() => {
    fetchPoliticalViews({
      onSuccess: (response) => {
        setPoliticianViews(response);
      },
      onError: (errorResponse) => {
        console.log(errorResponse);
      },
    });
  }, []);

  const fetchReligionData = useCallback(() => {
    fetchReligions({
      onSuccess: (response) => {
        setReligion(response);
      },
      onError: (errorResponse) => {
        console.log(errorResponse);
      },
    });
  }, []);

  const fetchRegionData = useCallback((id) => {
    setStatusRegion(APIStatus.Loading);
    return fetchRegions({
      onSuccess: (response) => {
        setRegions(response);
        setStatusRegion(APIStatus.Success);
      },
      onError: (errorResponse) => {
        setStatusRegion(APIStatus.Failure);
        console.log(errorResponse);
      },
      payload: {
        params: {
          country_id: id,
        },
      },
    });
  }, []);

  const fetchCityData = useCallback((id) => {
    setStatusCity(APIStatus.Loading);
    fetchCities({
      onSuccess: (response) => {
        setCities(response);
        setStatusCity(APIStatus.Success);
      },
      onError: (errorResponse) => {
        console.log(errorResponse);
        setStatusCity(APIStatus.Failure);
      },
      payload: {
        params: {
          region_id: id,
        },
      },
    });
  }, []);

  const sendEditData = (obj, name, lastname, day) => {
    const { gender, country, region, city, religion, education, political_views } = obj;
    setStatusPOST(APIStatus.Loading);
    fetchEditData({
      onSuccess: (response) => {
        setStatusPOST(APIStatus.Success);
      },
      onError: (errorResponse) => {
        setStatusPOST(APIStatus.Failure);
      },
      payload: {
        params: {
          country_id: country,
          region_id: region,
          city_id: city,
          gender_id: gender,
          religion_id: religion,
          education_id: education,
          political_view_id: political_views,
          last_name: lastname,
          first_name: name,
          birth_date: day,
        },
        token,
      },
    });
  };

  return {
    fetch,
    fetchCountryData,
    fetchEducationData,
    fetchGenderData,
    fetchPoliticalViewData,
    fetchReligionData,
    fetchRegionData,
    fetchCityData,
    sendEditData,
    statusCity,
    statusRegion,
    statusPOST,
    status,
  };
};
