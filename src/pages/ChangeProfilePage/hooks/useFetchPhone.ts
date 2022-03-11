import { useState, useCallback } from 'react';
import firebase from 'firebase';
import { profileAPI } from 'src/api/profileAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { getItem } from '../../../lib/localStorageManager';
import { useSendCodeFirebase } from './useSendCodeFirebase';

export const useFetchPhone = () => {
  const [statusCheckPhone, setStatusCheckPhone] = useState<APIStatus>(APIStatus.Initial);
  const [statusPhoneCode, setStatusPhoneCode] = useState(APIStatus.Initial);
  const [statusPhoneMessage, setStatusPhoneMessage] = useState('');
  const [statusCodeMessage, setStatusCodeMessage] = useState('');
  const [tele, setTele] = useState('');
  const token = getItem('token');
  const { checkAttachPhone, attachPhone } = profileAPI();

  const { sendCode: firebaseSendCode, status } = useSendCodeFirebase();

  firebase.auth().useDeviceLanguage();

  const appVerifier = window.recaptchaVerifier;

  const sendPhone = (phone) => {
    setStatusCheckPhone(APIStatus.Loading);
    checkAttachPhone({
      onSuccess: (response) => {
        setTele(response);
        firebaseSendCode(phone, appVerifier);
        setStatusCheckPhone(APIStatus.Success);
      },
      onError: (errorResponse) => {
        setStatusCheckPhone(APIStatus.Failure);
        if (errorResponse?.phone) {
          setStatusPhoneMessage(errorResponse.phone[0]);
        } else if (typeof errorResponse === 'string') {
          setStatusPhoneMessage(errorResponse);
        }
      },
      payload: {
        params: {
          phone,
        },
        token,
      },
    });
  };

  // const sendCodePhone = (phone, FirebaseToken) => {
  //   setStatusPhoneCode(APIStatus.Loading);
  //   attachPhone({
  //     onSuccess: (response) => {
  //       setStatusPhoneCode(APIStatus.Success);
  //     },
  //     onError: (errorResponse) => {
  //       setStatusPhoneCode(APIStatus.Failure);
  //     },
  //     payload: {
  //       params: {
  //         phone,
  //         FirebaseToken,
  //       },
  //       token,
  //     },
  //   });
  // };

  return {
    sendPhone,
    tele,
    statusPhoneCode,
    statusCheckPhone,
    statusPhoneMessage,
    statusCodeMessage,
  };
};
