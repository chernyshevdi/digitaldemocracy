import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { APIRequest, callAPI } from '../lib/axiosAPI';

export interface CountryI {
  id: number;
  title: string;
}

const fetchRatingPoliticiansArray = (args) => {
  // console.log(args.payload);
  return callAPI({
    url: 'getRatingPage/politiciansByArray',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args.payload.token}`,
      },
    },
    ...args,
  });
};

const fetchRatingPoliticians = (args) => {
  return callAPI({
    url: 'getRatingPage/politicians',
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

const fetchRatingAuthors = (args) => {
  return callAPI({
    url: 'getRatingPage/authors',
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

const fetchRatingMassMedia = (args) => {
  return callAPI({
    url: 'getRatingPage/media',
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

const fetchRatingParties = (args) => {
  return callAPI({
    url: 'getRatingPage/parties',
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

const subscribeAuthor = (args) =>
  callAPI({
    url: 'subscribeToAuthor',
    config: {
      headers: {
        Authorization: `Bearer ${args.payload.token}`,
      },
    },
    ...args,
  });

const unsubscribeAuthor = (args) =>
  callAPI({
    url: 'unsubscribeFromAuthor',
    config: {
      headers: {
        Authorization: `Bearer ${args.payload.token}`,
      },
    },
    ...args,
  });

const subscribeMedia = (args) =>
  callAPI({
    url: 'subscribeToMedia',
    config: {
      headers: {
        Authorization: `Bearer ${args.payload.token}`,
      },
    },
    ...args,
  });

const unsubscribeMedia = (args) =>
  callAPI({
    url: 'unsubscribeFromMedia',
    config: {
      headers: {
        Authorization: `Bearer ${args.payload.token}`,
      },
    },
    ...args,
  });
const getCountries: APIRequest<{}, Array<CountryI>> = (args) =>
  callAPI({
    url: 'getCountries',
    config: {
      method: 'GET'
    },
    ...args,
    nestedResponseType: false
  });

const getRegionsArray = (args) => {
  return callAPI({ url: 'getRegionsByArray',
    config: { method: 'POST',
    },
    ...args,
    nestedResponseType: false });
};

const getRegions = (args) => {
  return callAPI({ url: 'getRegions',
    config: { method: 'get',
      params: args.params
    },
    ...args,
    nestedResponseType: false });
};

const getCitiesArray = (args) => {
  return callAPI({ url: 'getCitiesByArray',
    config: { method: 'POST' },
    ...args,
    nestedResponseType: false });
};

const getCities = (args) => {
  return callAPI({ url: 'getCities',
    config: { method: 'get',
      params: args.params
    },
    ...args,
    nestedResponseType: false });
};

const APIs = {
  fetchRatingPoliticiansArray,
  fetchRatingPoliticians,
  fetchRatingAuthors,
  fetchRatingMassMedia,
  subscribeAuthor,
  unsubscribeAuthor,
  subscribeMedia,
  unsubscribeMedia,
  fetchRatingParties,
  getCountries,
  getRegionsArray,
  getRegions,
  getCitiesArray,
  getCities,
};

export const ratingAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...APIs,
    },
    dispatch
  );
};
