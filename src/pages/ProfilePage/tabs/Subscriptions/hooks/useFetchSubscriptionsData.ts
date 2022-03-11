import { useState } from 'react';
import { useSelector } from 'react-redux';
import { APIStatus } from '../../../../../lib/axiosAPI';
import { userActionCreators, userSelectors } from '../../../../../slices/userSlice';
import { userAPI } from '../../../../../api/userAPI';
import { getItem } from '../../../../../lib/localStorageManager';

export const useFetchSubscriptionsData = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const fetchUserDataStatus = useSelector(userSelectors.getStatus());
  const { fetchSubscriptions } = userAPI();
  const { setSubscriptions } = userActionCreators();
  const token = getItem('token');

  const fetch = () => {
    if (fetchUserDataStatus === APIStatus.Success) {
      setStatus(APIStatus.Loading);
      fetchSubscriptions({
        onSuccess: (response) => {
          setSubscriptions(response);
          setStatus(APIStatus.Success);
        },
        onError: () => setStatus(APIStatus.Failure),
        payload: {
          token,
        }
      });
    }
  };

  return { fetch, status };
};
