import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { number } from 'prop-types';
import { useDispatch } from 'react-redux';

export enum AuthType {
  Phone = 'Phone',
  Email = 'Email',
}

interface SliceState {
  registerStep?: number;
  loginStep?: number;
  resetPasswordStep?: number;
  authType?: AuthType;
  rememberMe?: boolean;
  authUserData?: {
    address?: string;
    phone?: string;
    email?: string;
    password?: string;
    code?: string;
    verificationId?: string;
    countryId?: string;
    country_id?: number | null;
    region_id?: number | null;
    city_id?: number | null;
  };
  attemptSingIn?: number;
}

const initialState: SliceState = {
  registerStep: 1,
  loginStep: 1,
  resetPasswordStep: 1,
  rememberMe: false,
  authUserData: {
    address: '',
    phone: '',
    email: '',
    password: '',
    code: '',
    verificationId: '',
    countryId: '',
    country_id: null,
    region_id: null,
    city_id: null,
  },
  attemptSingIn: 0,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setRegisterStep(state: SliceState, action: PayloadAction<number>) {
      state.registerStep = action.payload;
    },
    setLoginStep(state: SliceState, action: PayloadAction<number>) {
      state.loginStep = action.payload;
    },
    setResetStep(state: SliceState, action: PayloadAction<number>) {
      state.resetPasswordStep = action.payload;
    },
    setAuthType(state: SliceState, action: PayloadAction<AuthType>) {
      state.authType = action.payload;
    },
    setRememberMe(state: SliceState, action: PayloadAction<boolean>) {
      state.rememberMe = action.payload;
    },
    setAuthUserData(state: SliceState, action: PayloadAction<{ key: string; value: string }>) {
      const { value, key } = action.payload;
      state.authUserData[key] = value;
    },
    setAttemptSingIn(state: SliceState, action: PayloadAction<number>) {
      state.attemptSingIn = action.payload;
    },
  },
});

export interface Store {
  auth: SliceState;
}

export const authSelectors = {
  getSteps: () => (state: Store) => ({
    registerStep: state.auth.registerStep,
    loginStep: state.auth.loginStep,
    resetStep: state.auth.resetPasswordStep,
  }),
  getRegisterStep: () => (state: Store) => state.auth.registerStep,
  getResetPasswordStep: () => (state: Store) => state.auth.resetPasswordStep,
  getAttemptSingIn: () => (state: Store) => state.auth.attemptSingIn,
  getLoginStep: () => (state: Store) => state.auth.loginStep,
  getAuthType: () => (state: Store) => state.auth.authType,
  getRememberMe: () => (state: Store) => state.auth.rememberMe,
  getUserData: () => (state: Store) => state.auth.authUserData,
  getAllData: () => (state: Store) => ({
    ...state.auth,
  }),
};

export const authActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...authSlice.actions,
    },
    dispatch
  );
};
