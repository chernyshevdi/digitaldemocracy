import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { APIRequest, callAPI } from '../lib/axiosAPI';
import {
  NewsWithPercentI,
  PoliticianInfoI,
  PositionHistoryI,
  VoteCountStatisticsI,
  PromiseI,
  RatingStatisticsI,
  PositionsDescriptionI,
  StatisticI,
  PoliticianBillsI,
} from '../slices/politicianSlice';

interface NewsRequest {
  start_date: string;
  end_date: string;
}

const fetchNews: APIRequest<NewsRequest, Array<NewsWithPercentI>, string, FetchProfileInfoVar> = (args) => {
  const { token, politician_id, start_date, end_date, page } = args.variables;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  return callAPI({
    url: `getNewsByDate/?politician_id=${politician_id}&start_date=${start_date}&end_date=${end_date}&page=${page}`,
    config: {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    ...args,
  });
};

interface DefaultRequest {
  politician_id: number;
}
interface DefaultRequestVotes {
  short_link: string;
}
interface PromiseVarI {
  token?: string;
}
interface RequestWithToken extends DefaultRequest {
  token: string;
}
interface FetchProfileInfoRequest extends DefaultRequest {}

interface FetchProfileInfoResponse extends PoliticianInfoI {}
interface FetchProfileInfoErr {}
interface FetchProfileInfoVar {
  short_link?: string;
  token?: string;
  politician_id?: number;
  start_date?: number | string;
  end_date?: number | string;
  page?: number;
}

const fetchProfileInfo: APIRequest<
  FetchProfileInfoRequest,
  FetchProfileInfoResponse,
  FetchProfileInfoErr,
  FetchProfileInfoVar
> = (args) => {
  const { token, short_link } = args.variables;
  return callAPI({
    url: `getPolitician/${short_link}`,
    config: {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    ...args,
  });
};

const fetchPositionHistory: APIRequest<DefaultRequest, Array<PositionHistoryI>> = (args) =>
  callAPI({
    url: `getPoliticianPositions?politician_id=${args.payload.politician_id}`,
    config: { method: 'GET' },
    ...args,
  });

const fetchPromises: APIRequest<DefaultRequest, Array<PromiseI>, null, PromiseVarI> = (args) => {
  const { token } = args?.variables;
  return callAPI({
    url: `getPoliticianPromises?politician_id=${args.payload.politician_id}`,
    config: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    ...args,
  });
};

const fetchBills: APIRequest<DefaultRequest, Array<PoliticianBillsI>, null, PromiseVarI> = (args) => {
  const { token } = args?.variables;
  return callAPI({
    url: `getPoliticianBills?politician_id=${args.payload.politician_id}`,
    config: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${args.variables.token}`,
      },
    },
    ...args,
  });
};

const fetchPositionsDescription: APIRequest<DefaultRequest, Array<PositionsDescriptionI>> = (args) =>
  callAPI({
    url: `getPoliticianPositionsDescription?politician_id=${args.payload.politician_id}`,
    config: { method: 'GET' },
    ...args,
  });

interface PoliticianChangesRequest {
  token?: string;
  source_url?: string;
  description?: string;
}

interface PoliticianChangesI {
  data?: string;
}

const fetchPoliticianChanges: APIRequest<PoliticianChangesRequest, Array<PoliticianChangesI>> = (args) => {
  return callAPI({
    url: 'offerChangesByUser',
    config: {
      headers: {
        Authorization: `Bearer ${args.payload.token}`,
      },
    },
    ...args,
  });
};

const fetchStatistic: APIRequest<DefaultRequest, Array<StatisticI>, null, PromiseVarI> = (args) => {
  const { token } = args?.variables;
  return callAPI({
    url: `getPoliticianStatisticsProfit?politician_id=${args.payload.politician_id}`,
    config: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    ...args,
  });
};

const fetchRatingStatistics: APIRequest<DefaultRequest, RatingStatisticsI> = (args) =>
  callAPI({
    url: `getPoliticianVotingStatistics?politician_id=${args.payload.politician_id}`,
    config: { method: 'GET' },
    ...args,
  });

const fetchVoteCountStatistics: APIRequest<DefaultRequestVotes, VoteCountStatisticsI> = (args) =>
  callAPI({
    url: `getPoliticianVoteCountStatistics/${args.payload.short_link}`,
    config: { method: 'GET' },
    ...args,
  });

const subscribe: APIRequest<RequestWithToken, Array<PromiseI>> = (args) =>
  callAPI({
    url: 'subscribeToPolitician',
    config: {
      headers: {
        Authorization: `Bearer ${args.payload.token}`,
      },
    },
    ...args,
  });

const unsubscribe: APIRequest<RequestWithToken, Array<PromiseI>> = (args) =>
  callAPI({
    url: 'unsubscribeFromPolitician',
    config: {
      headers: {
        Authorization: `Bearer ${args.payload.token}`,
      },
    },
    ...args,
  });

interface LikeRequest {
  news_id?: number;
  bill_id?: number;
  politician_promise_id?: number;
  politician_id?: number;
  voting_place?: string;
}

interface LikeResponse {}
interface LikeErr {}

interface LikeVar {
  token?: string;
  isItemLiked?: boolean;
  isItemDisliked?: boolean;
}

const politicianLike: APIRequest<LikeRequest, LikeResponse, LikeErr, LikeVar> = (args) => {
  const { isItemLiked, token } = args.variables;
  return callAPI({
    url: isItemLiked ? 'deleteLikeFromPolitician' : 'addLikeToPolitician',
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

const politicianDislike: APIRequest<LikeRequest, LikeResponse, LikeErr, LikeVar> = (args) => {
  const { isItemDisliked, token } = args.variables;
  return callAPI({
    url: isItemDisliked ? 'deleteDislikeFromPolitician' : 'addDislikeToPolitician',
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

const politicianBillLike: APIRequest<LikeRequest, LikeResponse, LikeErr, LikeVar> = (args) => {
  const { isItemLiked, token } = args.variables;
  return callAPI({
    url: isItemLiked ? 'deleteLikeFromPoliticianOnBill' : 'addLikeToPoliticianOnBill',
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

const politicianBillDislike: APIRequest<LikeRequest, LikeResponse, LikeErr, LikeVar> = (args) => {
  const { isItemDisliked, token } = args.variables;
  return callAPI({
    url: isItemDisliked ? 'deleteDislikeFromPoliticianOnBill' : 'addDislikeToPoliticianOnBill',
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

const getGraphPoliticianRatingChange = (args) => {
  return callAPI({
    url: 'getGraphPoliticianRatingChange',
    config: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      params: args.payload.params,
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

const fetchCountries = (args) => {
  return callAPI({
    url: 'getCountries',
    config: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
    ...args,
    nestedResponseType: false,
  });
};

const fetchRegions = (args) => {
  return callAPI({
    url: 'getRegionsByArray',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    },
    ...args,
    nestedResponseType: false,
  });
};

const fetchCities = (args) => {
  return callAPI({
    url: 'getCitiesByArray',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    },
    ...args,
    nestedResponseType: false,
  });
};

const getPoliticianCustomRating = (args) => {
  return callAPI({
    url: 'getPoliticianCustomRating',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    },
    ...args,
  });
};

const APIs = {
  fetchNews,
  fetchProfileInfo,
  fetchPositionHistory,
  fetchPromises,
  subscribe,
  unsubscribe,
  fetchRatingStatistics,
  fetchVoteCountStatistics,
  fetchPositionsDescription,
  fetchStatistic,
  fetchPoliticianChanges,
  fetchBills,
  politicianBillLike,
  politicianBillDislike,
  politicianLike,
  politicianDislike,
  getGraphPoliticianRatingChange,
  getAdditionalInformation,
  fetchCountries,
  fetchRegions,
  fetchCities,
  getPoliticianCustomRating,
};

export const politicianAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...APIs,
    },
    dispatch
  );
};
