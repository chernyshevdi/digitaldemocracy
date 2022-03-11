import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { LangI } from '../api/langAPI';

interface SliceState {
  data: Array<LangI>;
}

const initialState:SliceState = {
  data: []
};

export const langSlice = createSlice({
  name: 'langSlice',
  initialState,
  reducers: {
    setLang(state: SliceState, action) {
      state.data = action.payload;
    }
  }
});

interface Store {
  lang: SliceState;
}

export const langSelectors = {
  getLang: () => (state: Store) => state.lang.data,
};

export const langAPIActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...langSlice.actions,
    },
    dispatch
  );
};
