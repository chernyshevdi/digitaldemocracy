import { createSlice, PayloadAction, bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
// eslint-disable-next-line import/no-cycle
import { APIStatus } from '../lib/axiosAPI';

export interface MediaI {
  id?: number;
  name?: string;
  photo?: string;
  is_subscribed?: boolean;
  link?: string;
  percent?: string;
  short_link?: string;
  is_user_liked?: boolean;
  is_user_disliked?: boolean;
  number_of_likes?: number;
  number_of_dislikes?: number;
  rating?: string;
}

export interface AuthorI {
  id?: number;
  name?: string;
  photo?: string;
  is_subscribed?: boolean;
  link?: string;
  percent?: string;
  short_link?: string;
  is_user_liked?: boolean;
  is_user_disliked?: boolean;
  number_of_likes?: number;
  number_of_dislikes?: number;
  rating?: string;
}
interface NewTopicsI {
  id: number;
  title: string;
}

interface HashtagsI {
  id: number;
  title: string;
}

export interface NewsI {
  id?: number;
  media?: MediaI;
  author?: AuthorI;
  newTopics?: NewTopicsI[];
  hashtags?: HashtagsI[];
  votes?: number;
  title?: string;
  image?: string;
  publication_date?: string;
  link?: string;
  source_link?: string;
  number_of_views?: number;
  short_link?: string;
}
export interface BillsI {
  id?: number;
  title?: string;
  image?: string;
  link?: string;
  short_link?: string;
  source_link?: string;
  publication_date?: string;
  number_of_views?: number;
  is_user_liked?: boolean;
  is_user_disliked?: boolean;
  number_of_likes?: number;
  number_of_dislikes?: number;
}
export interface PoliticiansI {
  name?: string;
  photo?: string;
  percent?: string;
  short_link?: string;
  rating?: string;
  is_user_liked?: boolean;
  is_user_disliked?: boolean;
  number_of_likes?: number;
  number_of_dislikes?: number;
  id?: number;
  position?: string;
}
export interface SingleBillsI {
  bill?: BillsI;
  news?: NewsI[];
  politicians?: PoliticiansI[];
  isMorePages?: boolean;
}

interface SliceState {
  data?: SingleBillsI;
  status?: APIStatus;
  likeStatus?: APIStatus;
  dislikeStatus?: APIStatus;
}

const initialState: SliceState = {
  status: 'Initial' as APIStatus,
  likeStatus: 'Initial' as APIStatus,
  dislikeStatus: 'Initial' as APIStatus,
};

export const singleBillsSlice = createSlice({
  name: 'singleBillsSlice',
  initialState,
  reducers: {
    startFetch(state: SliceState) {
      state.status = APIStatus.Loading;
    },
    setData(state: SliceState, action: PayloadAction<SingleBillsI>) {
      state.data = action.payload;
      state.status = APIStatus.Success;
    },
    failFetch(state: SliceState) {
      state.status = APIStatus.Failure;
    },
    resetSingleBills(state: SliceState) {
      state = initialState;
    },
    startLike(state) {
      state.likeStatus = APIStatus.Loading;
    },
    successLike(state, action) {
      state.likeStatus = APIStatus.Success;
      state.data.bill.is_user_liked = action.payload;
      state.data.bill.number_of_likes = action.payload
        ? state.data.bill.number_of_likes + 1
        : state.data.bill.number_of_likes - 1;
    },
    failLike(state) {
      state.likeStatus = APIStatus.Failure;
    },
    startDislike(state) {
      state.dislikeStatus = APIStatus.Loading;
    },
    successDislike(state, action) {
      state.dislikeStatus = APIStatus.Success;
      state.data.bill.is_user_disliked = action.payload;
      state.data.bill.number_of_dislikes = action.payload
        ? state.data.bill.number_of_dislikes + 1
        : state.data.bill.number_of_dislikes - 1;
    },
    failDislike(state) {
      state.dislikeStatus = APIStatus.Failure;
    },
  },
});

interface Store {
  singleBills: SliceState;
}

export const singleBillsSelector = {
  getData: () => (state: Store) => state.singleBills.data,
  getStatus: () => (state: Store) => state.singleBills.status,
};

export const singleBillsActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...singleBillsSlice.actions,
    },
    dispatch
  );
};
