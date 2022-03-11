import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

interface SliceState {
  data?: any;
  genders?: any;
  religions?: any;
  educations?: any;
  political_views?: any;
  countries?: any;
  regions?: any;
  cities?: any;
}

const initialState: SliceState = {
  data: {},
  genders: [],
  religions: [],
  educations: [],
  political_views: [],
  countries: [],
  regions: [],
  cities: [],
};

export const profileSlice = createSlice({
  name: 'profileSlice',
  initialState,
  reducers: {
    setProfileInfo(state: SliceState, action) {
      state.data = action.payload;
    },
    setGender(state: SliceState, action) {
      state.genders = action.payload;
    },
    setReligion(state: SliceState, action) {
      state.religions = action.payload;
    },
    setEducation(state: SliceState, action) {
      state.educations = action.payload;
    },
    setPoliticianViews(state: SliceState, action) {
      state.political_views = action.payload;
    },
    setCountry(state: SliceState, action) {
      state.countries = action.payload;
    },
    setRegions(state: SliceState, action) {
      state.regions = action.payload;
    },
    setCities(state: SliceState, action) {
      state.cities = action.payload;
    },
    changeCountyId(state: SliceState, action) {
      state.data.userProfile.country_id.id = action.payload;
    },
    changeRegionId(state: SliceState, action) {
      if (state.data.userProfile.region_id === null) {
        state.data.userProfile.region_id = { id: action.payload };
      }
      state.data.userProfile.region_id.id = action.payload;
    },
    addGoogle(state: SliceState) {
      state.data?.userRegistrationTypes?.push({
        user_registration_type: 'Гугл аккаунт',
      });
    },
    removeGoogle(state: SliceState) {
      state.data.userRegistrationTypes = state.data?.userRegistrationTypes?.filter(
        (item) => item?.user_registration_type !== 'Гугл аккаунт'
      );
    },
    addYandex(state: SliceState) {
      state.data?.userRegistrationTypes?.push({
        user_registration_type: 'Яндекс аккаунт',
      });
    },
    removeYandex(state: SliceState) {
      state.data.userRegistrationTypes = state.data?.userRegistrationTypes?.filter(
        (item) => item?.user_registration_type !== 'Яндекс аккаунт'
      );
    },
  },
});

export interface Store {
  profile: SliceState;
}

export const profileActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...profileSlice.actions,
    },
    dispatch
  );
};
