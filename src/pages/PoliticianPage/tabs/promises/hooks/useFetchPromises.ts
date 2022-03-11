import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { getItem } from 'src/lib/localStorageManager';
import { APIStatus } from '../../../../../lib/axiosAPI';
import { politicianActionCreators } from '../../../../../slices/politicianSlice';
import { politicianAPI } from '../../../../../api/politicianAPI';

export const useFetchPromises = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const token = getItem('token');
  const { setPromises, startLike, successLike, failLike, startDislike, successDislike, failDislike } =
    politicianActionCreators();
  const { fetchPromises, politicianLike, politicianDislike } = politicianAPI();
  const politicianId = useSelector((s: RootState) => s?.politician?.data?.id);
  const fetch = useCallback(() => {
    setStatus(APIStatus.Loading);
    fetchPromises({
      onError: () => setStatus(APIStatus.Failure),
      onSuccess: (response) => {
        setPromises(response);
        setStatus(APIStatus.Success);
      },
      payload: {
        politician_id: Number(politicianId),
      },
      variables: {
        token,
      },
    });
  }, [politicianId, token]);
  const setPromisesLike = useCallback(({ index, id, isLiked, isDisliked }) => {
    const isItemLiked = isLiked;
    const isItemDisliked = isDisliked;
    startLike({ id, field: 'promises' });
    politicianLike({
      onSuccess: () => {
        if (isItemLiked) {
          successLike({ index, id, status: false, field: 'promises' });
        } else {
          successLike({ index, id, status: true, field: 'promises' });
          if (isItemDisliked) {
            successDislike({ index, id, status: false, field: 'promises' });
          }
        }
      },
      onError: () => {
        failLike({ id, field: 'promises' });
      },
      payload: {
        politician_id: politicianId,
        voting_place: 'politician_promise',
        politician_promise_id: id,
      },
      variables: {
        isItemLiked,
        token,
      },
    });
  }, []);

  const setPromisesDislike = useCallback(({ index, id, isLiked, isDisliked }) => {
    const isItemLiked = isLiked;
    const isItemDisliked = isDisliked;
    startDislike({ id, field: 'promises' });
    politicianDislike({
      onSuccess: () => {
        if (isItemDisliked) {
          successDislike({ index, id, status: false, field: 'promises' });
        } else {
          successDislike({ index, id, status: true, field: 'promises' });
          if (isItemLiked) {
            successLike({ index, id, status: false, field: 'promises' });
          }
        }
      },
      onError: () => {
        failDislike({ id, field: 'promises' });
      },
      payload: {
        politician_id: politicianId,
        voting_place: 'politician_promise',
        politician_promise_id: id,
      },
      variables: {
        isItemDisliked,
        token,
      },
    });
  }, []);

  return { fetch, status, setPromisesLike, setPromisesDislike };
};
