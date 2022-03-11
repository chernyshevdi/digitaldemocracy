import { APIStatus } from 'src/lib/axiosAPI';
import { useCallback, useState } from 'react';
import { suggestionAPI } from '../../../api/suggestionAPI';
import { getItem } from '../../../lib/localStorageManager';

export const useFetchSuggestion = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const { fetchSuggestion } = suggestionAPI();
  const token = getItem('token');
  const fetch = useCallback(
    (source_link, description, type) => {
      setStatus(APIStatus.Loading);
      return fetchSuggestion({
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
          source_link,
          description,
          token,
          type,
        },
      });
    },
    [token]
  );

  return { fetch, status };
};
