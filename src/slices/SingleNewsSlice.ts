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

interface NewTopicsI {
  id: number;
  title: string;
}

interface HashtagsI {
  id: number;
  title: string;
}

export interface CurrentNewsI {
  id?: number;
  media?: MediaI;
  author?: AuthorI;
  newTopics?: NewTopicsI[];
  hashtags?: HashtagsI[];
  votes: number;
  title: string;
  image: string;
  publication_date: Date;
  link: string;
  source_link: string;
  number_of_views: number;
  is_display: boolean;
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

export interface ElectionsI {
  id?: number;
  count_voted_users: number;
  count_winners: number;
  description: string;
  end_date: string;
  is_after: boolean;
  is_before: boolean;
  is_now: boolean;
  is_silence: boolean;
  link: string;
  short_link: string;
  silence_tip: string;
  start_date: string;
  title: string;
}

export interface SingleNewsI {
  currentNews?: CurrentNewsI;
  news?: NewsI[];
  politicians?: PoliticiansI[];
  bills?: BillsI[];
  isMorePages?: boolean;
  elections?: ElectionsI[];
}

export interface LikesI {
  [U: number]: StatusI;
}

export interface StatusI {
  status: APIStatus;
}

interface SliceState {
  data?: SingleNewsI;
  status?: APIStatus;
  likeStatus?: APIStatus;
  dislikeStatus?: APIStatus;
  authorLikeStatus?: APIStatus;
  authorDislikeStatus?: APIStatus;
  politicianLikeStatus?: LikesI;
  politicianDislikeStatus?: LikesI;
  billLikeStatus?: LikesI;
  billDislikeStatus?: LikesI;
}

const initialState: SliceState = {
  status: 'Initial' as APIStatus,
  likeStatus: 'Initial' as APIStatus,
  dislikeStatus: 'Initial' as APIStatus,
  authorLikeStatus: 'Initial' as APIStatus,
  authorDislikeStatus: 'Initial' as APIStatus,
  politicianLikeStatus: {},
  politicianDislikeStatus: {},
  billLikeStatus: {},
  billDislikeStatus: {},
};

export const singleNewsSlice = createSlice({
  name: 'singleNewsSlice',
  initialState,
  reducers: {
    startFetch(state: SliceState) {
      state.status = APIStatus.Loading;
    },
    setData(state: SliceState, action: PayloadAction<SingleNewsI>) {
      state.data = action.payload;
      state.status = APIStatus.Success;
    },
    failFetch(state: SliceState) {
      state.status = APIStatus.Failure;
    },
    resetSingleNews(state: SliceState) {
      state = initialState;
    },
    startMassmediaLike(state) {
      state.likeStatus = APIStatus.Loading;
    },
    successMassmediaLike(state, action) {
      state.likeStatus = APIStatus.Success;
      state.data.currentNews.media.is_user_liked = action.payload;
      state.data.currentNews.media.number_of_likes = action.payload
        ? state.data.currentNews.media.number_of_likes + 1
        : state.data.currentNews.media.number_of_likes - 1;
    },
    failMassmediaLike(state) {
      state.likeStatus = APIStatus.Failure;
    },
    startMassmediaDislike(state) {
      state.dislikeStatus = APIStatus.Loading;
    },
    successMassmediaDislike(state, action) {
      state.dislikeStatus = APIStatus.Success;
      state.data.currentNews.media.is_user_disliked = action.payload;
      state.data.currentNews.media.number_of_dislikes = action.payload
        ? state.data.currentNews.media.number_of_dislikes + 1
        : state.data.currentNews.media.number_of_dislikes - 1;
    },
    failMassmediaDislike(state) {
      state.dislikeStatus = APIStatus.Failure;
    },
    startAuthorLike(state) {
      state.authorLikeStatus = APIStatus.Loading;
    },
    successAuthorLike(state, action) {
      state.authorLikeStatus = APIStatus.Success;
      state.data.currentNews.author.is_user_liked = action.payload;
      state.data.currentNews.author.number_of_likes = action.payload
        ? state.data.currentNews.author.number_of_likes + 1
        : state.data.currentNews.author.number_of_likes - 1;
    },
    failAuthorLike(state) {
      state.authorLikeStatus = APIStatus.Failure;
    },
    startAuthorDislike(state) {
      state.authorDislikeStatus = APIStatus.Loading;
    },
    successAuthorDislike(state, action) {
      state.authorDislikeStatus = APIStatus.Success;
      state.data.currentNews.author.is_user_disliked = action.payload;
      state.data.currentNews.author.number_of_dislikes = action.payload
        ? state.data.currentNews.author.number_of_dislikes + 1
        : state.data.currentNews.author.number_of_dislikes - 1;
    },
    failAuthorDislike(state) {
      state.authorDislikeStatus = APIStatus.Failure;
    },
    startPoliticianLike(state, action) {
      state.politicianLikeStatus[action.payload.id] = { status: APIStatus.Loading };
    },
    successPoliticianLike(state, action) {
      state.politicianLikeStatus[action.payload.id] = { status: APIStatus.Success };
      state.data.politicians[action.payload.index].is_user_liked = action.payload.status;
      state.data.politicians[action.payload.index].number_of_likes = action.payload.status
        ? state.data.politicians[action.payload.index].number_of_likes + 1
        : state.data.politicians[action.payload.index].number_of_likes - 1;
    },
    failPoliticianLike(state, action) {
      state.politicianLikeStatus[action.payload.id] = { status: APIStatus.Failure };
    },
    startPoliticianDislike(state, action) {
      state.politicianDislikeStatus[action.payload.id] = { status: APIStatus.Loading };
    },
    successPoliticianDislike(state, action) {
      state.politicianDislikeStatus[action.payload.id] = { status: APIStatus.Success };
      state.data.politicians[action.payload.index].is_user_disliked = action.payload.status;
      state.data.politicians[action.payload.index].number_of_dislikes = action.payload.status
        ? state.data.politicians[action.payload.index].number_of_dislikes + 1
        : state.data.politicians[action.payload.index].number_of_dislikes - 1;
    },
    failPoliticianDislike(state, action) {
      state.politicianDislikeStatus[action.payload.id] = { status: APIStatus.Failure };
    },
    startBillLike(state, action) {
      state.billLikeStatus[action.payload.id] = { status: APIStatus.Loading };
    },
    successBillLike(state, action) {
      state.billLikeStatus[action.payload.id] = { status: APIStatus.Success };
      state.data.bills[action.payload.index].is_user_liked = action.payload.status;
      state.data.bills[action.payload.index].number_of_likes = action.payload.status
        ? state.data.bills[action.payload.index].number_of_likes + 1
        : state.data.bills[action.payload.index].number_of_likes - 1;
    },
    failBillLike(state, action) {
      state.billLikeStatus[action.payload.id] = { status: APIStatus.Failure };
    },
    startBillDislike(state, action) {
      state.billDislikeStatus[action.payload.id] = { status: APIStatus.Loading };
    },
    successBillDislike(state, action) {
      state.billDislikeStatus[action.payload.id] = { status: APIStatus.Success };
      state.data.bills[action.payload.index].is_user_disliked = action.payload.status;
      state.data.bills[action.payload.index].number_of_dislikes = action.payload.status
        ? state.data.bills[action.payload.index].number_of_dislikes + 1
        : state.data.bills[action.payload.index].number_of_dislikes - 1;
    },
    failBillDislike(state, action) {
      state.billDislikeStatus[action.payload.id] = { status: APIStatus.Failure };
    },
  },
});

interface Store {
  singleNews: SliceState;
}

export const singleNewsSelector = {
  getData: () => (state: Store) => state.singleNews.data,
  getStatus: () => (state: Store) => state.singleNews.status,
};

export const singleNewsActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...singleNewsSlice.actions,
    },
    dispatch
  );
};
