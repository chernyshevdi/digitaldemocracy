import React, { useState } from 'react';
import { userAPI } from 'src/api/userAPI';
import { APIStatus } from 'src/lib/axiosAPI';
import { userActionCreators } from 'src/slices/userSlice';
import { getItem } from '../../../../../lib/localStorageManager';

export const useFetchChoices = () => {
  const [status, setStatus] = useState(APIStatus.Initial);
  const { fetchChoices } = userAPI();
  const { setChoices } = userActionCreators();
  const token = getItem('token');
  const fetch = () => {
    setStatus(APIStatus.Loading);
    fetchChoices({
      onSuccess: (response) => {
        setChoices(response);
        setStatus(APIStatus.Success);
      },
      onError: (error) => {
        console.log('error', error);
        setStatus(APIStatus.Failure);
      },
      payload: {
        token,
      },
    });
  };
  return { fetch, status };
};
