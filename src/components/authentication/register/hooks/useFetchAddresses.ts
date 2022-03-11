import { useCallback, useState } from 'react';
import { APIStatus } from 'src/lib/axiosAPI';
// import { dadataConfig } from '../../../../config';
import { authAPI } from '../../../../api/authAPI';

export const useFetchAddresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [regionStatus, setRegionStatus] = useState(APIStatus.Initial);
  const [cityStatus, setCityStatus] = useState(APIStatus.Initial);

  const { getCountries, getRegions, getCities } = authAPI();

  // const fetchAddresses = (query: string) => {
  //   const options = {
  //     method: 'POST',
  //     mode: 'cors' as RequestMode,
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //       Authorization: `Token ${dadataConfig.apiKey}`,
  //     },
  //     body: JSON.stringify({ query }),
  //   };
  //
  //   fetch(dadataConfig.getAddresses, options)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       setAddresses(result.suggestions.map((item) => item.value));
  //     })
  //     .catch((error) => console.log('error', error));
  // };

  const fetchCounties = useCallback(() => {
    getCountries({
      onSuccess: (response) => {
        setCountries(response);
        setRegions([]);
      },

      onError: (errorResponse) => console.log(errorResponse),
    });
  }, []);

  const fetchRegions = useCallback((id) => {
    setRegionStatus(APIStatus.Loading);
    getRegions({
      onSuccess: (response) => {
        setRegionStatus(APIStatus.Success);
        setRegions(response);
        setCities([]);
      },
      onError: (errorResponse) => {
        setRegionStatus(APIStatus.Failure);
        console.log(errorResponse);
      },
      variables: {
        params: {
          country_id: id,
        },
      },
    });
  }, []);

  const fetchCities = useCallback((id) => {
    setCityStatus(APIStatus.Loading);
    getCities({
      onSuccess: (response) => {
        setCityStatus(APIStatus.Success);
        setCities(response);
      },
      onError: (errorResponse) => {
        setCityStatus(APIStatus.Failure);
        console.log(errorResponse);
      },
      variables: {
        params: {
          region_id: id,
        },
      },
    });
  }, []);

  return {
    // fetchAddresses,
    fetchCounties,
    fetchRegions,
    fetchCities,
    addresses,
    countries,
    regions,
    regionStatus,
    cities,
    cityStatus,
  };
};
