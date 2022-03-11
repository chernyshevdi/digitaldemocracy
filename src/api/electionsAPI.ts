import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { APIRequest, callAPI } from '../lib/axiosAPI';

const fetchElections = (args) =>
  callAPI({
    url: `getElection/${args.payload.link}`,
    config: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${args.payload.token}`,
      },
    },
    ...args,
  });

const fetchVoiceAdd = (args) =>
  callAPI({
    url: 'addVoteOnElection',
    config: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${args.payload.token}`,
      },
    },
    ...args,
  });

const fetchVoiceDelete = (args) =>
  callAPI({
    url: 'deleteVoteOnElection',
    config: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${args.payload.token}`,
      },
    },
    ...args,
  });

export const electionsAPI = {
  fetchElections,
  fetchVoiceAdd,
  fetchVoiceDelete
};

export const electionsAPIActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...electionsAPI,
    },
    dispatch
  );
};
