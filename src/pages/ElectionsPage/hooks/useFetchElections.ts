import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { electionsAPIActions } from '../../../api/electionsAPI';
import { electionsActionCreators } from '../../../slices/electionsSlice';
import { getItem } from '../../../lib/localStorageManager';

export const useFetchElections = () => {
  const { setData, failFetch, startFetch } = electionsActionCreators();
  const { fetchElections } = electionsAPIActions();
  const token = getItem('token');
  const { link } = useParams() as any;

  const fetch = useCallback((linkTo: string) => {
    startFetch();
    fetchElections({
      onSuccess: (response) => {
        setData(response);
      },
      payload: {
        token,
        link: linkTo || link,
      },
      onError: (errorResponse) => {
        failFetch();
        console.log(errorResponse);
      },
    });
  }, [token]);
  return { fetch };
};
