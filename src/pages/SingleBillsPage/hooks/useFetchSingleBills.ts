import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { singleBillsAPIActions } from '../../../api/singleBillsAPI';
import { singleBillsActionCreators } from '../../../slices/SingleBillsSlice';
import { getItem } from '../../../lib/localStorageManager';
import { APIStatus } from '../../../lib/axiosAPI';

export const useFetchSingleBills = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const { setData } = singleBillsActionCreators();
  const { fetchSingleBills } = singleBillsAPIActions();
  const token = getItem('token');
  const { link } = useParams() as any;

  const fetch = useCallback(() => {
    fetchSingleBills({
      onSuccess: (response) => {
        setData(response);
        setStatus(APIStatus.Success);
      },
      payload: {
        token,
        link,
      },
      onError: (errorResponse) => {
        setStatus(APIStatus.Failure);
      },
    });
  }, [token]);

  return { fetch, status };
};
