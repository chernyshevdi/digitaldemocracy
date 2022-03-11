import { useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RootState } from 'src/store';
import { authorActionCreators, authorSelectors } from 'src/slices/authorSlice';
import { APIStatus } from 'src/lib/axiosAPI';
import { authorAPIActions } from 'src/api/authorAPI';
import { getItem } from 'src/lib/localStorageManager';

export const useChangeSubscribe = () => {
  const isSubscribed = useSelector((s: RootState) => s?.author?.data?.is_subscribed);
  const { data } = useSelector((s: RootState) => s?.author);
  const { startAuthorSubscribe, successAuthorSubscribe, failAuthorSubscribe, successAuthorUnsubscribe } =
    authorActionCreators();
  const { authorSubscribe } = authorAPIActions();
  const token = getItem('token');
  const setAuthorSubscribe = useCallback(() => {
    startAuthorSubscribe();
    authorSubscribe({
      onSuccess: () => {
        if (isSubscribed) {
          successAuthorUnsubscribe();
        } else {
          successAuthorSubscribe();
        }
      },
      onError: () => {
        failAuthorSubscribe();
      },
      payload: {
        author_id: data?.id,
      },
      variables: {
        isSubscribed,
        token,
      },
    });
  }, [isSubscribed, token]);

  return { setAuthorSubscribe };
};
