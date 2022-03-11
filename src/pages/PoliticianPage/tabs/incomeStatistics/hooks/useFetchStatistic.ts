import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { getItem } from 'src/lib/localStorageManager';
import { APIStatus } from 'src/lib/axiosAPI';
import { politicianActionCreators } from 'src/slices/politicianSlice';
import { politicianAPI } from 'src/api/politicianAPI';

export const useFetchStatistic = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const token = getItem('token');
  const { setStatistic, startLike, successLike, failLike, startDislike, successDislike, failDislike } =
    politicianActionCreators();
  const { fetchStatistic, politicianLike, politicianDislike } = politicianAPI();
  const politicianId = useSelector((s: RootState) => s?.politician?.data?.id);

  const fetch = useCallback(() => {
    setStatus(APIStatus.Loading);
    fetchStatistic({
      onError: () => setStatus(APIStatus.Failure),
      onSuccess: (response) => {
        setStatistic(response);
        setStatus(APIStatus.Success);
      },
      payload: {
        politician_id: Number(politicianId),
      },
      variables: {
        token,
      },
    });
  }, []);

  const setIncomeLike = useCallback(({ index, id, isLiked, isDisliked }) => {
    const isItemLiked = isLiked;
    const isItemDisliked = isDisliked;
    startLike({ id, field: 'statistic' });
    politicianLike({
      onSuccess: () => {
        if (isItemLiked) {
          successLike({ index, id, status: false, field: 'statistic' });
        } else {
          successLike({ index, id, status: true, field: 'statistic' });
          if (isItemDisliked) {
            successDislike({ index, id, status: false, field: 'statistic' });
          }
        }
      },
      onError: () => {
        failLike({ id, field: 'statistic' });
      },
      payload: {
        politician_id: politicianId,
        voting_place: 'profit',
      },
      variables: {
        isItemLiked,
        token,
      },
    });
  }, []);

  const setIncomeDislike = useCallback(({ index, id, isLiked, isDisliked }) => {
    const isItemLiked = isLiked;
    const isItemDisliked = isDisliked;
    startDislike({ id, field: 'statistic' });
    politicianDislike({
      onSuccess: () => {
        if (isItemDisliked) {
          successDislike({ index, id, status: false, field: 'statistic' });
        } else {
          successDislike({ index, id, status: true, field: 'statistic' });
          if (isItemLiked) {
            successLike({ index, id, status: false, field: 'statistic' });
          }
        }
      },
      onError: () => {
        failDislike({ id, field: 'statistic' });
      },
      payload: {
        politician_id: politicianId,
        voting_place: 'profit',
      },
      variables: {
        isItemDisliked,
        token,
      },
    });
  }, []);
  return { fetch, status, setIncomeLike, setIncomeDislike };
};
