import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { PartyI } from './politicianSlice';

interface PoliticiansPartyInfoI {
  politicians?: Array<any>;
  isMorePages?: boolean;
}
interface SliceState {
  data?: PartyI;
  sort_direction?: string;
  sort_field?: string;
  politiciansPartyInfo?: PoliticiansPartyInfoI;
}

const initialState: SliceState = {
  data: {},
  sort_direction: '',
  sort_field: '',
  politiciansPartyInfo: {
    politicians: [],
    isMorePages: false,
  }
};

export const partySlice = createSlice({
  name: 'partySlice',
  initialState,
  reducers: {
    setPartyInfo(state: SliceState, action: PayloadAction<PartyI>) {
      state.data = action.payload;
    },
    setPartyPoliticians(state: SliceState, action: PayloadAction<PoliticiansPartyInfoI>) {
      state.politiciansPartyInfo = {
        politicians: [
          ...action.payload.politicians
        ],
        isMorePages: action.payload.isMorePages,
      };
    },
    setSortDirection(state, action) {
      state.sort_direction = action.payload;
    },
    setSortField(state, action) {
      state.sort_field = action.payload;
    },
    setIsSubscribe(state: SliceState, action) {
      const { id, isSubscribe } = action.payload;
      state.politiciansPartyInfo.politicians.find((item) => item.id === id).is_subscribed = !isSubscribe;
    },
  },
});

interface Store {
  party: SliceState;
}

export const partySelectors = {
  getPartyInfo: () => (state: Store) => state.party.data,
  getPartyPoliticians: () => (state: Store) => state.party.politiciansPartyInfo,
};

export const partyActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...partySlice.actions,
    },
    dispatch
  );
};
