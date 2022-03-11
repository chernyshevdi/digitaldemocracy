import { useCallback, useState } from 'react';
import { ModalParams } from '../../../../../types/routing';
import { useSearchParams } from '../../../../../hooks/useSearchParams';
import { authAPI } from '../../../../../api/authAPI';
import { APIStatus } from '../../../../../lib/axiosAPI';

export const useFetchUserData = () => {
  const {
    [ModalParams.YandexRegister]: { value: yandexRegisterValue },
  } = useSearchParams(ModalParams.YandexRegister);
  const { getYandexUserInfo } = authAPI();
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);

  const getData = useCallback(() => {
    if (yandexRegisterValue) {
      setStatus(APIStatus.Loading);
      const token = /access_token=([^&]+)/.exec(document.location.hash);
      if (token) {
        getYandexUserInfo({
          onSuccess: (response) => {
            console.log(response);
            setStatus(APIStatus.Success);
          },
          onError: (errorResponse) => {
            setStatus(APIStatus.Failure);
            console.log(errorResponse);
          },
          payload: {
            format: 'json',
            with_openid_identity: true,
            oauth_token: token[1]
          }
        });
      } else {
        setStatus(APIStatus.Initial);
      }
    } else {
      setStatus(APIStatus.Initial);
    }
  }, [yandexRegisterValue]);

  return { status, getData };
};
