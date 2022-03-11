import { APIStatus } from 'src/lib/axiosAPI';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { OAuthConfig } from 'src/config';
import { profileAPI } from 'src/api/profileAPI';
import { authAPI } from 'src/api/authAPI';
import { getItem } from 'src/lib/localStorageManager';
import { ModalParams } from 'src/types/routing';
import { useSearchParams } from 'src/hooks/useSearchParams';
import { profileActionCreators } from 'src/slices/profileSlice';

export const useYandexRegiser = () => {
  const { attachYandex, detachYandex } = profileAPI();
  const { registerViaYandex } = authAPI();
  const token = getItem('token');
  const [yandexError, setYandexError] = useState<string>();
  const [statusY, setStatusY] = useState(APIStatus.Initial);

  const { addYandex, removeYandex } = profileActionCreators();

  // const {
  //   [ModalParams.Auth]: { setValue: setAuthValue },
  // } = useSearchParams(ModalParams.Auth);

  const yandexOAuth = (response) => {
    const { client_id } = response;
    console.log(response);
    setStatusY(APIStatus.Loading);
    setYandexError('');
    return attachYandex({
      onSuccess: (res) => {
        setStatusY(APIStatus.Success);
        addYandex();
      },
      onError: (errorResponse) => {
        setYandexError(errorResponse.yandexId[0]);
        setStatusY(APIStatus.Failure);
      },
      payload: {
        params: { yandexId: client_id },
        token,
      },
    });
  };

  const yandexExit = (response) => {
    const { client_id } = response;
    setStatusY(APIStatus.Loading);
    setYandexError('');
    return detachYandex({
      onSuccess: (res) => {
        setStatusY(APIStatus.Success);
        removeYandex();
      },
      onError: (errorResponse) => {
        setYandexError(errorResponse.yandexId[0]);
        setStatusY(APIStatus.Failure);
      },
      payload: {
        params: { yandexId: client_id },
        token,
      },
    });
  };

  return { yandexOAuth, yandexExit, yandexError, statusY };
};
