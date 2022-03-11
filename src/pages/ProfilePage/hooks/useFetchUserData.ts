import { useState } from 'react';
import { APIStatus } from '../../../lib/axiosAPI';
import { getItem } from '../../../lib/localStorageManager';
import { userAPI } from '../../../api/userAPI';
import { userActionCreators } from '../../../slices/userSlice';

export const useFetchUserData = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const { fetchUserData } = userAPI();
  const { setUser } = userActionCreators();
  const token = getItem('token');
  const fetch = () => {
    setStatus(APIStatus.Loading);
    fetchUserData({
      payload: {
        token,
      },
      onError: (errorResponse) => {
        console.log(errorResponse);
        setStatus(APIStatus.Failure);
      },
      onSuccess: (response) => {
        setUser(response);
        setStatus(APIStatus.Success);
      }
    });
  };

  return { fetch, status };
};
