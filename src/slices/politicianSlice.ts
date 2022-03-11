import { positions } from '@material-ui/system';
import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { newsAPI } from 'src/api/newsAPI';
import { APIStatus } from 'src/lib/axiosAPI';
import { NewsI } from './homeSlice';

interface Election_vote_statisticsI {
  count_voted_users_on_election: number;
  is_user_has_vote: boolean;
  percent_rating_election: string;
}

export interface PoliticianInfoI {
  id?: number;
  name?: string;
  english_name?: string;
  photo?: string;
  is_subscribed?: boolean;
  percent?: string;
  vote_groups?: Array<GraphicDataI>;
  number_of_subscribers?: number;
  party?: PartyI;
  party_logo?: string;
  position?: string | null;
  list_other_position: Array<PositionHistoryI>;
  list_active_position?: Array<PositionHistoryI>;
  list_position?: Array<PositionHistoryI>;
  age?: number;
  city?: any;
  trust?: string;
  link?: string;
  rating?: string;
  short_link?: string;
  place?: number;
  country?: any;
  region?: any;
  city_full?: any;
  position_count?: number;
  election_vote_statistics?: Election_vote_statisticsI;
  type?: any;
  level?: any;
}

export interface PartyI {
  id?: number;
  name?: string;
  logo?: string;
  politicians_count?: number | null;
  short_link?: string;
  link?: string;
  percent?: number;
  position?: number;
  source_link?: string;
  rating?: number;
  place?: number;
  election_vote_statistics?: Election_vote_statisticsI;
  country?: { title: [] };
}

export interface GraphicDataI {
  id: number;
  width: number;
  color: string;
  zIndex: number;
}

export interface PositionHistoryI {
  id: number;
  position: string;
  type: string;
  percent: string;
  years: string;
}

export interface PromiseI {
  id?: number;
  text: string;
  link: string;
  youtube?: string;
  promise_date: string;
  is_user_liked?: boolean;
  is_user_disliked?: boolean;
  number_of_likes?: number;
  number_of_dislikes?: number;
}

export interface PoliticianBillsI {
  title: string;
  source_link: string;
  publication_date: string;
  id: number;
  is_user_liked?: boolean;
  is_user_disliked?: boolean;
  number_of_likes?: number;
  number_of_dislikes?: number;
}

export interface MetricI {
  title: string;
  text: string;
  icon: string;
  color: string;
}

export interface VoicesRegionI {
  country_with_type: any;
  region_with_type: any;
  total: number;
}

export interface RatingStatisticsI {
  metrics: Array<MetricI>;
  voicesByRegion: Array<VoicesRegionI>;
  numberOfVotes: {
    numberOfVotedUsers: number;
    numberOfUsersFromRegion: number;
    totalElectorate: number;
  };
}
export interface VoteCountStatisticsI {
  numberOfVotes: {
    numberOfVotedUsers: any;
    numberOfUsersFromRegion: any;
    totalElectorate: any;
  };
}

export interface PositionsDescriptionI {
  id: number;
  position: string;
  description: string | null;
  link: string | null;
  is_active: boolean;
}
export interface StatisticI {
  id: number;
  politician_id: number;
  link: string;
  source_link: string;
  is_user_liked?: boolean;
  is_user_disliked?: boolean;
  number_of_likes?: number;
  number_of_dislikes?: number;
}

export interface LikesI {
  [U: number]: StatusI;
}

export interface StatusI {
  status: APIStatus;
}

export interface AdditionalInformation {
  id: number;
  link: string;
  title: string;
}

interface SliceState {
  data?: PoliticianInfoI;
  news?: any;
  promises?: Array<PromiseI>;
  chartData?: any;
  ratingStatistics?: RatingStatisticsI;
  history?: Array<PositionHistoryI>;
  positionDescription?: Array<PositionsDescriptionI>;
  statistic?: Array<StatisticI>;
  bills?: Array<PoliticianBillsI>;
  promisesLikeStatus?: LikesI;
  promisesDislikeStatus?: LikesI;
  billsLikeStatus?: LikesI;
  billsDislikeStatus?: LikesI;
  statisticLikeStatus?: LikesI;
  statisticDislikeStatus?: LikesI;
  additionalInformation?: Array<AdditionalInformation>;
  infoGrapghicData: {
    countries: any;
    regions: any;
    cities: any;
    rating: any;
    vote_groups: any;
  };
  numberOfVotes?: {
    numberOfVotedUsers: any;
    numberOfUsersFromRegion: any;
    totalElectorate: any;
  };
  electorate?: {
    numberOfVotedUsers: any;
    numberOfUsersFromRegion: any;
    totalElectorate: any;
  };
}

export interface NewsWithPercentI extends NewsI {
  percent: number;
}

const initialState: SliceState = {
  news: { page: 1, start_date: 0, end_date: 0 },
  chartData: {},
  promisesLikeStatus: {},
  promisesDislikeStatus: {},
  billsLikeStatus: {},
  billsDislikeStatus: {},
  statisticLikeStatus: {},
  statisticDislikeStatus: {},
  infoGrapghicData: {
    countries: [],
    regions: [],
    cities: [],
    rating: null,
    vote_groups: [],
  },
  electorate: {
    numberOfVotedUsers: null,
    numberOfUsersFromRegion: null,
    totalElectorate: null,
  },
  numberOfVotes: {
    numberOfVotedUsers: null,
    numberOfUsersFromRegion: null,
    totalElectorate: null,
  },
};

