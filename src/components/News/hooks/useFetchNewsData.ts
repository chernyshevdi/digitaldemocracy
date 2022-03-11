import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { newsAPI } from '../../../api/newsAPI';
import { newsSlice } from '../../../slices/newsSlice';
import { APIStatus } from '../../../lib/axiosAPI';
import { getItem } from '../../../lib/localStorageManager';

export const useFetchNewsData = (setLoadMoreNews?: (value: boolean) => void) => {
  const dispatch = useDispatch();
  const { setData, addNews, setNews } = newsSlice.actions;
  const { fetchNews, fetchNewsArea, fetchNewsSubscriptions } = newsAPI;
  const [fetchNewsStatus, setFetchNewsStatus] = useState<APIStatus>(APIStatus.Initial);
  const [fetchDataStatus, setFetchDataStatus] = useState<APIStatus>(APIStatus.Initial);
  const token = getItem('token');

  const setStatus = (fetchOnlyNews: boolean, status: APIStatus) => {
    if (fetchOnlyNews) {
      setFetchNewsStatus(status);
    } else setFetchDataStatus(status);
  };

  const fetch = useCallback((page?: number, topic_id?: any, fetchOnlyNews?: boolean) => {
    let action;
    if (topic_id) {
      action = setNews;
    } else if (fetchOnlyNews) {
      action = addNews;
    } else {
      action = setData;
    }
    setStatus(fetchOnlyNews, APIStatus.Loading);
    dispatch(fetchNews({
      onSuccess: (response) => {
        setStatus(fetchOnlyNews, APIStatus.Success);
        dispatch(action({ ...response, page }));
        setLoadMoreNews(false);
      },
      payload: {
        topicId: topic_id === -1 ? undefined : topic_id,
        page
      },
      onError: (errorResponse) => {
        setStatus(fetchOnlyNews, APIStatus.Failure);
        console.log(errorResponse);
      }

    }));
  }, [fetchNewsStatus, fetchDataStatus]);

  // Country fetch data

  const fetchAreaNews = useCallback((area?: string, page?: number, topicId?: any, fetchOnlyNews?: boolean) => {
    let action;
    if (topicId) {
      action = setNews;
    } else if (fetchOnlyNews) {
      action = addNews;
    } else {
      action = setData;
    }
    setStatus(fetchOnlyNews, APIStatus.Loading);
    dispatch(fetchNewsArea({
      onSuccess: (response) => {
        setStatus(fetchOnlyNews, APIStatus.Success);
        dispatch(action({ ...response, page }));
        setLoadMoreNews(false);
      },
      onError: (errorResponse) => {
        setStatus(fetchOnlyNews, APIStatus.Failure);
        dispatch(action({}));
        console.log(errorResponse);
      },
      payload: {
        area,
        page,
        topicId,
        token,
      },
    }));
  }, [fetchNewsStatus, fetchDataStatus]);

  const fetchSubscriptionsNews = useCallback((page?: number, topic_id?: any, fetchOnlyNews?: boolean) => {
    let action;
    if (topic_id) {
      action = setNews;
    } else if (fetchOnlyNews) {
      action = addNews;
    } else {
      action = setData;
    }
    setStatus(fetchOnlyNews, APIStatus.Loading);
    dispatch(fetchNewsSubscriptions({
      onSuccess: (response) => {
        setStatus(fetchOnlyNews, APIStatus.Success);
        dispatch(action({ ...response, page }));
        setLoadMoreNews(false);
      },
      payload: {
        topicId: topic_id === -1 ? undefined : topic_id,
        page,
        token,
      },
      onError: (errorResponse) => {
        setStatus(fetchOnlyNews, APIStatus.Failure);
        console.log(errorResponse);
      }

    }));
  }, [fetchNewsStatus, fetchDataStatus]);

  return { fetch, fetchAreaNews, fetchSubscriptionsNews, fetchNewsStatus, fetchDataStatus };
};
