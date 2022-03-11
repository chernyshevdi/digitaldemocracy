import { useState, useCallback } from 'react';
import { profileAPI } from 'src/api/profileAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { getItem } from '../../../lib/localStorageManager';

export const useFetchAvatar = () => {
  const { editUserAvatar } = profileAPI();
  const [statusAvatar, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const token = getItem('token');

  const fetchAvatar = (avatar) => {
    const FORM = new FormData();
    FORM.append('avatar', avatar);
    setStatus(APIStatus.Loading);
    editUserAvatar({
      onSuccess: (response) => {
        setStatus(APIStatus.Success);
      },
      onError: (errorResponse) => {
        setStatus(APIStatus.Failure);
      },
      // payload: {
      //   data: FORM,
      //   token,
      // },
      payload: FORM,
      token,
    });
  };

  return {
    fetchAvatar,
    statusAvatar,
  };
};
