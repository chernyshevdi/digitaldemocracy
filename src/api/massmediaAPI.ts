import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { APIRequest, callAPI } from '../lib/axiosAPI';
import { MassMediaDataI } from '../slices/massMediaSlice';

interface StatisticRequest {
  params?: StatisticParamsI;
}

interface StatisticParamsI {
  media_id?: number;
}

interface StatisticResponse {
  data?: MassMediaDataI;
}

interface NewsRequest {
  link?: string;
  params?: ParamsI;
}

interface ParamsI {
  orderBy?: string;
  sortBy?: string;
  page?: number;
  mediaId?: number;
}

interface NewsResponse {
  data?: MassMediaDataI;
}

interface NewsErr {}

interface NewsVar {
  token?: string;
}

interface SubRequest {
  media_id?: number;
}

interface SubResponse {
  data?: MassMediaDataI;
}
interface SubErr {}

interface SubVar {
  isSubscribed?: boolean;
  token?: string;
}
const fetchMassMediaData: APIRequest<NewsRequest, NewsResponse, NewsErr, NewsVar> = (args) => {
  const { link } = args.payload;
  const { token } = args.variables;
  return callAPI({
    url: `media/${link}`,
    config: { method: 'GET', headers: { Accept: 'application/json', Authorization: `Bearer ${token}` } },
    ...args,
  });
};

const fetchMassMediaNews: APIRequest<NewsRequest, NewsResponse, NewsErr, NewsVar> = (args) => {
  const { params } = args.payload;
  return callAPI({
    url: 'mediaNews',
    config: { method: 'GET', headers: { Accept: 'application/json' }, params },
    ...args,
  });
};

const massmediaSubscribe: APIRequest<SubRequest, SubResponse, SubErr, SubVar> = (args) => {
  const { isSubscribed, token } = args.variables;
  return callAPI({
    url: isSubscribed ? 'unsubscribeFromMedia' : 'subscribeToMedia',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args.variables.token}`,
      },
    },
    ...args,
  });
};

const massmediaStatistic: APIRequest<StatisticRequest, StatisticResponse, NewsErr, NewsVar> = (args) => {
  const { token } = args.variables;
  const { params } = args.payload;
  return callAPI({
    url: 'mediaInfluencesForPolitician',
    config: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      params,
    },
    ...args,
  });
};

const getAdditionalInformation = (args) => {
  return callAPI({
    url: 'getAdditionalInformation',
    config: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      params: args.payload,
    },
    ...args,
  });
};

export const massmediaAPIs = {
  fetchMassMediaData,
  fetchMassMediaNews,
  massmediaSubscribe,
  massmediaStatistic,
  getAdditionalInformation
};

export const massmediaAPIActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...massmediaAPIs,
    },
    dispatch
  );
};
