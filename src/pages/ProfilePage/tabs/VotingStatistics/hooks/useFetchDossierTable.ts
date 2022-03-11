import React, { useState } from 'react';
import { userAPI } from 'src/api/userAPI';
import { APIStatus } from 'src/lib/axiosAPI';
import { userActionCreators } from 'src/slices/userSlice';
import { getItem } from '../../../../../lib/localStorageManager';

export const useFetchDossierTable = () => {
  const [status, setStatus] = useState(APIStatus.Initial);
  const { fetchDossierTable } = userAPI();
  const { setDossierTablePoliticians } = userActionCreators();
  const token = getItem('token');
  const fetch = (pageNumber: number) => {
    setStatus(APIStatus.Loading);
    fetchDossierTable({
      onSuccess: (response: { politicians: Array<object>, isMorePages: boolean }) => {
        setDossierTablePoliticians({
          politicians: response.politicians,
          isMorePages: response.isMorePages,
          pageNumber
        });
        setStatus(APIStatus.Success);
      },
      onError: (error) => {
        console.log('error', error);
        setStatus(APIStatus.Failure);
      },
      payload: {
        token,
        params: {
          page: pageNumber
        }
      },
    });
  };
  return { fetch, status };
};
