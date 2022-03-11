import { useCallback, useState, useEffect } from 'react';
import { langAPI } from '../api/langAPI';
import { langAPIActionCreators } from '../slices/langSlice';
import { APIStatus } from '../lib/axiosAPI';

export const useLangData = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const { fetchLang } = langAPI();
  const { setLang } = langAPIActionCreators();

  const fetch = useCallback(() => {
    setStatus(APIStatus.Loading);
    return fetchLang({
      onError: (errorResponse) => {
        console.log(errorResponse);
        setStatus(APIStatus.Failure);
      },
      onSuccess: (response) => {
        setLang(response);
        setStatus(APIStatus.Success);
      },
    });
  }, []);

  return { fetch, status };
};
