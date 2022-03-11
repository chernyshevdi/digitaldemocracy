import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { getItem } from 'src/lib/localStorageManager';
import { APIStatus } from '../../../../../lib/axiosAPI';
import { massmediaAPIActions } from '../../../../../api/massmediaAPI';
import { massmediaActionCreators } from '../../../../../slices/massMediaSlice';

export const useFetchAdditionalInformation = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const { getAdditionalInformation } = massmediaAPIActions();
  const { setAdditionalInformation } = massmediaActionCreators();
  const token = getItem('token');
  const { data } = useSelector((s: RootState) => s?.massmedia);
  const mediaId = data.id;

  const fetch = useCallback(() => {
    setStatus(APIStatus.Loading);

    getAdditionalInformation({
      onError: () => setStatus(APIStatus.Failure),
      onSuccess: (response) => {
        setAdditionalInformation(response);
        setStatus(APIStatus.Success);
      },
      payload: {
        request_location: 'media', mediaId,
      },
    });
  }, [mediaId]);

  return { fetch, status };
};
