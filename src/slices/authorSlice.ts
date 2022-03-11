import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { APIStatus } from 'src/lib/axiosAPI';
import { mockNews } from '../static/static';

export interface AuthorDataI {
  id?: number;
  name?: string;
  photo?: string;
  is_subscribed?: boolean;
  percent?: string;
  link?: string;
  description?: string;
  vote_groups?: Array<GraphicDataI>;
  number_of_subscribers?: number;
  source_link?: string;
  trust?: string;
  rating?: string;
  short_link?: string;
  place?: number;
  country?: { title: [] };
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
  type?: string;
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
  name?: string;
  percent?: string;
}

interface SubscriptionI {
  status?: APIStatus;
  isSubscribed?: boolean;
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
  data?: AuthorDataI;
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
  statisticStatus: 'Initial' as APIStatus,
  data: {},
  news: {},
  sort_direction: '',
  sort_field: '',
  page: null,
  statistic: [],
  subscribeStatus: 'Initial' as APIStatus,
};

export const authorSlice = createSlice({
  name: 'authorSlice',
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
    startFetchAuthorData(state) {
      state.status = APIStatus.Loading;
    },
    successFetchAuthorData(state, action) {
      state.data = action.payload;
      state.status = APIStatus.Success;
    },
    failFetchAuthorData(state) {
      state.status = APIStatus.Failure;
    },
    resetData(state) {
      state.data = initialState.data;
    },
    startFetchAuthorNews(state) {
      state.newsStatus = APIStatus.Loading;
    },
    successFetchAuthorNews(state, action) {
      state.news = action.payload;
      state.newsStatus = APIStatus.Success;
    },
    failFetchAuthorNews(state) {
      state.newsStatus = APIStatus.Failure;
    },
    resetNews(state) {
      state.news = initialState.news;
      state.newsStatus = APIStatus.Initial;
    },
    startAuthorSubscribe(state) {
      state.subscribeStatus = APIStatus.Loading;
    },
    successAuthorSubscribe(state) {
      state.subscribeStatus = APIStatus.Success;
      state.data.is_subscribed = true;
      state.data.number_of_subscribers += 1;
    },
    failAuthorSubscribe(state) {
      state.subscribeStatus = APIStatus.Failure;
    },
    successAuthorUnsubscribe(state) {
      state.subscribeStatus = APIStatus.Success;
      state.data.is_subscribed = false;
      state.data.number_of_subscribers -= 1;
    },
    startFetchAuthorStatistic(state) {
      state.statisticStatus = APIStatus.Loading;
    },
    successFetchAuthorStatistic(state, action) {
      state.statistic = action.payload;
      state.statisticStatus = APIStatus.Success;
    },
    failFetchAuthorStatistic(state) {
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
  author: SliceState;
}

export const authorSelectors = {
  getAuthorInfo: () => (state: Store) => state.author.data,
  getNews: () => (state: Store) => state.author.news,
  getAdditionalInformation: () => (state: Store) => state.author.additionalInformation,
};

export const authorActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...authorSlice.actions,
    },
    dispatch
  );
};
