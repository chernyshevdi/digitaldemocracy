import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { getItem } from 'src/lib/localStorageManager';
import { APIStatus } from '../../../lib/axiosAPI';
import { massmediaAPIActions } from '../../../api/massmediaAPI';
import { massmediaActionCreators } from '../../../slices/massMediaSlice';

export const useFetchMassMedia = () => {
  const { fetchMassMediaData, fetchMassMediaNews } = massmediaAPIActions();
  const {
    startFetchMassMediaData,
    successFetchMassMediaData,
    failFetchMassMediaData,
    startFetchMassMediaNews,
    successFetchMassMediaNews,
    failFetchMassMediaNews,
  } = massmediaActionCreators();
  const { id } = useSelector((s: RootState) => s.massmedia.data);
  const { sort_direction, sort_field, page } = useSelector((s: RootState) => s.massmedia);
  const { link }: { link: string } = useParams();
  const token = getItem('token');
  const fetchData = useCallback(() => {
    startFetchMassMediaData();
    fetchMassMediaData({
      onSuccess: (response) => {
        successFetchMassMediaData(response);
      },
      onError: (err) => {
        failFetchMassMediaData();
      },
      payload: {
        link,
      },
      variables: {
        token,
      },
    });
  }, [link, token]);
  const fetchNews = useCallback(() => {
    startFetchMassMediaNews();
    fetchMassMediaNews({
      onSuccess: (response) => {
        successFetchMassMediaNews(response);
      },
      onError: (err) => {
        failFetchMassMediaNews();
      },
      payload: {
        params: { orderBy: sort_direction, sortBy: sort_field, page, mediaId: id },
      },
      variables: {
        token,
      },
    });
  }, [sort_direction, sort_field, page, id, token]);

  return { fetchData, fetchNews };
};
