import { combineReducers } from '@reduxjs/toolkit';
import { authorSlice } from 'src/slices/authorSlice';
import { electionsSlice } from 'src/slices/electionsSlice';
import { authSlice } from '../slices/authSlice';
// eslint-disable-next-line import/no-cycle
import { homeSlice } from '../slices/homeSlice';
// eslint-disable-next-line import/no-cycle
import { userSlice } from '../slices/userSlice';
// eslint-disable-next-line import/no-cycle
import { newsSlice } from '../slices/newsSlice';
import { singleBillsSlice } from '../slices/SingleBillsSlice';
// eslint-disable-next-line import/no-cycle
import { singleNewsSlice } from '../slices/SingleNewsSlice';
import { politicianSlice } from '../slices/politicianSlice';
import { massMediaSlice } from '../slices/massMediaSlice';
import { partySlice } from '../slices/partySlice';
// eslint-disable-next-line import/no-cycle
import { widgetLinkSlice } from '../slices/widgetLinkSlice';
import { ratingSlice } from '../slices/ratingSlice';
import { profileSlice } from '../slices/profileSlice';
import { langSlice } from '../slices/langSlice';
import { searchSlice } from '../slices/searchSlice';
import { aboutPageSlice } from '../slices/aboutPageSlice';
import { newsSlice1 } from '../slices/newsSlice1';
// import { electionsSlice } from '../slices/electionsSlice';
import { votesPageSlice } from '../slices/votesPageSlice';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  home: homeSlice.reducer,
  news: newsSlice.reducer,
  singleNews: singleNewsSlice.reducer,
  singleBills: singleBillsSlice.reducer,
  politician: politicianSlice.reducer,
  user: userSlice.reducer,
  massmedia: massMediaSlice.reducer,
  author: authorSlice.reducer,
  party: partySlice.reducer,
  widgetLink: widgetLinkSlice.reducer,
  rating: ratingSlice.reducer,
  profile: profileSlice.reducer,
  lang: langSlice.reducer,
  search: searchSlice.reducer,
  aboutPage: aboutPageSlice.reducer,
  newsPage: newsSlice1.reducer,
  elections: electionsSlice.reducer,
  votes: votesPageSlice.reducer,
});

export default rootReducer;
