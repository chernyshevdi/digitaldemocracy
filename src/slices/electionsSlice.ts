import { createSlice, PayloadAction, bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { APIStatus } from '../lib/axiosAPI';
import { PartyI } from './politicianSlice';

interface CountryI {
  id: number;
  title: string;
}

interface RegionI {
  id: number;
  title: string;
  type?: string;
}

interface CityI {
  id: number;
  title: string;
}

export interface CurrentElection {
  id?: number;
  votes: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  country: CountryI;
  region: RegionI;
  city: CityI;
  image: string;
  link: string;
  source_link: string;
  number_of_views: number;
  is_display: boolean;
  is_silence?: boolean;
  turnout_count?: number;
}

export interface PoliticiansI {
  politician?: any;
  voteStatisticsInOtherRegion?: {
    number_of_votes_users: any;
    rating: any;
    regionElection: any;
  };
}

interface numberOfVotesElectionI {
  numberOfUsersFromRegion: number;
  numberOfVotedUsers: number;
  totalElectorate: number;
}

export interface StatusI {
  status: APIStatus;
}

export interface ElectionsSingleI {
  election?: CurrentElection;
  numberOfVotesElection?: numberOfVotesElectionI;
  regionElection?: {
    region?: RegionI;
    type?: string
  };
  news?: any;
  winners?: any;
  outsideWinners?: any;
  politicians?: Array<PoliticiansI>;
  parties?: Array<PartyI>;
  isMorePages?: boolean;
  isMorePageParticipants?: boolean;
  isAfter?: boolean;
  isBefore?: boolean;
  isNow?: boolean;
}

interface SliceState {
  data?: ElectionsSingleI;
  status?: APIStatus;
  statusVoice?: APIStatus;
}

const initialState: SliceState = {
  status: 'Initial' as APIStatus,
};

export const electionsSlice = createSlice({
  name: 'electionsSlice',
  initialState,
  reducers: {
    startFetch(state: SliceState) {
      state.status = APIStatus.Loading;
    },
    setData(state: SliceState, action) {
      state.data = action.payload;
      state.status = APIStatus.Success;
    },
    successFetch(state: SliceState) {
      state.status = APIStatus.Success;
    },
    successVoiceFetch(state: SliceState) {
      state.statusVoice = APIStatus.Success;
    },
    voiceFetch(state: SliceState) {
      state.statusVoice = null;
    },
    failFetch(state: SliceState) {
      state.status = APIStatus.Failure;
    },
    resetEctions(state: SliceState) {
      state = initialState;
    },
  },
});

interface Store {
  elections: SliceState;
}

export const electionsSelector = {
  getData: () => (state: Store) => state.elections.data,
  getStatus: () => (state: Store) => state.elections.status,
  getStatusVoice: () => (state: Store) => state.elections.statusVoice,
};

export const electionsActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...electionsSlice.actions,
    },
    dispatch
  );
};

const { actions } = electionsSlice;

export const {
  startFetch,
  successVoiceFetch,
  voiceFetch,
  failFetch,
} = actions;
