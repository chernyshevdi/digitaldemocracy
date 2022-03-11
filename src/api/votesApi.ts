import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { callAPI } from '../lib/axiosAPI';

const fetchListElections = (args) => {
  return callAPI({
    url: 'getListElections',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args.payload.token}`,
      },
      params: args.payload,
    },
    ...args,
  });
};
const fetchUserElections = (args) => {
  return callAPI({
    url: 'getUserElections',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args.payload.token}`,
      },
      params: args.payload,
    },
    ...args,
  });
};

export const ListelectionsAPI = {
  fetchListElections,
  fetchUserElections
};

export const votesAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...ListelectionsAPI,
    },
    dispatch
  );
};
