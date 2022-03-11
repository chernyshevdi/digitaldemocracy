import { useState, useCallback } from 'react';
import { profileAPI } from 'src/api/profileAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { getItem } from '../../../lib/localStorageManager';

export const useFetchEmail = () => {
  const [statusCheckEmail, setStatusCheckEmail] = useState<APIStatus>(APIStatus.Initial);
  const [statusEmailCode, setStatusEmailCode] = useState(APIStatus.Initial);
  const [statusEmailMessage, setStatusEmailMessage] = useState('');
  const [statusCodeMessage, setStatusCodeMessage] = useState('');
  const [statusPassword, setStatusPassword] = useState(false);
  const [statusCheckPassword, setStatusCheckPassword] = useState<APIStatus>(APIStatus.Initial);
  const [mail, setMail] = useState('');
  const token = getItem('token');
  const { checkAttachEmail, checkAttachEmailConfirmationCode, attachEmailSetPassword } = profileAPI();

  const sendEmail = (email) => {
    setStatusCheckEmail(APIStatus.Loading);
    checkAttachEmail({
      onSuccess: (response) => {
        setStatusCheckEmail(APIStatus.Success);
        setMail(response);
      },
      onError: (errorResponse) => {
        setStatusCheckEmail(APIStatus.Failure);
        if (errorResponse?.email) {
          setStatusEmailMessage(errorResponse.email[0]);
        } else if (typeof errorResponse === 'string') {
          setStatusEmailMessage(errorResponse);
        }
      },
      payload: {
        params: {
          email,
        },
        token,
      },
    });
  };

  const sendCodeEmail = (email, code) => {
    setStatusEmailCode(APIStatus.Loading);
    checkAttachEmailConfirmationCode({
      onSuccess: (response) => {
        setStatusEmailCode(APIStatus.Success);
        setStatusCodeMessage(response);
        if (response?.data === false) {
          setStatusPassword(true);
        }
      },
      onError: (errorResponse) => {
        setStatusEmailCode(APIStatus.Failure);
        if (Array.isArray(errorResponse)) {
          setStatusCodeMessage('Введеный код неверен');
        } else {
          setStatusCodeMessage(
            'При отправке данных произошла ошибка, ваш почтовый ящик возможно уже зарегестрирован в системе'
          );
        }
      },
      payload: {
        params: {
          code,
          email,
        },
        token,
      },
    });
  };

  const fetchSetNewPassword = (email, password) => {
    setStatusCheckPassword(APIStatus.Loading);
    attachEmailSetPassword({
      onSuccess: (response) => {
        setStatusCheckPassword(APIStatus.Success);
      },
      onError: (errorResponse) => {
        setStatusCheckPassword(APIStatus.Failure);
      },
      payload: {
        params: {
          change_place: 'newPassword',
          email,
          password,
        },
        token,
      },
    });
  };

  return {
    sendEmail,
    sendCodeEmail,
    fetchSetNewPassword,
    mail,
    statusEmailCode,
    statusCheckEmail,
    statusEmailMessage,
    statusCodeMessage,
    statusPassword,
    statusCheckPassword,
  };
};
