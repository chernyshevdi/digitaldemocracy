import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { electionsAPIActions } from '../../../api/electionsAPI';
import {
  startFetch,
  successVoiceFetch,
  voiceFetch,
  failFetch
} from '../../../slices/electionsSlice';
import { getItem } from '../../../lib/localStorageManager';

export const useFetchVoiceDelete = () => {
  const { fetchVoiceDelete } = electionsAPIActions();
  const token = getItem('token');
  const dispatch = useDispatch();

  const fetch = useCallback(
    (type: string, objectId: number, electionId: number) => {
      dispatch(startFetch);
      fetchVoiceDelete({
        onSuccess: () => {
          dispatch(successVoiceFetch);
          dispatch(voiceFetch);
        },
        payload: {
          token,
          type,
          objectId,
          electionId,
        },
        onError: (errorResponse) => {
          dispatch(failFetch);
          console.log(errorResponse);
        },
      });
    },
    [token]
  );
  return { fetch };
};
