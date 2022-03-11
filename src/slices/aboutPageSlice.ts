import { bindActionCreators, createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

interface SliceState {
  title1: string;
  textarea1: string;
  title2: string;
  textarea2: string;
  file: {};
}

const initialState = {
  title1: '',
  textarea1: '',
  title2: '',
  textarea2: '',
  file: {},
};

export const aboutPageSlice = createSlice({
  name: 'aboutPageSlice',
  initialState,
  reducers: {
    setAboutPageState: (state: SliceState, action) => {
      state.title1 = action.payload.title1;
      state.title2 = action.payload.title2;
      state.textarea1 = action.payload.textarea1;
      state.textarea2 = action.payload.textarea2;
      state.file = action.payload.file ?? {};
    },
  },
});

export const aboutPageSelectors = {
  getAboutPage: () => (state) => state.aboutPage,
};

export const aboutPageActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...aboutPageSlice.actions,
    },
    dispatch
  );
};