export const politicianSlice = createSlice({
  name: 'politicianSlice',
  initialState,
  reducers: {
    setNews(state: SliceState, action) {
      state.news = {
        ...state.news,
        news: [...action.payload.news],
        isMorePages: action.payload.isMorePages,
      };
      // state.chartData = [...action.payload].map((item) => [new Date(item.publication_date), item.percent]);
    },
    setPoliticianInfo(state: SliceState, action: PayloadAction<PoliticianInfoI>) {
      state.data = action.payload;
    },
    setHistory(state: SliceState, action: PayloadAction<Array<PositionHistoryI>>) {
      state.history = action.payload;
    },
    setPromises(state: SliceState, action: PayloadAction<Array<PromiseI>>) {
      state.promises = action.payload;
    },
    resetPromises(state: SliceState, action: PayloadAction<Array<PromiseI>>) {
      state.promises = initialState.promises;
    },
    resetBills(state: SliceState, action: PayloadAction<Array<PromiseI>>) {
      state.bills = initialState.bills;
    },
    resetIncomeStatistic(state: SliceState, action: PayloadAction<Array<PromiseI>>) {
      state.statistic = initialState.statistic;
    },
    setBills(state: SliceState, action: PayloadAction<Array<PoliticianBillsI>>) {
      state.bills = action.payload;
    },
    setIsSubscribe(state: SliceState, action: PayloadAction<boolean>) {
      state.data.is_subscribed = action.payload;
      state.data.number_of_subscribers = action?.payload
        ? state.data.number_of_subscribers + 1
        : state.data.number_of_subscribers - 1;
    },
    setRatingStatistics(state: SliceState, action: PayloadAction<RatingStatisticsI>) {
      state.ratingStatistics = action.payload;
    },

    setVoteCountStatistics(state: SliceState, action) {
      state.numberOfVotes = action.payload;
    },
    setPositionsDescription(state: SliceState, action: PayloadAction<Array<PositionsDescriptionI>>) {
      state.positionDescription = action.payload.filter((item) => item.is_active === true);
    },
    setPoliticianAdditionalInformation(state: SliceState, action: PayloadAction<Array<AdditionalInformation>>) {
      state.additionalInformation = action.payload;
    },
    setStatistic(state: SliceState, action: PayloadAction<Array<StatisticI>>) {
      state.statistic = action.payload;
    },
    startLike(state, action) {
      state[`${action.payload.field}LikeStatus`][action.payload.id] = { status: APIStatus.Loading };
    },
    successLike(state, action) {
      const field = state[action.payload.field];
      state[`${action.payload.field}LikeStatus`][action.payload.id] = { status: APIStatus.Success };
      field[action.payload.index].is_user_liked = action.payload.status;
      field[action.payload.index].number_of_likes = action.payload.status
        ? field[action.payload.index].number_of_likes + 1
        : field[action.payload.index].number_of_likes - 1;
    },
    failLike(state, action) {
      state[`${action.payload.field}LikeStatus`][action.payload.id] = { status: APIStatus.Failure };
    },
    startDislike(state, action) {
      state[`${action.payload.field}DislikeStatus`][action.payload.id] = { status: APIStatus.Loading };
    },
    successDislike(state, action) {
      const field = state[action.payload.field];
      state[`${action.payload.field}DislikeStatus`][action.payload.id] = { status: APIStatus.Success };
      field[action.payload.index].is_user_disliked = action.payload.status;
      field[action.payload.index].number_of_dislikes = action.payload.status
        ? field[action.payload.index].number_of_dislikes + 1
        : field[action.payload.index].number_of_dislikes - 1;
    },
    failDislike(state, action) {
      state[`${action.payload.field}DislikeStatus`][action.payload.id] = { status: APIStatus.Failure };
    },
    setChartData(state, action) {
      state.chartData = action.payload;
    },
    setMorePage(state) {
      state.news = { ...state.news, page: state.news.page + 1 };
    },
    setDate(state, action) {
      state.news = { ...state.news, start_date: action.payload.min, end_date: action.payload.max };
    },
    setReset(state) {
      state.news = {
        ...state.news,
        isMorePages: false,
        page: 1,
      };
    },
    setCountries(state, action) {
      state.infoGrapghicData.countries = action.payload;
    },
    setRegions(state, action) {
      state.infoGrapghicData.regions = action.payload;
    },
    setCities(state, action) {
      state.infoGrapghicData.cities = action.payload;
    },
    setRating(state, action) {
      state.infoGrapghicData.rating = action.payload;
    },
    setVotesGroup(state, action) {
      state.infoGrapghicData.vote_groups = action.payload;
    },
    setElectorate(state, action) {
      state.electorate = action.payload;
    },
  },
});

interface Store {
  politician: SliceState;
}

export const politicianSelectors = {
  getNews: () => (state: Store) => state.politician.news,
  getChartData: () => (state: Store) => state.politician.chartData,
  getIsSubscribe: () => (state: Store) => state.politician.data?.is_subscribed,
  getPoliticianInfo: () => (state: Store) => state.politician.data,
  getPositionHistory: () => (state: Store) => state.politician.history,
  getPositionPromises: () => (state: Store) => state.politician.promises,
  getRatingStatistic: () => (state: Store) => state.politician.ratingStatistics,
  getVoteCountStatistics: () => (state: Store) => state.politician.numberOfVotes,
  getPositionsDescription: () => (state: Store) => state.politician.positionDescription,
  getStatistic: () => (state: Store) => state.politician.statistic,
  getBills: () => (state: Store) => state.politician.bills,
  getPoliticianAdditionalInformation: () => (state: Store) => state.politician.additionalInformation,
  getElectorate: () => (state: Store) => state.politician.electorate,
};

export const politicianActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...politicianSlice.actions,
    },
    dispatch
  );
};
