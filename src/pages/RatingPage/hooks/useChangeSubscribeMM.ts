import { useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import { RootState } from 'src/store';
import { useParams } from 'react-router-dom';
import { ratingActionCreators } from '../../../slices/ratingSlice';
import { APIStatus } from '../../../lib/axiosAPI';
import { ratingAPI } from '../../../api/ratingAPI';
import { getItem } from '../../../lib/localStorageManager';

export const useChangeSubscribeMM = (id) => {
  const { setIsSubscribeMedia } = ratingActionCreators();
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const { subscribeMedia, unsubscribeMedia } = ratingAPI();
  const { media } = useSelector((s: RootState) => s.rating?.massMedia);
  const isSubscribe = media?.filter((item) => item.id === id)[0].is_subscribed;
  const token = getItem('token');
  const api = isSubscribe ? unsubscribeMedia : subscribeMedia;

  const change = useCallback(() => {
    setStatus(APIStatus.Loading);
    api({
      onError: () => {
        setStatus(APIStatus.Failure);
      },
      onSuccess: () => {
        setIsSubscribeMedia({ id, isSubscribe });
        setStatus(APIStatus.Success);
      },
      payload: {
        media_id: Number(id),
        token,
      },
    });
  }, [isSubscribe, token]);

  return { change, status };
};
