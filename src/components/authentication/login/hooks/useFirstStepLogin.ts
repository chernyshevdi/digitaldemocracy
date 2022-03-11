import { useCallback, useState } from 'react';
import { authAPI } from '../../../../api/authAPI';
import { authActionCreators } from '../../../../slices/authSlice';
import { useSendCodeFirebase } from '../../common/hooks/useSendCodeFirebase';
import { APIStatus } from '../../../../lib/axiosAPI';

export const useFirstStepLogin = (setStepLogin?: (value: number) => void) => {
  const { checkValidateEmailLogin, checkValidatePhoneLogin } = authAPI();
  const [emailError, setEmailError] = useState<string>();
  const [phoneError, setPhoneError] = useState<string>();
  const [emailStatus, setEmailStatus] = useState<APIStatus>(APIStatus.Initial);
  const [phoneStatus, setPhoneStatus] = useState<APIStatus>(APIStatus.Initial);
  const { setAuthUserData } = authActionCreators();
  const { sendCode: sendFirebaseCode } = useSendCodeFirebase(setStepLogin, 2, setPhoneError);

  const verifyEmail = useCallback((email: string) => {
    setEmailStatus(APIStatus.Loading);
    checkValidateEmailLogin({
      onSuccess: () => {
        setAuthUserData({ key: 'email', value: email });
        setStepLogin(2);
        setEmailStatus(APIStatus.Success);
      },
      onError: (errorResponse) => {
        setEmailError(typeof errorResponse === 'string' ? errorResponse : errorResponse.email[0]);
        setEmailStatus(APIStatus.Failure);
      },
      payload: {
        email,
      }
    });
  }, []);

  const sendCode = useCallback((phone: string) => {
    setPhoneStatus(APIStatus.Loading);
    checkValidatePhoneLogin({
      onSuccess: () => {
        setAuthUserData({ key: 'phone', value: phone });
        const appVerifier = window.recaptchaVerifier;
        sendFirebaseCode(phone, appVerifier);
        setPhoneStatus(APIStatus.Success);
      },
      onError: (errorResponse) => {
        setPhoneError(typeof errorResponse === 'string' ? errorResponse : errorResponse.phone[0]);
        setPhoneStatus(APIStatus.Failure);
      },
      payload: {
        phone
      }
    });
  }, []);
  return { sendCode, verifyEmail, emailError, phoneError, status: { emailStatus, phoneStatus }, setEmailError, setPhoneError };
};
