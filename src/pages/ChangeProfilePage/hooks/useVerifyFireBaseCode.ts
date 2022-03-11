import { useState } from 'react';
import { useSelector } from 'react-redux';
import { profileAPI } from 'src/api/profileAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { getItem } from '../../../lib/localStorageManager';

export const useVerifyFirebaseCode = () => {
  const [error, setError] = useState('');
  const [statusVerify, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const { attachPhone } = profileAPI();
  const token = getItem('token');

  const verify = (verificationCode, phone) => {
    setStatus(APIStatus.Loading);
    window.confirmationResult
      .confirm(verificationCode)
      .then((result) => {
        attachPhone({
          onSuccess: (response) => {
            setStatus(APIStatus.Success);
            // console.log(result.user.za);
          },
          onError: (errorResponse) => {
            if (typeof errorResponse === 'string') {
              setError(errorResponse);
            } else if (errorResponse.FirebaseToken) setError(errorResponse.FirebaseToken[0]);
            else setError(errorResponse.phone[0]);
            setStatus(APIStatus.Failure);
          },
          payload: {
            params: { phone, FirebaseToken: result.user.za },
            token,
          },
        });
        console.log('RES: ', result);
      })
      .catch((err) => {
        setStatus(APIStatus.Failure);
        setError(err.message);
        console.log(err);
      });
  };
  return { verify, error, statusVerify };
};
