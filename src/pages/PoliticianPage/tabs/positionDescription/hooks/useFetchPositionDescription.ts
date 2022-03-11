import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { APIStatus } from '../../../../../lib/axiosAPI';
import { politicianActionCreators } from '../../../../../slices/politicianSlice';
import { politicianAPI } from '../../../../../api/politicianAPI';

export const useFetchPositionDescription = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const { setPositionsDescription } = politicianActionCreators();
  const { fetchPositionsDescription } = politicianAPI();
  const politicianId = useSelector((s: RootState) => s?.politician?.data?.id);

  const fetch = useCallback(() => {
    setStatus(APIStatus.Loading);
    fetchPositionsDescription({
      onError: () => setStatus(APIStatus.Failure),
      onSuccess: (response) => {
        setPositionsDescription(response);
        setStatus(APIStatus.Success);
      },
      payload: {
        politician_id: politicianId,
      },
    });
  }, [politicianId]);

  return { fetch, status };
};
