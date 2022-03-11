import { useState } from 'react';
import firebase from 'firebase';
import { APIStatus } from '../../../lib/axiosAPI';

export const useSendCodeFirebase = () => {
  const [status, setStatus] = useState(APIStatus.Initial);
  const sendCode = (phone, appVerifier) => {
    return firebase
      .auth()
      .signInWithPhoneNumber(phone, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setStatus(APIStatus.Success);
      })
      .catch((err) => {
        console.log('ERRRO: ', err);
        window.grecaptcha.reset();
        setStatus(APIStatus.Failure);
      });
  };
  return { sendCode, status };
};
