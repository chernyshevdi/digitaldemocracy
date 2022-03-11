import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { APIStatus } from 'src/lib/axiosAPI';
import { mockNews } from '../static/static';

export interface MassMediaDataI {
  id?: number;
  name?: string;
  photo?: string;
  percent?: string;
  link?: string;
  description?: string;
  vote_groups?: Array<GraphicDataI>;
  is_subscribed?: boolean;
  number_of_subscribers?: number;
  source_link?: string;
  trust?: string;
  rating?: string;
  short_link?: string;
  place?: number;
}

export interface GraphicDataI {
  id: number;
  width: number;
  color: string;
  zIndex: number;
}

export interface NewsI {
  news?: Array<NewsArrayI>;
  isMorePages?: boolean;
}

interface NewsArrayI {
  id?: number;
  region?: RegionI;
  media?: MediaI;
  author?: AuthorI;
  hashtags?: Array<HashtagsI>;
  votes?: number;
  title?: string;
  image?: string;
  publication_date?: string;
  link?: string;
  short_link?: string;
  source_link?: string;
  number_of_views?: number;
}

interface RegionI {
  id?: number;
  name_with_type?: string;
  federal_district?: string;
}

interface MediaI {
  id: number;
  name: string;
  photo: string;
  percent: string;
}

interface AuthorI {
  id: number;
  title: string;
  photo: string;
  percent: string;
}

interface HashtagsI {
  id?: number;
  title?: string;
}

interface StatisticI {
  id?: number;
  politician?: { name: string };
  influence?: string;
  number_of_news?: number;
}
export interface AdditionalInformation {
  id: number;
  link: string;
  title: string;
}

interface SliceState {
  status?: APIStatus;
  newsStatus?: APIStatus;
  subscribeStatus?: APIStatus;
  statisticStatus?: APIStatus;
  data?: MassMediaDataI;
  news?: NewsI;
  sort_direction?: string;
  sort_field?: string;
  page?: number;
  statistic?: Array<StatisticI>;
  additionalInformation?: Array<AdditionalInformation>;
}

const initialState: SliceState = {
  status: 'Initial' as APIStatus,
  newsStatus: 'Initial' as APIStatus,
  subscribeStatus: 'Initial' as APIStatus,
  statisticStatus: 'Initial' as APIStatus,
  data: {},
  news: {},
  sort_direction: '',
  sort_field: '',
  page: null,
  statistic: [],
};

export const massMediaSlice = createSlice({
  name: 'massMediaSlice',
  initialState,
  reducers: {
    setSortDirection(state, action) {
      state.sort_direction = action.payload;
    },
    setSortField(state, action) {
      state.sort_field = action.payload;
    },
    resetSort(state) {
      state.sort_direction = initialState.sort_direction;
      state.sort_field = initialState.sort_field;
      state.page = initialState.page;
    },
    startFetchMassMediaData(state) {
      state.status = APIStatus.Loading;
    },
    successFetchMassMediaData(state, action) {
      state.data = action.payload;
      state.status = APIStatus.Success;
    },
    failFetchMassMediaData(state) {
      state.status = APIStatus.Failure;
    },
    resetData(state) {
      state.data = initialState.data;
      state.status = APIStatus.Initial;
    },
    startFetchMassMediaNews(state) {
      state.newsStatus = APIStatus.Loading;
    },
    successFetchMassMediaNews(state, action) {
      state.news = action.payload;
      state.newsStatus = APIStatus.Success;
    },
    failFetchMassMediaNews(state) {
      state.newsStatus = APIStatus.Failure;
    },
    resetNews(state) {
      state.news = initialState.news;
      state.newsStatus = APIStatus.Initial;
    },
    startMassmediaSubscribe(state) {
      state.subscribeStatus = APIStatus.Loading;
    },
    successMassmediaSubscribe(state) {
      state.subscribeStatus = APIStatus.Success;
      state.data.is_subscribed = true;
      state.data.number_of_subscribers += 1;
    },
    failMassmediaSubscribe(state) {
      state.subscribeStatus = APIStatus.Failure;
    },
    successMassmediaUnsubscribe(state) {
      state.subscribeStatus = APIStatus.Success;
      state.data.is_subscribed = false;
      state.data.number_of_subscribers -= 1;
    },
    startFetchMassMediaStatistic(state) {
      state.statisticStatus = APIStatus.Loading;
    },
    successFetchMassMediaStatistic(state, action) {
      state.statistic = action.payload;
      state.statisticStatus = APIStatus.Success;
    },
    failFetchMassMediaStatistic(state) {
      state.statisticStatus = APIStatus.Failure;
    },
    resetStatistic(state) {
      state.statistic = initialState.statistic;
      state.statisticStatus = APIStatus.Initial;
    },
    setAdditionalInformation(state: SliceState, action: PayloadAction<Array<AdditionalInformation>>) {
      state.additionalInformation = action.payload;
    },
  },
});

interface Store {
  massmedia: SliceState;
}

export const massmediaSelectors = {
  getMassMediaInfo: () => (state: Store) => state.massmedia.data,
  getNews: () => (state: Store) => state.massmedia.news,
  getAdditionalInformation: () => (state: Store) => state.massmedia.additionalInformation,
};

export const massmediaActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...massMediaSlice.actions,
    },
    dispatch
  );
};
