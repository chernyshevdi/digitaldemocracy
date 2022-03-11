import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { useParams } from 'react-router-dom';
import { APIStatus } from '../../../lib/axiosAPI';
import { votesAPI } from '../../../api/votesApi';
import { electionsActionCreators } from '../../../slices/votesPageSlice';
import { getItem } from '../../../lib/localStorageManager';

export const useFetchUserElections = () => {
  const [statusElections, setStatusElections] = useState<APIStatus>(APIStatus.Initial);
  const { fetchUserElections } = votesAPI();
  const { setVotes } = electionsActionCreators();
  const { setUserElections } = electionsActionCreators();
  const token = getItem('token');

    const { sort_geography, sort_date } = useSelector((s: RootState) => s.votes);

    const { country_idArray, region_idArray, city_idArray } = sort_geography;
    const { date, isOnlyBefore } = sort_date;
    const fetchElections = useCallback(() => {
    setStatusElections(APIStatus.Loading);
    fetchUserElections({
      onSuccess: (response) => {
        setUserElections(response);
        setStatusElections(APIStatus.Success);
      },
      onError: () => setStatusElections(APIStatus.Failure),
      payload: {
        token,
        date,
        is_onlyBefore: isOnlyBefore,
        country_id: country_idArray,
        region_id: region_idArray,
        city_id: city_idArray,
      },
    });
  }, [token, date, isOnlyBefore, country_idArray, region_idArray, city_idArray]);
  return { fetchElections, statusElections };
};
