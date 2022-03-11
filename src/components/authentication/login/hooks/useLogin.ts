import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { authAPI } from '../../../../api/authAPI';
import { authSelectors } from '../../../../slices/authSlice';
import { setItem } from '../../../../lib/localStorageManager';
import { userActionCreators } from '../../../../slices/userSlice';
import { ModalParams } from '../../../../types/routing';
import { useSearchParams } from '../../../../hooks/useSearchParams';
import { APIStatus } from '../../../../lib/axiosAPI';
import { useSendCodeFirebase } from '../../common/hooks/useSendCodeFirebase';

export const useLogin = () => {
  const { authViaEmailConfirmPassword, loginViaPhone } = authAPI();
  const { setUser, setIsAuthenticated } = userActionCreators();
  const { authUserData: { email, phone } } = useSelector(authSelectors.getAllData());
  const [error, setError] = useState<string>();
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const { sendCode: sendFirebaseCode } = useSendCodeFirebase();

  const {
    [ModalParams.Auth]: { setValue: setAuthValue },
  } = useSearchParams(ModalParams.Auth);

  const passwordVerify = useCallback((password: string, rememberMe: boolean) => {
    setError(undefined);
    setStatus(APIStatus.Loading);
    authViaEmailConfirmPassword({
      onSuccess: (response) => {
        setItem('token', response.token, !rememberMe ? 'false' : undefined);
        setUser(response.user);
        setIsAuthenticated(true);
        setAuthValue(undefined);
        setStatus(APIStatus.Success);
      },
      onError: (errorResponse) => {
        if (typeof errorResponse === 'string') {
          setError(errorResponse);
        } else {
          setError(errorResponse.password ? errorResponse.password[0] : errorResponse.email[0]);
        }
        setStatus(APIStatus.Failure);
      },
      payload: {
        email,
        password,
      }
    });
  }, []);

  const resendFirebaseCode = useCallback(() => {
    const appVerifier = window.recaptchaVerifier;
    sendFirebaseCode(phone, appVerifier);
  }, []);

  const codeVerify = useCallback((code: string) => {
    setStatus(APIStatus.Loading);
    setError(undefined);
    window.confirmationResult.confirm(code).then((result) => {
      loginViaPhone({
        onSuccess: (response) => {
          setItem('token', response.token);
          setUser(response.user);
          setIsAuthenticated(true);
          console.log('serverResponse: ', response);
          setAuthValue(undefined);
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
  }, []);

  return { passwordVerify, codeVerify, error, status, resendFirebaseCode };
};
