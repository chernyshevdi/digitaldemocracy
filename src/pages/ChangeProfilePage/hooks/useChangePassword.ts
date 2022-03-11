import { useState, useCallback } from 'react';
import { profileAPI } from 'src/api/profileAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { getItem } from '../../../lib/localStorageManager';

export const useChangePassword = () => {
  const [statusCheckPassword, setStatusCheckPassword] = useState<APIStatus>(APIStatus.Initial);
  const [statusPasswordMessage, setStatusPasswordMessage] = useState('');
  const token = getItem('token');
  const { attachEmailSetPassword } = profileAPI();

  const fetchSetNewPassword = (password, old_password) => {
    setStatusCheckPassword(APIStatus.Loading);
    attachEmailSetPassword({
      onSuccess: (response) => {
        setStatusCheckPassword(APIStatus.Success);
      },
      onError: (errorResponse) => {
        setStatusCheckPassword(APIStatus.Failure);
        if (errorResponse?.old_password) {
          setStatusPasswordMessage('Неверный старый пароль или новый пароль соотвествует старому!');
        } else if (typeof errorResponse === 'string') {
          setStatusPasswordMessage('Неверный старый пароль или новый пароль соотвествует старому!');
        }
      },
      payload: {
        params: {
          change_place: 'changePassword',
          password,
          old_password,
        },
        token,
      },
    });
  };

  return {
    fetchSetNewPassword,
    statusCheckPassword,
    statusPasswordMessage,
  };
};
