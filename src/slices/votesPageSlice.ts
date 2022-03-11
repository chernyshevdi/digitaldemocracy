import { createSlice, PayloadAction, bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

interface ElectionsI {
  data?: any;
}

interface CommonId {
  id?: number;
}

interface userElectionsI {
  userElections?: any;
}

interface dataElelctionsI {
  dataElelctions?: any;
}

interface SortGeography {
  country_idArray: Array<CommonId>;
  region_idArray: Array<CommonId>;
  city_idArray: Array<CommonId>;
}

interface SortDate {
  date: string;
  isOnlyBefore: boolean;
}

interface SliceState {
  data: any,
  userElections: any,
  dataElelctions: any,
  sort_geography?: SortGeography;
  geography: any;
  sort_date?: SortDate,
}

const initialState: SliceState = {
  data: {} as ElectionsI,
  userElections: {} as userElectionsI,
  dataElelctions: {} as dataElelctionsI,
  geography: {},
  sort_geography: {} as SortGeography,
  sort_date: {} as SortDate,
};

export const votesPageSlice = createSlice({
  name: 'votesPageSlice',
  initialState,
  reducers: {
    setVotes(state: SliceState, action) {
      state.data = action.payload;
    },
    setdataElelctions(state: SliceState, action) {
      state.dataElelctions = action.payload;
    },
    setUserElections(state: SliceState, action) {
      state.userElections = action.payload;
    },
    resetEctions(state: SliceState) {
      state = initialState;
    },
    setSortGeography(state, action) {
      state.sort_geography = { ...state.sort_geography, ...action.payload };
    },
    setCountryGeography(state: SliceState, action) {
      state.geography.countries = action.payload;
    },
    setCitiesGeography(state: SliceState, action) {
      state.geography.cities = action.payload;
    },
    setRegionsGeography(state: SliceState, action) {
      state.geography.regions = action.payload;
    },
    setSortDate(state: SliceState, action) {
      state.sort_date.date = action.payload;
    },
    setSortOnlyBefore(state: SliceState, action) {
      state.sort_date.isOnlyBefore = action.payload;
    }
  }
});
interface Store {
  votes: SliceState;
}
export const votesSelectors = {
  getVotes: () => (state: Store) => state.votes.data,
  getUserVotes: () => (state: Store) => state.votes.userElections,
  getDataElections: () => (state: Store) => state.votes.dataElelctions,
};

export const electionsActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...votesPageSlice.actions,
    },
    dispatch
  );
};
