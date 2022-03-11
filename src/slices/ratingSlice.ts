import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { PoliticianInfoI, PartyI } from './politicianSlice';
import { AuthorDataI } from './authorSlice';
import { MassMediaDataI } from './massMediaSlice';

interface CommonId {
  id?: number;
}

interface PoliticiansI {
  politicians?: Array<PoliticianInfoI>;
  isMorePages?: boolean;
}

interface AuthorsI {
  authors?: Array<AuthorDataI>;
  isMorePages?: boolean;
}

interface PartiesI {
  parties: Array<PartyI>;
  isMorePages?: boolean;
}

interface MediaI {
  media?: Array<MassMediaDataI>;
  isMorePages?: boolean;
}
interface SortGeography {
  country_politician_idArray: Array<CommonId>;
  region_politician_idArray: Array<CommonId>;
  city_politician_idArray: Array<CommonId>;
}
interface SortVote {
  country_user_idArray: Array<CommonId>;
  region_user_idArray: Array<CommonId>;
  city_user_idArray: Array<CommonId>;
}
interface SliceState {
  sort_direction?: string;
  sort_field?: string;
  sort_geography?: SortGeography;
  sort_vote?: SortVote;
  politicians?: PoliticiansI;
  massMedia?: MediaI;
  authors?: AuthorsI;
  parties?: PartiesI;
  countries_geography?: any;
  regions_geography?: any;
  cities_geography?: any;
  countries_vote?: any;
  regions_vote?: any;
  cities_vote?: any;
  geography: any;
  vote: any;
}

const initialState: SliceState = {
  sort_direction: '',
  sort_field: '',
  sort_geography: {} as SortGeography,
  geography: {},
  vote: {},
  sort_vote: {} as SortVote,
  politicians: {} as PoliticiansI,
  massMedia: {} as MediaI,
  authors: {} as AuthorsI,
  parties: {} as PartiesI,
  countries_geography: [],
  regions_geography: [],
  cities_geography: [],
  countries_vote: [],
  regions_vote: [],
  cities_vote: [],
};

export const ratingSlice = createSlice({
  name: 'ratingSlice',
  initialState,
  reducers: {
    setPoliticians(state: SliceState, action: PayloadAction<PoliticiansI>) {
      state.politicians = action.payload;
    },
    addPoliticians(state: SliceState, action: PayloadAction<PoliticiansI>) {
      state.politicians = {
        politicians: [
          ...state.politicians.politicians,
          ...action.payload.politicians
        ],
        isMorePages: action.payload.isMorePages,
      };
    },
    setAuthors(state: SliceState, action: PayloadAction<AuthorsI>) {
      state.authors = action.payload;
    },
    addAuthors(state: SliceState, action: PayloadAction<AuthorsI>) {
      state.authors = {
        authors: [
          ...state.authors.authors,
          ...action.payload.authors
        ],
        isMorePages: action.payload.isMorePages,
      };
    },
    setMedia(state: SliceState, action: PayloadAction<MediaI>) {
      state.massMedia = action.payload;
    },
    addMedia(state: SliceState, action: PayloadAction<MediaI>) {
      state.massMedia = {
        media: [
          ...state.massMedia.media,
          ...action.payload.media
        ],
        isMorePages: action.payload.isMorePages,
      };
    },
    setParties(state: SliceState, action: PayloadAction<PartiesI>) {
      state.parties = action.payload;
    },
    addParties(state: SliceState, action: PayloadAction<PartiesI>) {
      state.parties = {
        parties: [
          ...state.parties.parties,
          ...action.payload.parties,
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
    setSortGeography(state, action) {
      state.sort_geography = { ...state.sort_geography, ...action.payload };
    },
    setSortVote(state, action) {
      state.sort_vote = { ...state.sort_vote, ...action.payload };
    },
    setCountryGeography(state: SliceState, action) {
      state.geography.countries = action.payload;
    },
    setRegionsGeography(state: SliceState, action) {
      state.geography.regions = action.payload;
    },
    setCitiesGeography(state: SliceState, action) {
      state.geography.cities = action.payload;
    },
    setCountryVote(state: SliceState, action) {
      state.vote.countries = action.payload;
    },
    setRegionsVote(state: SliceState, action) {
      state.vote.regions = action.payload;
    },
    setCitiesVote(state: SliceState, action) {
      state.vote.cities = action.payload;
    },
    setIsSubscribePoliticians(state: SliceState, action) {
      const { id, isSubscribe } = action.payload;
      state.politicians.politicians.find((item) => item.id === id).is_subscribed = !isSubscribe;
    },
    setIsSubscribeAuthors(state: SliceState, action) {
      const { id, isSubscribe } = action.payload;
      state.authors.authors.find((item) => item.id === id).is_subscribed = !isSubscribe;
    },
    setIsSubscribeMedia(state: SliceState, action) {
      const { id, isSubscribe } = action.payload;
      state.massMedia.media.find((item) => item.id === id).is_subscribed = !isSubscribe;
    },
    // resetFilterForGeography(state: SliceState) {
    //   state.sort_vote = {
    //     country_user_idArray: null,
    //     region_user_idArray: null,
    //     city_user_idArray: null,
    //   };
    // },
  },
});

interface Store {
  rating: SliceState;
}

export const ratingSelectors = {
  getPoliticians: () => (state: Store) => state.rating.politicians,
};

export const ratingActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...ratingSlice.actions,
    },
    dispatch
  );
};
