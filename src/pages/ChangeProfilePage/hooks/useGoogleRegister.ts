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

export const useGoogleRegister = () => {
  const { attachGoogle, detachGoogle } = profileAPI();
  const { registerViaGoogle } = authAPI();
  const token = getItem('token');
  const [googleError, setGoogleError] = useState<string>();
  const [status, setStatus] = useState(APIStatus.Initial);

  const { addGoogle, removeGoogle } = profileActionCreators();

  const {
    [ModalParams.Auth]: { setValue: setAuthValue },
  } = useSearchParams(ModalParams.Auth);

  const googleOAuth = (response) => {
    const { googleId } = response;
    setStatus(APIStatus.Loading);
    setGoogleError('');
    return attachGoogle({
      onSuccess: (res) => {
        setStatus(APIStatus.Success);
        addGoogle();
      },
      onError: (errorResponse) => {
        setGoogleError(errorResponse.googleId[0]);
        setStatus(APIStatus.Failure);
      },
      payload: {
        params: { googleId },
        token,
      },
    });
  };

  const googleExit = (response) => {
    const { googleId } = response;
    setStatus(APIStatus.Loading);
    setGoogleError('');
    return detachGoogle({
      onSuccess: (res) => {
        setStatus(APIStatus.Success);
        removeGoogle();
      },
      onError: (errorResponse) => {
        setGoogleError(errorResponse.googleId[0]);
        setStatus(APIStatus.Failure);
      },
      payload: {
        params: { googleId },
        token,
      },
    });
  };

  return { googleOAuth, googleExit, googleError, status };
};
