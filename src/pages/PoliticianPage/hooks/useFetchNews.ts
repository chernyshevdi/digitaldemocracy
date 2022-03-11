import { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getItem } from 'src/lib/localStorageManager';
import { RootState } from 'src/store';
import { politicianAPI } from '../../../api/politicianAPI';
import { politicianActionCreators } from '../../../slices/politicianSlice';
import { APIStatus } from '../../../lib/axiosAPI';

export const useFetchNews = () => {
  const { fetchNews } = politicianAPI();
  const { setNews, setMorePage } = politicianActionCreators();
  const politician_id = useSelector((s: RootState) => s?.politician?.data?.id);
  const { start_date, end_date, page } = useSelector((s: RootState) => s.politician.news);
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const [error, setError] = useState<string>();
  const { short_link }: { short_link: string } = useParams();
  const token = getItem('token');
  const startMIN = Math.floor(946674000);
  const startMAX = Math.floor(32503669200);
  const fetch = useCallback(() => {
    setStatus(APIStatus.Loading);
    fetchNews({
      onSuccess: (response) => {
        setNews(response);
        setStatus(APIStatus.Success);
      },
      onError: (errorResponse) => {
        setError(errorResponse);
        setStatus(APIStatus.Failure);
      },
      variables: {
        token,
        politician_id,
        start_date: start_date || startMIN,
        end_date: end_date || startMAX,
        page,
      },
    });
  }, [politician_id, token, start_date, end_date, page]);

  return { fetch, error, status };
};
