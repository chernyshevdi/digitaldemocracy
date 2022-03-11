import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { APIRequest, callAPI } from '../lib/axiosAPI';
import { User } from '../types/user';
import { HistoryNewsI, SubscriptionsI } from '../slices/userSlice';

export interface UserDataResponse extends User {}

const fetchUserData: APIRequest<{ token: string }, UserDataResponse> = (args) =>
  callAPI({
    url: 'getUserForProfile',
    config: {
      method: 'get',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args.payload.token}`,
      },
    },
    ...args,
  });

const fetchBrowsingHistory: APIRequest<{ page?: number; token: string }, HistoryNewsI> = (args) =>
  callAPI({
    url: `getViewsNewsForUser${args.payload.page ? `?page=${args.payload.page}` : ''}`,
    config: {
      method: 'get',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args.payload.token}`,
      },
    },
    ...args,
  });

const fetchSubscriptions: APIRequest<{ token: string }, { data?: SubscriptionsI }> = (args) =>
  callAPI({
    url: 'getSubscriptionsForUser',
    config: {
      method: 'get',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args.payload.token}`,
      },
    },
    ...args,
  });

const fetchDossierTable: any = (args) =>
  callAPI({
    url: 'getPoliticiansDossierTable',
    config: {
      method: 'get',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args.payload.token}`,
      },
      params: {
        page: args.payload.params.page,
      },
    },
    ...args,
  });

const fetchPoliticiansDossierGraph: any = (args) =>
  callAPI({
    url: 'getPoliticiansDossierGraph',
    config: {
      method: 'get',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args.payload.token}`,
      },
      params: {
        politician_id: args.payload.params.politician_id,
      },
    },
    ...args,
  });

const fetchChoices: any = (args) =>
  callAPI({
    url: 'getUserElectionListVotes',
    config: {
      method: 'get',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args.payload.token}`,
      },
    },
    ...args,
  });

const APIs = {
  fetchUserData,
  fetchBrowsingHistory,
  fetchSubscriptions,
  fetchDossierTable,
  fetchPoliticiansDossierGraph,
  fetchChoices,
};

export const userAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...APIs,
    },
    dispatch
  );
};
