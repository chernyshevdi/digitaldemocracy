import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { getItem } from 'src/lib/localStorageManager';
import { APIStatus } from '../../../../../lib/axiosAPI';
import { politicianActionCreators } from '../../../../../slices/politicianSlice';
import { politicianAPI } from '../../../../../api/politicianAPI';

export const useFetchAdditionalInformation = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const token = getItem('token');
  const { setPoliticianAdditionalInformation } = politicianActionCreators();
  const { getAdditionalInformation } = politicianAPI();
  const politicianId = useSelector((s: RootState) => s?.politician?.data?.id);

  const fetch = useCallback(() => {
    setStatus(APIStatus.Loading);

    getAdditionalInformation({
      onError: () => setStatus(APIStatus.Failure),
      onSuccess: (response) => {
        setPoliticianAdditionalInformation(response);
        setStatus(APIStatus.Success);
      },
      payload: {
        request_location: 'politician', politicianId,
      },
    });
  }, [politicianId]);

  return { fetch, status };
};
