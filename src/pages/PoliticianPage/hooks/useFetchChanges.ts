import { APIStatus } from 'src/lib/axiosAPI';
import { useCallback, useState } from 'react';
import { politicianAPI } from '../../../api/politicianAPI';
import { getItem } from '../../../lib/localStorageManager';

export const useFetchChanges = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const { fetchPoliticianChanges } = politicianAPI();
  const token = getItem('token');
  const fetch = useCallback(
    (description, source_url) => {
      setStatus(APIStatus.Loading);
      return fetchPoliticianChanges({
        onError: () => {
          setStatus(APIStatus.Failure);
          setTimeout(() => {
            setStatus(APIStatus.Initial);
          }, 2000);
        },
        onSuccess: (response) => {
          setStatus(APIStatus.Success);
          setTimeout(() => {
            setStatus(APIStatus.Initial);
          }, 2000);
        },
        payload: {
          source_url,
          description,
          token,
        },
      });
    },
    [token]
  );

  return { fetch, status };
};
