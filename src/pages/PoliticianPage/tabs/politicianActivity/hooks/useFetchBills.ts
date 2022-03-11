import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { getItem } from 'src/lib/localStorageManager';
import { APIStatus } from 'src/lib/axiosAPI';
import { politicianActionCreators } from 'src/slices/politicianSlice';
import { politicianAPI } from 'src/api/politicianAPI';

export const useFetchBills = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const token = getItem('token');
  const { setBills, startLike, successLike, failLike, startDislike, successDislike, failDislike } =
    politicianActionCreators();
  const { fetchBills, politicianBillLike, politicianBillDislike } = politicianAPI();
  const politicianId = useSelector((s: RootState) => s?.politician?.data?.id);

  const fetch = useCallback(() => {
    setStatus(APIStatus.Loading);
    fetchBills({
      onError: () => setStatus(APIStatus.Failure),
      onSuccess: (response) => {
        setBills(response);
        setStatus(APIStatus.Success);
      },
      payload: {
        politician_id: Number(politicianId),
      },
      variables: { token },
    });
  }, []);
  const setBillsLike = useCallback(({ index, id, isLiked, isDisliked }) => {
    const isItemLiked = isLiked;
    const isItemDisliked = isDisliked;
    startLike({ id, field: 'bills' });
    politicianBillLike({
      onSuccess: () => {
        if (isItemLiked) {
          successLike({ index, id, status: false, field: 'bills' });
        } else {
          successLike({ index, id, status: true, field: 'bills' });
          if (isItemDisliked) {
            successDislike({ index, id, status: false, field: 'bills' });
          }
        }
      },
      onError: () => {
        failLike({ id, field: 'bills' });
      },
      payload: {
        // politician_id: politicianId,
        // voting_place: 'bill',
        bill_id: id,
      },
      variables: {
        isItemLiked,
        token,
      },
    });
  }, []);

  const setBillsDislike = useCallback(({ index, id, isLiked, isDisliked }) => {
    const isItemLiked = isLiked;
    const isItemDisliked = isDisliked;
    startDislike({ id, field: 'bills' });
    politicianBillDislike({
      onSuccess: () => {
        if (isItemDisliked) {
          successDislike({ index, id, status: false, field: 'bills' });
        } else {
          successDislike({ index, id, status: true, field: 'bills' });
          if (isItemLiked) {
            successLike({ index, id, status: false, field: 'bills' });
          }
        }
      },
      onError: () => {
        failDislike({ id, field: 'bills' });
      },
      payload: {
        // politician_id: politicianId,
        // voting_place: 'bill',
        bill_id: id,
      },
      variables: {
        isItemDisliked,
        token,
      },
    });
  }, []);

  return { fetch, status, setBillsLike, setBillsDislike };
};
