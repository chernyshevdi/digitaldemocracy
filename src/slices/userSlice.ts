import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { User } from '../types/user';
import { removeItem } from '../lib/localStorageManager';
import { NewsI } from './homeSlice';
// eslint-disable-next-line import/no-cycle
import { APIStatus } from '../lib/axiosAPI';
import { AuthorDataI } from './authorSlice';
import { PoliticianInfoI } from './politicianSlice';
import { MassMediaDataI } from './massMediaSlice';

export interface HistoryNewsI {
  views: Array<{ dateView: string; news: Array<NewsI> }>;
  isMorePages?: boolean;
}

interface RoutesI {
  data?: Array<RoutesDataI>;
  length?: number;
}
interface RoutesDataI {
  number: number;
  path: string;
}

export interface SubscriptionsI {
  authors?: Array<AuthorDataI>;
  politicians?: Array<PoliticianInfoI>;
  medias?: Array<MassMediaDataI>;
}

interface SliceState {
  data: User;
  isAuthenticated?: boolean;
  browsingHistory?: {
    data?: HistoryNewsI;
    page: number;
  };
  subscriptions?: SubscriptionsI;
  routes: RoutesI;
  dossier: {
    politicians: Array<PoliticianInfoI>;
    graph: Array<object>;
    isMorePages: boolean;
  };
  fetchUserDataStatus: APIStatus;
  choices?: any;
}

const initialState: SliceState = {
  data: {},
  browsingHistory: {
    page: 1,
    data: {
      views: [],
    },
  },
  routes: {
    data: [{ number: 1, path: '/' }],
    length: 1,
  },
  subscriptions: {
    authors: [],
    politicians: [],
    medias: [],
  },
  dossier: {
    politicians: [],
    graph: [],
    isMorePages: false,
  },
  fetchUserDataStatus: 'Initial' as APIStatus,
  choices: [],
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser(state: SliceState, action: PayloadAction<User>) {
      state.data = action.payload;
      state.fetchUserDataStatus = APIStatus.Success;
    },
    setIsAuthenticated(state: SliceState, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    setBrowsingHistory(state: SliceState, action: PayloadAction<{ data: HistoryNewsI; page: number }>) {
      state.browsingHistory.data.isMorePages = action.payload.data.isMorePages;
      state.browsingHistory.data.views = [...(state.browsingHistory.data.views || []), ...action.payload.data.views];
      state.browsingHistory.page = action.payload.page || 1;
    },
    resetNews(state: SliceState) {
      state.browsingHistory.page = 1;
      state.browsingHistory.data.views = [];
    },
    setSubscriptions(state: SliceState, actions: PayloadAction<SubscriptionsI>) {
      state.subscriptions = actions.payload;
    },
    logout(state: SliceState) {
      state.isAuthenticated = false;
      state.data = {};
      removeItem('token');
    },
    resetStatus(state: SliceState) {
      state.fetchUserDataStatus = APIStatus.Initial;
    },
    setRout(state, action) {
      let count = 0;
      const result = [...action.payload.path].reduce((acc, rec, index) => {
        count = rec === '/' ? count + 1 : count;
        return count < 2 ? acc + rec : acc;
      }, '');
      if (!state?.routes?.data[state?.routes?.data?.length - 1].path.includes(result) || action.payload.path === '/') {
        state.routes.length += 1;
        state.routes.data = [...state.routes.data, { number: action.payload.length, path: action.payload.path }];
      }
    },
    deleteLastRout(state) {
      state.routes.length = state.routes.length > 1 ? state.routes.length - 1 : 1;
      state.routes.data = [...state.routes.data].splice(0, state.routes.data.length - 1);
    },
    setDossierTablePoliticians(state: SliceState, action) {
      if (action.payload.pageNumber === 1) {
        state.dossier.politicians = action.payload.politicians;
      } else state.dossier.politicians = [...state.dossier.politicians, ...action.payload.politicians];

      state.dossier.isMorePages = action.payload.isMorePages;
    },
    setDossierPoliticianGraph(state: SliceState, action) {
      state.dossier.graph = action.payload;
    },
    setChoices(state: SliceState, action) {
      state.choices = action.payload;
    },
  },
});

interface Store {
  user: SliceState;
}

export const userSelectors = {
  getUser: () => (state: Store) => state.user.data,
  getStatus: () => (state: Store) => state.user.fetchUserDataStatus,
  getIsAuthenticated: () => (state: Store) => state.user.isAuthenticated,
  getBrowsingHistory: () => (state: Store) => state.user.browsingHistory,
  getSubscriptions: () => (state: Store) => state.user.subscriptions,
  getDossier: () => (state: Store) => state.user.dossier,
  getRoutes: () => (state: Store) => state.user.routes,
  getChoices: () => (state: Store) => state.user.choices,
};

export const userActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...userSlice.actions,
    },
    dispatch
  );
};
