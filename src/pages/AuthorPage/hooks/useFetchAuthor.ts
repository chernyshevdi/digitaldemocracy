import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { APIStatus } from '../../../lib/axiosAPI';
import { authorAPIActions } from '../../../api/authorAPI';
import { authorActionCreators } from '../../../slices/authorSlice';
import { getItem } from '../../../lib/localStorageManager';

export const useFetchAuthor = () => {
  const { fetchAuthorData, fetchAuthorNews } = authorAPIActions();
  const {
    startFetchAuthorData,
    successFetchAuthorData,
    failFetchAuthorData,
    startFetchAuthorNews,
    successFetchAuthorNews,
    failFetchAuthorNews,
  } = authorActionCreators();
  const { id } = useSelector((s: RootState) => s.author.data);
  const { sort_direction, sort_field, page } = useSelector((s: RootState) => s.author);
  const { link }: { link: string } = useParams();
  const token = getItem('token');
  const fetchData = useCallback(() => {
    startFetchAuthorData();
    fetchAuthorData({
      onSuccess: (response) => {
        successFetchAuthorData(response);
        console.log(response, 'response');
      },
      onError: (err) => {
        failFetchAuthorData();
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
    startFetchAuthorNews();
    fetchAuthorNews({
      onSuccess: (response) => {
        successFetchAuthorNews(response);
      },
      onError: (err) => {
        failFetchAuthorNews();
      },
      payload: {
        params: { orderBy: sort_direction, sortBy: sort_field, page, authorId: id },
      },
      variables: {
        token,
      },
    });
  }, [sort_direction, sort_field, page, id, token]);

  return { fetchData, fetchNews };
};
