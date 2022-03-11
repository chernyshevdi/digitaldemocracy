import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { useParams } from 'react-router-dom';
import { APIStatus } from '../../../lib/axiosAPI';
import { votesAPI } from '../../../api/votesApi';
import { electionsActionCreators } from '../../../slices/votesPageSlice';
import { getItem } from '../../../lib/localStorageManager';

export const useFetchListElections = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const { fetchListElections } = votesAPI();
  const { setVotes } = electionsActionCreators();
  const token = getItem('token');
  const { sort_geography, sort_date } = useSelector((s: RootState) => s.votes);

  const { country_idArray, region_idArray, city_idArray } = sort_geography;
  const { date, isOnlyBefore } = sort_date;

  const fetch = useCallback((page = 1) => {
    setStatus(APIStatus.Loading);
    fetchListElections({
      onSuccess: (response) => {
        setVotes(response);
        setStatus(APIStatus.Success);
      },
      onError: () => setStatus(APIStatus.Failure),
      payload: {
        token,
        page,
        date,
        is_onlyBefore: isOnlyBefore,
        country_id: country_idArray,
        region_id: region_idArray,
        city_id: city_idArray,
      },
    });
  }, [token, date, isOnlyBefore, country_idArray, region_idArray, city_idArray]);
  return { fetch, status };
};
