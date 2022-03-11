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

export const useFetchVoiceAdd = () => {
  const { fetchVoiceAdd } = electionsAPIActions();
  const token = getItem('token');
  const dispatch = useDispatch();

  const fetch = useCallback(
    (type: string, objectId: number, electionId: number) => {
      dispatch(startFetch);
      fetchVoiceAdd({
        onSuccess: (response) => {
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
