import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { useParams } from 'react-router-dom';
import { APIStatus } from '../../../lib/axiosAPI';
import { ratingAPI } from '../../../api/ratingAPI';
import { ratingActionCreators } from '../../../slices/ratingSlice';

export const useFetchParties = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const { fetchRatingParties } = ratingAPI();
  const { setParties, addParties } = ratingActionCreators();
  const { sort_direction, sort_field } = useSelector((s: RootState) => s.rating);

  const fetch = useCallback((page = 1) => {
    setStatus(APIStatus.Loading);
    fetchRatingParties({
      onSuccess: (response) => {
        if (page > 1) {
          addParties(response);
        } else {
          setParties(response);
        }
        setStatus(APIStatus.Success);
      },
      onError: () => setStatus(APIStatus.Failure),
      payload: {
        params: {
          page,
          orderBy: sort_direction,
          sortBy: sort_field,
        },
      },
    });
  }, [sort_direction, sort_field]);

  return { fetch, status };
};
