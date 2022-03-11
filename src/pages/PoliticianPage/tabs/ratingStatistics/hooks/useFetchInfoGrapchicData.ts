import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { politicianAPI } from 'src/api/politicianAPI';
import { APIStatus } from 'src/lib/axiosAPI';
import { politicianActionCreators } from '../../../../../slices/politicianSlice';

export const useFetchInfoGrapchicData = () => {
  const [statusCountries, setStatusCountries] = useState<APIStatus>(APIStatus.Initial);
  const [statusRegions, setStatusRegions] = useState<APIStatus>(APIStatus.Initial);
  const [statusCities, setStatusCities] = useState<APIStatus>(APIStatus.Initial);
  const [statusGrapchic, setStatusGraphic] = useState<APIStatus>(APIStatus.Initial);
  const { fetchCountries, fetchRegions, fetchCities, getPoliticianCustomRating } = politicianAPI();
  const { setCountries, setCities, setRegions, setRating, setVotesGroup, setElectorate } = politicianActionCreators();

  const fetchCountry = useCallback(() => {
    setStatusCountries(APIStatus.Loading);
    fetchCountries({
      onError: () => setStatusCountries(APIStatus.Failure),
      onSuccess: (response) => {
        setCountries(response);
        setStatusCountries(APIStatus.Success);
      },
    });
  }, []);

  const fetchRegion = useCallback((array) => {
    setStatusRegions(APIStatus.Loading);
    fetchRegions({
      onError: () => setStatusRegions(APIStatus.Failure),
      onSuccess: (response) => {
        setRegions(response);
        setStatusRegions(APIStatus.Success);
      },
      payload: {
        countries: array,
      },
    });
  }, []);

  const fetchCity = useCallback((array) => {
    setStatusCities(APIStatus.Loading);
    fetchCities({
      onError: () => setStatusCities(APIStatus.Failure),
      onSuccess: (response) => {
        setCities(response);
        setStatusCities(APIStatus.Success);
      },
      payload: {
        regions: array,
      },
    });
  }, []);

  const fetchGraphic = useCallback((politician_id, obj, is_votes_world) => {
    const { country, region, city } = obj;
    setStatusGraphic(APIStatus.Loading);
    getPoliticianCustomRating({
      onError: () => setStatusGraphic(APIStatus.Failure),
      onSuccess: (response) => {
        setElectorate(response?.electorate);
        setRating(response?.rating);
        setVotesGroup(response?.vote_groups);
        setStatusGraphic(APIStatus.Success);
      },
      payload: {
        politician_id,
        countries: country,
        regions: region,
        cities: city,
        // params: {
        //   is_votes_world: is_votes_world || null
        // }
      },
    });
  }, []);

  return {
    fetchCountry,
    fetchRegion,
    fetchCity,
    fetchGraphic,
    statusCountries,
    statusRegions,
    statusCities,
    statusGrapchic,
  };
};
