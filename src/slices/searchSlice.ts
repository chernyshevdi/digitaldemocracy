import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

export interface SliceState {
  searchQuery: string,
  news: {
    isMorePages: boolean,
    data: Array<any>
  };
  politician: {
    isMorePages: boolean,
    data: Array<any>
  };
  party: {
    isMorePages: boolean,
    data: Array<any>
  };
  media: {
    isMorePages: boolean,
    data: Array<any>
  };
  author: {
    isMorePages: boolean,
    data: Array<any>
  };
}

interface SearchResponse {
  payload: {
    news: {
      isMorePages: boolean;
      data: Array<any>;
    };
    politician: {
      isMorePages: boolean;
      data: Array<any>;
    };
    party: {
      isMorePages: boolean;
      data: Array<any>;
    };
    media: {
      isMorePages: boolean;
      data: Array<any>;
    };
    author: {
      isMorePages: boolean;
      data: Array<any>;
    };
  }
}

interface ActionSetPageOrPerPage {
  payload: {
    key: string,
    value: number,
  }
}

const initialState: SliceState = {
  searchQuery: '',
  news: {
    isMorePages: false,
    data: [],
  },
  politician: {
    isMorePages: false,
    data: [],
  },
  party: {
    isMorePages: false,
    data: [],
  },
  media: {
    isMorePages: false,
    data: [],
  },
  author: {
    isMorePages: false,
    data: [],
  },
};

export const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    setSearchData: (state: SliceState, action: SearchResponse) => {
      state.news = {
        ...state.news,
        data: action.payload.news.data ?? [],
        isMorePages: action.payload.news.isMorePages ?? false,
      };
      state.politician = {
        ...state.politician,
        data: action.payload.politician.data ?? [],
        isMorePages: action.payload.politician.isMorePages ?? false,
      };
      state.party = {
        ...state.party,
        data: action.payload.party.data ?? [],
        isMorePages: action.payload.party.isMorePages ?? false,
      };
      state.media = {
        ...state.media,
        data: action.payload.media.data ?? [],
        isMorePages: action.payload.media.isMorePages ?? false,
      };
      state.author = {
        ...state.author,
        data: action.payload.author.data ?? [],
        isMorePages: action.payload.author.isMorePages ?? false,
      };
    },
    setSearchDataCategory: (state: SliceState, action) => {
      state[action.payload.key].data.push(...action.payload.data);
      state[action.payload.key].isMorePages = action.payload.isMorePages;
    },
    setSearchQuery: (state: SliceState, action) => {
      state.searchQuery = action.payload.searchQuery;
    },
    clearSearchData: () => initialState
  },
});

export const searchSelectors = {
  getSearchData: () => (state) => state.search,
  getSearchQuery: () => (state) => state.search.searchQuery
};

export const searchActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators({
    ...searchSlice.actions
  }, dispatch);
};
