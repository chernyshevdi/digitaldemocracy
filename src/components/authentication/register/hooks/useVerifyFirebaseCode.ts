import { useState } from 'react';
import { useSelector } from 'react-redux';
import { authAPI } from '../../../../api/authAPI';
import { authSelectors } from '../../../../slices/authSlice';
import { setItem } from '../../../../lib/localStorageManager';
import { userActionCreators } from '../../../../slices/userSlice';
import { APIStatus } from '../../../../lib/axiosAPI';

export const useVerifyFirebaseCode = (setRegisterStep: (value: number) => void) => {
  const [error, setError] = useState('');
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const { phone } = useSelector(authSelectors.getUserData());
  const { registerViaPhone } = authAPI();
  const { setUser, setIsAuthenticated } = userActionCreators();

  const verify = (verificationCode: string) => {
    setStatus(APIStatus.Loading);
    window.confirmationResult.confirm(verificationCode).then((result) => {
      registerViaPhone({
        onSuccess: (response) => {
          setItem('token', response.token);
          setUser(response.user);
          setIsAuthenticated(true);
          setRegisterStep(5);
          setStatus(APIStatus.Success);
        },
        onError: (errorResponse) => {
          if (typeof errorResponse === 'string') {
            setError(errorResponse);
          } else if (errorResponse.FirebaseToken) setError(errorResponse.FirebaseToken[0]);
          else setError(errorResponse.phone[0]);
          setStatus(APIStatus.Failure);
        },
        payload: {
          phone,
          FirebaseToken: result.user.za // idToken
        }
      });
      console.log('RES: ', result);
    }).catch((err) => {
      setStatus(APIStatus.Failure);
      setError(err.message);
      console.log(err);
    });
  };
  return { verify, error, status };
};
