import React, { useState } from 'react';
import { APIStatus } from 'src/lib/axiosAPI';
import { userAPI } from 'src/api/userAPI';
import { getItem } from 'src/lib/localStorageManager';
import { userActionCreators } from 'src/slices/userSlice';

export const useFetchPoliticianDossierGraph = () => {
  const [status, setStatus] = useState(APIStatus.Initial);
  const { fetchPoliticiansDossierGraph } = userAPI();
  const { setDossierPoliticianGraph } = userActionCreators();
  const token = getItem('token');
  const fetch = (politician_id: number) => {
    setStatus(APIStatus.Loading);
    fetchPoliticiansDossierGraph({
      onSuccess: (response) => {
        setStatus(APIStatus.Success);
        setDossierPoliticianGraph(response);
      },
      onError: (error) => {
        setStatus(APIStatus.Failure);
        console.log(error);
      },
      payload: {
        token,
        params: {
          politician_id
        },
      },
    });
  };

  return { status, fetch };
};
