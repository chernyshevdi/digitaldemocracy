import { useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import { RootState } from 'src/store';
import { useParams } from 'react-router-dom';
import { ratingActionCreators } from '../../../slices/ratingSlice';
import { APIStatus } from '../../../lib/axiosAPI';
import { politicianAPI } from '../../../api/politicianAPI';
import { getItem } from '../../../lib/localStorageManager';

export const useChangeSubscribePolitician = (id) => {
  const { setIsSubscribePoliticians } = ratingActionCreators();
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const { subscribe, unsubscribe } = politicianAPI();
  const { politicians } = useSelector((s: RootState) => s.rating?.politicians);
  const isSubscribe = politicians?.filter((item) => item.id === id)[0]?.is_subscribed;
  const token = getItem('token');
  const api = isSubscribe ? unsubscribe : subscribe;

  const change = useCallback(() => {
    setStatus(APIStatus.Loading);
    api({
      onError: () => {
        setStatus(APIStatus.Failure);
      },
      onSuccess: () => {
        setIsSubscribePoliticians({ id, isSubscribe });
        setStatus(APIStatus.Success);
      },
      payload: {
        politician_id: Number(id),
        token,
      },
    });
  }, [isSubscribe, token]);

  return { change, status };
};
