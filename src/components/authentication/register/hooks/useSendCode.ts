import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import firebase from 'firebase';
import { authActionCreators, authSelectors, AuthType } from '../../../../slices/authSlice';
import { APIStatus } from '../../../../lib/axiosAPI';
import { authAPI, SendCodeErrorResponse } from '../../../../api/authAPI';
import { useSendCodeFirebase } from '../../common/hooks/useSendCodeFirebase';

interface UseSendCodeProps {
  values: {
    phone?: string;
    email?: string;
  };
  registerType?: AuthType;
  setRegisterStep: (value: number) => void;
}

export const useSendCode = (setRegisterStep: (value: number) => void) => {
  const [emailStatus, setEmailStatus] = useState<APIStatus>(APIStatus.Initial);
  const [phoneStatus, setPhoneStatus] = useState<APIStatus>(APIStatus.Initial);
  const [error, setError] = useState<string>('');
  const { sendCode, checkValidateEmail, checkValidatePhone } = authAPI();
  const { setAuthUserData } = authActionCreators();
  const { address, country_id, region_id, city_id } = useSelector(authSelectors.getUserData());
  const { sendCode: firebaseSendCode } = useSendCodeFirebase(setRegisterStep, 3, setError);

  firebase.auth().useDeviceLanguage();

  const resetError = () => setError('');

  const onSuccess = (values: { phone?: string; email?: string }) => {
    setEmailStatus(APIStatus.Success);
    setPhoneStatus(APIStatus.Success);
    setAuthUserData({ key: 'email', value: values.email });
    setRegisterStep(3);
  };

  const onError = (errorMessage: SendCodeErrorResponse) => {
    if (errorMessage.email) setError(errorMessage.email[0]);
    else setError(errorMessage.phone[0]);
    setEmailStatus(APIStatus.Failure);
    setPhoneStatus(APIStatus.Failure);
  };

  const send = useCallback(
    ({ registerType, values }: UseSendCodeProps) => {
      const validetedPhone = [...values.phone]
        .filter((it) => parseInt(it, 10) || parseInt(it, 10) === 0 || it === '+')
        .reduce((acc, rec) => acc + rec, '');
      const appVerifier = window.recaptchaVerifier;
      const registerThroughPhone = registerType === AuthType.Phone;
      if (registerThroughPhone) {
        setPhoneStatus(APIStatus.Loading);
        checkValidatePhone({
          onSuccess: () => {
            sendCode({
              onError,
              onSuccess: () => {
                setAuthUserData({ key: 'phone', value: validetedPhone });
                firebaseSendCode(validetedPhone, appVerifier);
                setPhoneStatus(APIStatus.Success);
              },
              payload: {
                country_id,
                region_id,
                city_id,
                phone: validetedPhone.replaceAll(' ', ''),
              },
            });
          },
          onError: (errorResponse) => {
            setPhoneStatus(APIStatus.Failure);
            setError(typeof errorResponse === 'string' ? errorResponse : errorResponse.phone[0]);
          },
          payload: {
            phone: validetedPhone,
          },
        });
      } else {
        setEmailStatus(APIStatus.Loading);
        checkValidateEmail({
          onSuccess: () => {
            console.log(country_id, region_id, city_id);
            sendCode({
              onError,
              onSuccess: () => onSuccess(values),
              payload: {
                country_id,
                region_id,
                city_id,
                email: values.email,
              },
            });
          },
          onError: (errorResponse) => {
            setError(typeof errorResponse === 'string' ? errorResponse : errorResponse.email[0]);
            setEmailStatus(APIStatus.Failure);
          },
          payload: {
            email: values.email,
          },
        });
      }
    },
    [country_id, region_id, city_id]
  );

  return { send, status: { emailStatus, phoneStatus }, error, resetError };
};
