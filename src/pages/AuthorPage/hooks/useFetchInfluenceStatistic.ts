import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { getItem } from 'src/lib/localStorageManager';
import { APIStatus } from '../../../lib/axiosAPI';
import { authorAPIActions } from '../../../api/authorAPI';
import { authorActionCreators } from '../../../slices/authorSlice';

export const useFetchInfluenceStatistic = () => {
  const { authorStatistic } = authorAPIActions();
  const { startFetchAuthorStatistic, successFetchAuthorStatistic, failFetchAuthorStatistic } = authorActionCreators();
  const { id } = useSelector((s: RootState) => s.author.data);
  const token = getItem('token');
  const fetchStatistic = useCallback(() => {
    startFetchAuthorStatistic();
    authorStatistic({
      onSuccess: (response) => {
        successFetchAuthorStatistic(response);
      },
      onError: (err) => {
        failFetchAuthorStatistic();
      },
      payload: {
        params: { author_id: id },
      },
      variables: {
        token,
      },
    });
  }, [id, token]);

  return { fetchStatistic };
};
