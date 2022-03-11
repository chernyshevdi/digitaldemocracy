import { useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RootState } from 'src/store';
import { massmediaActionCreators } from 'src/slices/massMediaSlice';
import { APIStatus } from 'src/lib/axiosAPI';
import { massmediaAPIActions } from 'src/api/massmediaAPI';
import { getItem } from 'src/lib/localStorageManager';

export const useChangeSubscribe = () => {
  const isSubscribed = useSelector((s: RootState) => s?.massmedia?.data?.is_subscribed);
  const { data } = useSelector((s: RootState) => s?.massmedia);
  const { startMassmediaSubscribe, successMassmediaSubscribe, failMassmediaSubscribe, successMassmediaUnsubscribe } =
    massmediaActionCreators();
  const { massmediaSubscribe } = massmediaAPIActions();
  const token = getItem('token');
  const setMassMediaSubscribe = useCallback(() => {
    startMassmediaSubscribe();
    massmediaSubscribe({
      onSuccess: () => {
        if (isSubscribed) {
          successMassmediaUnsubscribe();
        } else {
          successMassmediaSubscribe();
        }
      },
      onError: () => {
        failMassmediaSubscribe();
      },
      payload: {
        media_id: data?.id,
      },
      variables: {
        isSubscribed,
        token,
      },
    });
  }, [isSubscribed, token]);

  return { setMassMediaSubscribe };
};
