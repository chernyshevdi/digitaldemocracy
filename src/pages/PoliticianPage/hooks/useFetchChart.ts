import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/index';
import { APIStatus } from '../../../lib/axiosAPI';
import { politicianAPI } from '../../../api/politicianAPI';
import { politicianActionCreators } from '../../../slices/politicianSlice';
import { getItem } from '../../../lib/localStorageManager';

export const useFetchChart = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const { getGraphPoliticianRatingChange } = politicianAPI();
  const { setChartData } = politicianActionCreators();
  const politician_id = useSelector((s: RootState) => s?.politician?.data?.id);

  const fetch = useCallback(() => {
    setStatus(APIStatus.Loading);
    getGraphPoliticianRatingChange({
      onSuccess: (response) => {
        setChartData(response);
        setStatus(APIStatus.Success);
      },
      onError: () => setStatus(APIStatus.Failure),
      payload: {
        params: {
          politician_id,
        },
      },
    });
  }, [politician_id]);

  return { fetch, status };
};
