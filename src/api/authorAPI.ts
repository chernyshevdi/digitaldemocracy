import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { AuthorDataI } from 'src/slices/authorSlice';
import { APIRequest, callAPI } from '../lib/axiosAPI';

interface StatisticRequest {
  params?: StatisticParamsI;
}

interface StatisticParamsI {
  author_id?: number;
}

interface StatisticResponse {
  data?: AuthorDataI;
}

interface NewsRequest {
  link?: string;
  params?: ParamsI;
}

interface ParamsI {
  orderBy?: string;
  sortBy?: string;
  page?: number;
  authorId?: number;
}

interface NewsResponse {
  data?: AuthorDataI;
}
interface NewsErr {}

interface NewsVar {
  token?: string;
}

interface SubRequest {
  author_id?: number;
}

interface SubResponse {
  data?: AuthorDataI;
}
interface SubErr {}

interface SubVar {
  isSubscribed?: boolean;
  token?: string;
}

const fetchAuthorData: APIRequest<NewsRequest, NewsResponse, NewsErr, NewsVar> = (args) => {
  const { link } = args.payload;
  const { token } = args.variables;
  return callAPI({
    url: `author/${link}`,
    config: { method: 'GET', headers: { Accept: 'application/json', Authorization: `Bearer ${token}` } },
    ...args,
  });
};

const fetchAuthorNews: APIRequest<NewsRequest, NewsResponse, NewsErr, NewsVar> = (args) => {
  const { params } = args.payload;
  const { token } = args.variables;
  return callAPI({
    url: 'authorNews',
    config: { method: 'GET', headers: { Accept: 'application/json', Authorization: `Bearer ${token}` }, params },
    ...args,
  });
};

const authorSubscribe: APIRequest<SubRequest, SubResponse, SubErr, SubVar> = (args) => {
  const { isSubscribed, token } = args.variables;
  return callAPI({
    url: isSubscribed ? 'unsubscribeFromAuthor' : 'subscribeToAuthor',
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

const authorStatistic: APIRequest<StatisticRequest, StatisticResponse, NewsErr, NewsVar> = (args) => {
  const { token } = args.variables;
  const { params } = args.payload;
  return callAPI({
    url: 'authorInfluencesForPolitician',
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

export const authorAPIs = {
  fetchAuthorData,
  fetchAuthorNews,
  authorSubscribe,
  authorStatistic,
  getAdditionalInformation
};

export const authorAPIActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...authorAPIs,
    },
    dispatch
  );
};
