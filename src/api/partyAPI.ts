import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { APIRequest, callAPI } from '../lib/axiosAPI';
import { PoliticianInfoI } from '../slices/politicianSlice';

interface PartyRequest {
  short_link?: string;
}
interface PartyResponse {
  data?: string;
}

interface QueryParamsI {
  orderBy: string;
  sortBy: string;
  token?: string;
  page?: number;
}

interface PartyPoliticiansRequest {
  party_id?: string;
  token?: string;
  params?: QueryParamsI;
}

const fetchPartyPoliticians: APIRequest<PartyPoliticiansRequest> = (args) => {
  return callAPI({
    url: `partyPoliticians/?party_id=${args.payload.party_id}`,
    config: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args.payload.token}`,
      },
      params: args.payload.params,
    },
    ...args,
  });
};

const fetchPartyInfo: APIRequest<PartyRequest, PartyResponse> = (args) => {
  return callAPI({
    url: `party/${args.payload.short_link}`,
    config: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
    ...args,
  });
};

const APIs = {
  fetchPartyInfo,
  fetchPartyPoliticians,
};

export const partyAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...APIs,
    },
    dispatch
  );
};
