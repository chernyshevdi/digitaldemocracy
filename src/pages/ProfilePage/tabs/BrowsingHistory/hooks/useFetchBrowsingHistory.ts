import { useState } from 'react';
import { useSelector } from 'react-redux';
import { APIStatus } from '../../../../../lib/axiosAPI';
import { userActionCreators, userSelectors } from '../../../../../slices/userSlice';
import { userAPI } from '../../../../../api/userAPI';
import { getItem } from '../../../../../lib/localStorageManager';

export const useFetchBrowsingHistory = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const { page: slicePage } = useSelector(userSelectors.getBrowsingHistory());
  const fetchUserDataStatus = useSelector(userSelectors.getStatus());
  const { fetchBrowsingHistory } = userAPI();
  const { setBrowsingHistory } = userActionCreators();
  const token = getItem('token');

  const fetch = (page?: number) => {
    if (fetchUserDataStatus === APIStatus.Success) {
      setStatus(APIStatus.Loading);
      fetchBrowsingHistory({
        onSuccess: (response) => {
          setBrowsingHistory({ data: response, page });
          setStatus(APIStatus.Success);
        },
        onError: () => setStatus(APIStatus.Failure),
        payload: {
          token,
          page: page || slicePage
        }
      });
    }
  };

  return { fetch, status };
};
