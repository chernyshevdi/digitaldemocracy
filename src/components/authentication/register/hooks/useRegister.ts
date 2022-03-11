import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { authAPI } from '../../../../api/authAPI';
import { authSelectors } from '../../../../slices/authSlice';
import { setItem } from '../../../../lib/localStorageManager';
import { APIStatus } from '../../../../lib/axiosAPI';
import { userActionCreators } from '../../../../slices/userSlice';

export const useRegister = (setRegisterStep: (value: number) => void) => {
  const { register } = authAPI();
  const userData = useSelector(authSelectors.getUserData());
  const { setUser, setIsAuthenticated } = userActionCreators();

  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const [passError, setPassError] = useState<string>();
  const [confPassError, setConfPassError] = useState<string>();

  const onSuccess = (response) => {
    setItem('token', response.token);
    setUser(response.user);
    setIsAuthenticated(true);
    setStatus(APIStatus.Success);
    setRegisterStep(5);
  };

  const onError = (errorResponse) => {
    if (errorResponse.password_confirmation) setConfPassError(errorResponse.password_confirmation[0]);
    if (errorResponse.password) setPassError(errorResponse.password[0]);
    setStatus(APIStatus.Failure);
  };

  const onRegister = useCallback((password: string, confirmPassword: string) => {
    setStatus(APIStatus.Loading);
    register({
      onSuccess,
      onError,
      payload: {
        ...userData,
        password,
        password_confirmation: confirmPassword,
        address: userData.address!,
        country_id: userData.countryId ? Number(userData.countryId) : undefined,
        code: userData.code!,
      }
    });
  }, []);

  return { onRegister, status, error: { passError, confPassError } };
};
