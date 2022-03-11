import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ratingAPI } from '../../../../../api/ratingAPI';
import { politicianAPI } from '../../../../../api/politicianAPI';
import { APIStatus } from '../../../../../lib/axiosAPI';
import { getItem } from '../../../../../lib/localStorageManager';
import { userActionCreators, userSelectors } from '../../../../../slices/userSlice';
import { TypeSubscribe } from '../Subscriptions';

export const useUnsubscribe = (type, id) => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const { unsubscribeMedia, unsubscribeAuthor } = ratingAPI();
  const { unsubscribe: unsubscribePolitician } = politicianAPI();
  const subscriptions = useSelector(userSelectors.getSubscriptions());
  const { setSubscriptions } = userActionCreators();
  const token = getItem('token');

  const filterSubscriptions = () => ({
    ...subscriptions,
    [type]: subscriptions[type].filter((item) => item.id !== id)
  });

  const unsubscribe = () => {
    setStatus(APIStatus.Loading);
    switch (type) {
    case TypeSubscribe.POLITICIANS:
      unsubscribePolitician({
        onError: () => {
          setStatus(APIStatus.Failure);
        },
        onSuccess: () => {
          setSubscriptions(filterSubscriptions());
          setStatus(APIStatus.Success);
        },
        payload: {
          politician_id: Number(id),
          token,
        },
      });
      return;
    case TypeSubscribe.MEDIAS:
      unsubscribeMedia({
        onError: () => {
          setStatus(APIStatus.Failure);
        },
        onSuccess: () => {
          setSubscriptions(filterSubscriptions());
          setStatus(APIStatus.Success);
        },
        payload: {
          media_id: Number(id),
          token,
        },
      });
      return;
    case TypeSubscribe.AUTHORS:
      unsubscribeAuthor({
        onError: () => {
          setStatus(APIStatus.Failure);
        },
        onSuccess: () => {
          setSubscriptions(filterSubscriptions());
          setStatus(APIStatus.Success);
        },
        payload: {
          author_id: Number(id),
          token,
        },
      });
      return;
    default:
      setStatus(APIStatus.Success);
    }
  };

  return { unsubscribe, status };
};
