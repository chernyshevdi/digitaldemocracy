import { AboutAPI } from 'src/api/getAboutTheSite';

import { useState } from 'react';
import { aboutPageActionCreators } from 'src/slices/aboutPageSlice';
import { APIStatus } from '../../../lib/axiosAPI';

export const useFetchAboutPage = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const { setAboutPageState } = aboutPageActionCreators();
  const { fetchAboutTheSite } = AboutAPI();

  const fetch = () => {
    fetchAboutTheSite({
      onSuccess: (response) => {
        setAboutPageState(response);
        setStatus(APIStatus.Success);
      },
      onError: (errorResponse) => {
        setStatus(APIStatus.Failure);
      },
    });
  };

  return { fetch, status };
};
