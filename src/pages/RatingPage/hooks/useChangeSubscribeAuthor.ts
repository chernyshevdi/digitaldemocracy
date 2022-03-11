import { useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import { RootState } from 'src/store';
import { useParams } from 'react-router-dom';
import { ratingActionCreators } from '../../../slices/ratingSlice';
import { APIStatus } from '../../../lib/axiosAPI';
import { ratingAPI } from '../../../api/ratingAPI';
import { getItem } from '../../../lib/localStorageManager';

export const useChangeSubscribeAuthor = (id) => {
  const { setIsSubscribeAuthors } = ratingActionCreators();
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const { subscribeAuthor, unsubscribeAuthor } = ratingAPI();
  const { authors } = useSelector((s: RootState) => s.rating?.authors);
  const isSubscribe = authors?.filter((item) => item.id === id)[0].is_subscribed;
  const token = getItem('token');
  const api = isSubscribe ? unsubscribeAuthor : subscribeAuthor;

  const change = useCallback(() => {
    setStatus(APIStatus.Loading);
    api({
      onError: () => {
        setStatus(APIStatus.Failure);
      },
      onSuccess: () => {
        setIsSubscribeAuthors({ id, isSubscribe });
        setStatus(APIStatus.Success);
      },
      payload: {
        author_id: Number(id),
        token,
      },
    });
  }, [isSubscribe, token]);

  return { change, status };
};
