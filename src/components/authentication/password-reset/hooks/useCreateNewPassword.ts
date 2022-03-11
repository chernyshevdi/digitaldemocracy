import { useState } from 'react';
import { APIStatus } from '../../../../lib/axiosAPI';
import { authAPI } from '../../../../api/authAPI';
import { useSearchParams } from '../../../../hooks/useSearchParams';
import { ModalParams } from '../../../../types/routing';
import { setItem } from '../../../../lib/localStorageManager';
import { userActionCreators } from '../../../../slices/userSlice';

export const useCreateNewPassword = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const [error, setError] = useState<string>();
  const { resetPassword } = authAPI();
  const { setIsAuthenticated, setUser } = userActionCreators();

  const {
    email: { value: email },
    token: { value: token },
    [ModalParams.Auth]: { setValue: setAuthValue },
  } = useSearchParams('email', 'token', ModalParams.Auth);

  const create = (password: string, confirmPassword: string) => {
    setStatus(APIStatus.Loading);
    resetPassword({
      onError: (errorResponse) => {
        setStatus(APIStatus.Failure);
        setError(typeof errorResponse === 'string' ? errorResponse : errorResponse.password[0]);
      },
      onSuccess: (response) => {
        setItem('token', response.token);
        setIsAuthenticated(true);
        setUser(response.user);
        setStatus(APIStatus.Success);
        setAuthValue(undefined);
      },
      payload: {
        password,
        password_confirmation: confirmPassword,
        email,
        token
      }
    });
  };

  return { create, status, error };
};
