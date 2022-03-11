import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { callAPI } from '../lib/axiosAPI';

const fetchSearch = (args) => {
  return callAPI({
    url: 'search',
    config: {
      headers: {
        Accept: 'application/json',
      },
      // params: args.payload.params,
    },
    ...args,
  });
};

const fetchSearchNews = (args) => {
  return callAPI({
    url: 'search/getNews',
    config: {
      headers: {
        Accept: 'application/json',
      },
      // params: args.payload.params,
    },
    ...args,
  });
};

const fetchSearchPolitician = (args) => {
  return callAPI({
    url: 'search/getPolitician',
    config: {
      headers: {
        Accept: 'application/json',
      },
      // params: args.payload.params,
    },
    ...args,
  });
};

const fetchSearchMedia = (args) => {
  return callAPI({
    url: 'search/getMedia',
    config: {
      headers: {
        Accept: 'application/json',
      },
      // params: args.payload.params,
    },
    ...args,
  });
};

const fetchSearchParty = (args) => {
  return callAPI({
    url: 'search/getParty',
    config: {
      headers: {
        Accept: 'application/json',
      },
      // params: args.payload.params,
    },
    ...args,
  });
};

const fetchSearchAuthor = (args) => {
  return callAPI({
    url: 'search/getAuthor',
    config: {
      headers: {
        Accept: 'application/json',
      },
      // params: args.payload.params,
    },
    ...args,
  });
};

const APIs = {
  fetchSearch,
  fetchSearchNews,
  fetchSearchPolitician,
  fetchSearchMedia,
  fetchSearchParty,
  fetchSearchAuthor
};

export const searchAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators({
    ...APIs,
  },
  dispatch);
};
