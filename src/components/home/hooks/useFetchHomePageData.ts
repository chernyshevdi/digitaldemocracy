import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { homeAPI } from '../../../api/homeAPI';
import { homeSlice } from '../../../slices/homeSlice';
import { APIStatus } from '../../../lib/axiosAPI';

export const useFetchHomePageData = () => {
  const dispatch = useDispatch();
  const { setData, addNews, setNews } = homeSlice.actions;
  const { fetchHome } = homeAPI;
  const [fetchNewsStatus, setFetchNewsStatus] = useState<APIStatus>(APIStatus.Initial);
  const [fetchDataStatus, setFetchDataStatus] = useState<APIStatus>(APIStatus.Initial);

  const setStatus = (fetchOnlyNews: boolean, status: APIStatus) => {
    if (fetchOnlyNews) {
      setFetchNewsStatus(status);
    } else setFetchDataStatus(status);
  };

  const fetch = useCallback(
    (page?: number, topic_id?: any, fetchOnlyNews?: boolean) => {
      let action;
      if (topic_id) {
        action = setNews;
      } else if (fetchOnlyNews) {
        action = addNews;
      } else {
        action = setData;
      }
      setStatus(fetchOnlyNews, APIStatus.Loading);
      dispatch(
        fetchHome({
          onSuccess: (response) => {
            setStatus(fetchOnlyNews, APIStatus.Success);
            dispatch(action({ ...response, page }));
          },
          payload: {
            topic_id: topic_id === -1 ? undefined : topic_id,
            page,
          },
          onError: (errorResponse) => {
            setStatus(fetchOnlyNews, APIStatus.Failure);
            console.log(errorResponse);
          },
        })
      );
    },
    [fetchNewsStatus, fetchDataStatus]
  );

  return { fetch, fetchNewsStatus, fetchDataStatus };
};
