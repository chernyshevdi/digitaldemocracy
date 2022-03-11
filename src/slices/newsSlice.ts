import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { APIStatus } from '../lib/axiosAPI';

export interface RegionI {
  id: number,
  name_with_type: string,
  federal_district: string
}

export interface CountryI {
  id: number,
  created_at?: string,
  updated_at?: string,
  deleted_at?: string,
  title: string,
  total_electorate: number
}

export interface CityI {
  id: number,
  region_id?: number,
  created_at?: string,
  updated_at?: string,
  title: string,
  total_electorate?: number,
  is_exact_value?: boolean
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

interface WidgetLinkI {
  id: number,
  title: string,
  number_on_pages: number
}

export interface NewsArrayI {
  id: number,
  region?: RegionI,
  country?: CountryI,
  city?: CityI,
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

export interface NewsListI {
  type?: string,
  widgetLink?: WidgetLinkI,
  news?: NewsArrayI
}

export interface NewsI {
  news: Array<NewsListI>,
  newsTopics?: Array<NewTopicsI>,
  isMorePages: boolean,
  country?: string,
  region?: string,
  city?: string,
}

export interface IWeek {
  begin: string,
  end: string
}

interface SliceState {
  data?: NewsI,
  week?: any,
  status: APIStatus,
  page?: number
}

const initialState:SliceState = {
  page: 1,
  status: 'Initial' as APIStatus
};

export const newsSlice = createSlice({
  name: 'newsSlice',
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
    setWeeks(state: SliceState, action: PayloadAction<any>) {
      console.log(state.week);
      state.week = action.payload;
    }
  }
});

interface Store {
  news: SliceState
}

export const newsSelector = {
  getData: () => (state: Store) => state.news.data,
  getPage: () => (state: Store) => state.news.page,
  getWeeks: () => (state: Store) => state.news.week
};
