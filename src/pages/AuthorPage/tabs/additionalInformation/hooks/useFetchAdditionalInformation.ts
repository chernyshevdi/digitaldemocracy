import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { getItem } from 'src/lib/localStorageManager';
import { APIStatus } from '../../../../../lib/axiosAPI';
import { authorAPIActions } from '../../../../../api/authorAPI';
import { authorActionCreators } from '../../../../../slices/authorSlice';

export const useFetchAdditionalInformation = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const { getAdditionalInformation } = authorAPIActions();
  const { setAdditionalInformation } = authorActionCreators();
  const token = getItem('token');
  const { id } = useSelector((s: RootState) => s.author.data);
  const authorId = id;

  const fetch = useCallback(() => {
    setStatus(APIStatus.Loading);

    getAdditionalInformation({
      onError: () => setStatus(APIStatus.Failure),
      onSuccess: (response) => {
        setAdditionalInformation(response);
        setStatus(APIStatus.Success);
      },
      payload: {
        request_location: 'author', authorId,
      },
    });
  }, [id]);

  return { fetch, status };
};
