import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { getItem } from 'src/lib/localStorageManager';
import { APIStatus } from '../../../lib/axiosAPI';
import { massmediaAPIActions } from '../../../api/massmediaAPI';
import { massmediaActionCreators } from '../../../slices/massMediaSlice';

export const useFetchInfluenceStatistic = () => {
  const { massmediaStatistic } = massmediaAPIActions();
  const { startFetchMassMediaStatistic, successFetchMassMediaStatistic, failFetchMassMediaStatistic } =
    massmediaActionCreators();
  const { id } = useSelector((s: RootState) => s.massmedia.data);
  const token = getItem('token');
  const fetchStatistic = useCallback(() => {
    startFetchMassMediaStatistic();
    massmediaStatistic({
      onSuccess: (response) => {
        successFetchMassMediaStatistic(response);
      },
      onError: (err) => {
        failFetchMassMediaStatistic();
      },
      payload: {
        params: { media_id: id },
      },
      variables: {
        token,
      },
    });
  }, [id, token]);

  return { fetchStatistic };
};
