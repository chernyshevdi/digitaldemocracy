import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { authAPI } from '../../../../api/authAPI';
import { authActionCreators, authSelectors } from '../../../../slices/authSlice';
import { setItem, removeItem } from '../../../../lib/localStorageManager';
import { ModalParams } from '../../../../types/routing';
import { useSearchParams } from '../../../../hooks/useSearchParams';
import { userActionCreators } from '../../../../slices/userSlice';

export const useOAuthRegister = (isLogin?: boolean) => {
  const { registerViaGoogle, authViaGoogle, authViaYandex, registerViaYandex } = authAPI();
  const { address, countryId, city_id, country_id, region_id } = useSelector(authSelectors.getUserData());
  const { registerStep, loginStep } = useSelector(authSelectors.getSteps());
  const { setRegisterStep, setLoginStep } = authActionCreators();
  const { setIsAuthenticated, setUser } = userActionCreators();
  const [googleError, setGoogleError] = useState<string>();
  const [yandexError, setYandexError] = useState<string>();

  useEffect(() => {
    setGoogleError(undefined);
    setYandexError(undefined);
  }, [registerStep, loginStep]);

  const {
    [ModalParams.Auth]: { setValue: setAuthValue },
  } = useSearchParams(ModalParams.Auth);

  const apiGoogle = isLogin ? authViaGoogle : registerViaGoogle;
  const apiYandex = isLogin ? authViaYandex : registerViaYandex;

  const googleOAuth = (response) => {
    apiGoogle({
      onSuccess: (res) => {
        setItem('token', res.token);
        setUser(res.user);
        setIsAuthenticated(true);
        if (isLogin) {
          setLoginStep(1);
          setAuthValue(undefined);
        } else {
          setRegisterStep(5);
        }
      },
      onError: (errorResponse) => {
        setGoogleError(errorResponse.address ? errorResponse.address[0] : errorResponse.googleId[0]);
      },
      payload: {
        ...response,
        country_id,
        region_id,
        city_id,
      },
    });
  };

  const yandexOAuth = (response) => {
    apiYandex({
      onSuccess: (res) => {
        setItem('token', res.token);
        removeItem('yandexUser');
        setUser(res.user);
        setIsAuthenticated(true);
        if (isLogin) {
          setLoginStep(1);
          setAuthValue(undefined);
        } else {
          setRegisterStep(5);
        }
      },
      onError: (errorResponse) => {
        console.log(errorResponse);
        removeItem('yandexUser');
        // @ts-ignore
        setYandexError(errorResponse && errorResponse.id);
      },
      payload: {
        ...response,
        country_id,
        region_id,
        city_id,
      }
    });
  };

  return { googleOAuth, yandexOAuth, googleError, yandexError };
};
