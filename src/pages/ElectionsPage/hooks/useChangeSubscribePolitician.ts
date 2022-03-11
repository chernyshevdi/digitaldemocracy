import { useCallback, useState } from 'react';
import { APIStatus } from '../../../lib/axiosAPI';
import { politicianAPI } from '../../../api/politicianAPI';
import { getItem } from '../../../lib/localStorageManager';

export const useChangeSubscribePolitician = (id, button) => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const { subscribe, unsubscribe } = politicianAPI();
  const token = getItem('token');
  const api = button ? unsubscribe : subscribe;
  const change = useCallback(() => {
    setStatus(APIStatus.Loading);
    api({
      onError: () => {
        setStatus(APIStatus.Failure);
      },
      onSuccess: () => {
        setStatus(APIStatus.Success);
      },
      payload: {
        politician_id: Number(id),
        token,
      },
    });
  }, [button, token]);

  return { change, status };
};
