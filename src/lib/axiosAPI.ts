import axios, { AxiosRequestConfig } from 'axios';
import { ThunkAction } from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';
import { pick } from 'lodash';
import { apiSetting } from '../config';
// eslint-disable-next-line import/no-cycle
import { RootState, store } from '../store';
import { removeItem } from './localStorageManager';
// eslint-disable-next-line import/no-cycle
import { userSlice } from '../slices/userSlice';

export type GenericAppThunk<RootState> = ThunkAction<void, RootState, null, Action<string>>;

export interface ErrorI {
  message: string;
  success: boolean;
}

export interface CallAPIParams {
  url: string;
  payload?: any;
  onSuccess?: (response: any, headers?: any) => void;
  includeHeaders?: string[];
  onError?: (errorResponse: Object) => void;
  reducerData?: any;
  config?: AxiosRequestConfig;
  customBaseUrl?: string;
  nestedResponseType?: boolean;
}

export enum APIStatus {
  Initial = 'Initial',
  Loading = 'Loading',
  Success = 'Success',
  Failure = 'Failure',
}

export type CallAPI<AppThunk> = (params: CallAPIParams) => AppThunk;

const baseURL = apiSetting.url_api;

export const getCallAPI =
  <RootState>(): CallAPI<GenericAppThunk<RootState>> =>
    (props) =>
      async () => {
        const {
          url,
          payload,
          onSuccess,
          onError,
          config,
          includeHeaders,
          customBaseUrl,
          nestedResponseType = true,
        } = props;
        let response;

        try {
          const method = config?.method;

          if (method && method.toLowerCase() === 'get') {
            response = await axios.get((customBaseUrl || baseURL) + url, config);
          } else {
            response = await axios.post((customBaseUrl || baseURL) + url, payload, config);
            // response = await axios({
            //   method: 'post',
            //   url: (customBaseUrl || baseURL) + url,
            //   ...payload,
            //   ...config,
            // });
          }
          const headers = includeHeaders ? pick(response.headers, includeHeaders) : undefined;

          if (!nestedResponseType && response.data && onSuccess) {
            onSuccess(response.data);
          }
          if (nestedResponseType && response.data.success && response.data.data && onSuccess) {
            onSuccess(response.data.data, headers);
          } else if (!!nestedResponseType && !!response.data.success && onSuccess) {
            onSuccess(response.data, headers);
          }
          if (nestedResponseType && !response.data.success && onError) {
            onError(response.data.message);
          }
        } catch (err) {
          console.log(err);
          console.log(err.response);
          if (err && err.response && err.response.status === 401) {
            removeItem('token');
            store.dispatch(userSlice.actions.logout);
            document.location.assign('/');
          }
          if (onError && err && err.response && err.response.data) {
            if (err.response.data.errors) onError(err.response.data.errors);
            else onError(err.response.data.message);
          }
        }
      };

export const callAPI = getCallAPI<RootState>();

export interface APIRequestParams<Req, Res, ErrorType, Var> {
  payload?: Req;
  variables?: Var;
  onSuccess?: (response: Res) => void;
  onError?: (errorResponse: ErrorType) => void;
  config?: AxiosRequestConfig;
}

export type GenericAPIRequest<RootState, Req = null, Res = null, ErrorType = null, Var = null> = (
  params: APIRequestParams<Req, Res, ErrorType, Var>
) => GenericAppThunk<RootState>;

export type APIRequest<Req = null, Res = null, ErrorType = null, Var = null> = GenericAPIRequest<
  RootState,
  Req,
  Res,
  ErrorType,
  Var
>;
