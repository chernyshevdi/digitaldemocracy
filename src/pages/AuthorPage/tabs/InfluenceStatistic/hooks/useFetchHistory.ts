import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { APIStatus } from '../../../../../lib/axiosAPI';
import { politicianAPI } from '../../../../../api/politicianAPI';
import { politicianActionCreators } from '../../../../../slices/politicianSlice';

export const useFetchHistory = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const { fetchPositionHistory } = politicianAPI();
  const { setHistory } = politicianActionCreators();
  const { politicianId }: { politicianId: string } = useParams();

  const fetch = useCallback(() => {
    setStatus(APIStatus.Loading);
    fetchPositionHistory({
      onSuccess: (response) => {
        setHistory(response);
        setStatus(APIStatus.Success);
      },
      onError: () => {
        setStatus(APIStatus.Failure);
      },
      payload: {
        politician_id: Number(politicianId)
      }
    });
  }, []);

  return { fetch, status };
};
