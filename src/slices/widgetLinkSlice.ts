import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { APIStatus } from '../lib/axiosAPI';

export interface RegionI {
  id: number,
  name_with_type: string,
  federal_district: string
}

interface MediaI {
  id: number,
  name: string,
  photo: string,
  percent: string
}

interface AuthorI {
  id: number,
  title: string,
  photo: string,
  percent: string
}

export interface NewTopicsI {
  id: number,
  title: string
}

export interface HashtagsI {
  id: number,
  title: string
}

export interface NewsArrayI {
  id?: number,
  region?: RegionI,
  media?: MediaI,
  author?: AuthorI,
  newTopics?: Array<NewTopicsI>,
  hashtags?: Array<HashtagsI>,
  votes?: number,
  title?: string,
  image?: string,
  publication_date?: string,
  link?: string,
  short_Link?: string,
  source_link?: string,
  number_of_views?: number
}

// export interface NewsListI {
//   type?: string,
//   news?: NewsArrayI
// }

export interface NewsI {
  news: Array<NewsArrayI>,
  newsTopics?: Array<NewTopicsI>,
  isMorePages: boolean
  widgetTitle?: string
}

interface SliceState {
  data?: NewsI,
  status: APIStatus,
  page?: number
}

const initialState:SliceState = {
  status: 'Initial' as APIStatus,
  page: 1
};

export const widgetLinkSlice = createSlice({
  name: 'widgetLinkSlice',
  initialState,
  reducers: {
    setData(state: SliceState, action: PayloadAction<NewsI>) {
      state.data = action.payload;
    },
    addNews(state: SliceState, action: PayloadAction<NewsI & { page?: number }>) {
      state.data.news = [...(state.data.news || []), ...action.payload.news];
      state.data.isMorePages = action.payload.isMorePages;
      state.page = action.payload.page;
    },
    setNews(state: SliceState, action: PayloadAction<NewsI>) {
      state.data.news = [...action.payload.news];
      state.data.isMorePages = action.payload.isMorePages;
      state.page = 1;
    },
  }
});

interface Store {
  widgetLink: SliceState
}

export const widgetLinkSelector = {
  getData: () => (state: Store) => state.widgetLink.data,
  getPage: () => (state: Store) => state.widgetLink.page,
};
