import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { APIRequest, callAPI } from '../lib/axiosAPI';
import { User } from '../types/user';

interface RegisterRequest {
  code: string;
  address: string;
  email?: string;
  phone?: string;
  password?: string;
  password_confirmation?: string;
  country_id?: number;
}

interface RegisterResponse {
  user: User;
  token: string;
}

interface SendCodeRequest {
  country_id?: number;
  region_id?: number;
  city_id?: number;
  email?: string;
  phone?: string;
}

interface VerifyCodeRequest {
  code: string;
  email?: string;
}

interface GetCodeYandexRequest {
  response_type: string;
  client_id: string;
}

interface RegisterErrorResponse {
  password?: Array<string>;
  password_confirmation?: Array<string>;
}

export interface SendCodeErrorResponse {
  phone?: Array<string>;
  email?: Array<string>;
}

interface RegisterViaPhoneRequest {
  phone: string;
  FirebaseToken: string;
}

interface RegisterViaPhoneErrorResponse {
  phone: Array<string>;
  FirebaseToken: Array<string>;
}

interface GetYandexUserInfoRequest {
  format: 'json' | 'xml';
  with_openid_identity?: boolean;
  oauth_token: string;
}

interface GetYandexUserInfoResponse {
  id?: string,
  login?: string,
  client_id?: string,
  display_name?: string,
  real_name?: string,
  first_name?: string,
  last_name?: string,
  sex?: string | null,
  default_email?: string,
  emails?: Array<string>,
  birthday?: string,
  default_avatar_id?: string,
  is_avatar_empty?: boolean,
  psuid?: string
}

interface RegisterViaGoogleRequest {
  country_id?: number;
  accessToken: string;
  profileObj: {
    name: string;
    email: string;
    imageUrl: string;
  };
  googleId: string;
  address?: string;
}

interface RegisterViaGoogleErrorResponse {
  address: Array<string>;
  googleId: Array<string>;
}

interface LoginViaPhoneResponse {
  user: User;
  token: string;
}

interface ResetPasswordRequest {
  password: string;
  password_confirmation: string;
  email: string;
  token: string;
}

export interface CountryI {
  id: number;
  title: string;
}

const checkValidateAddress: APIRequest<{ address: string; country_id?: number }, { valid: boolean }> = (args) =>
  callAPI({ url: 'checkUserAddress', ...args });

const checkValidateEmail: APIRequest<{ email: string }, string, { email: Array<string> | string }> = (args) =>
  callAPI({ url: 'checkEmail', ...args });

const checkValidateEmailLogin: APIRequest<{ email: string }, string, { email: Array<string> | string }> = (args) =>
  callAPI({ url: 'checkEmailForLogin', ...args });

const checkValidatePhone: APIRequest<{ phone: string }, string, { phone: Array<string> | string }> = (args) =>
  callAPI({ url: 'checkPhone', ...args });

const checkValidatePhoneLogin: APIRequest<{ phone: string }, string, { phone: Array<string> | string }> = (args) =>
  callAPI({ url: 'checkPhoneForLogin ', ...args });

const sendCode: APIRequest<SendCodeRequest, {}> = (args) =>
  callAPI({ url: args?.payload?.email ? 'registrationViaEmail' : 'registrationViaPhone', ...args });

const verifyCode: APIRequest<VerifyCodeRequest, { token?: string }, { code: Array<string> }> = (args) =>
  callAPI({ url: 'checkEmailConfirmationCode', ...args });

const register: APIRequest<RegisterRequest, RegisterResponse, RegisterErrorResponse> = (args) =>
  callAPI({ url: 'setUserPassword', ...args });

const registerViaPhone: APIRequest<
  RegisterViaPhoneRequest,
  LoginViaPhoneResponse,
  RegisterViaPhoneErrorResponse | string
> = (args) => callAPI({ url: 'checkPhoneConfirmationToken', ...args });

const registerViaGoogle = (args) =>
  callAPI({
    url: 'registrationViaGoogle',
    config: { params: args.payload },
    ...args,
  });

const registerViaYandex = (args) =>
  callAPI({
    url: 'registrationViaYandex',
    config: { params: args.payload },
    ...args,
  });

const getCodeYandexOAuth: APIRequest<GetCodeYandexRequest, Response> = (args) =>
  callAPI({
    customBaseUrl: 'https://oauth.yandex.ru/',
    url: `authorize?response_type=${args.payload.response_type}&client_id=${args.payload.client_id}`,
    config: { method: 'GET' },
    ...args,
  });

// TODO Яндекс рекомендует использовать токен в заголовке при запросе, но в таком случае возникает исключение
const getYandexUserInfo: APIRequest<GetYandexUserInfoRequest, GetYandexUserInfoResponse> = (args) =>
  callAPI({
    // &with_openid_identity=${args.payload.with_openid_identity}
    customBaseUrl: 'https://login.yandex.ru/',
    url: `info?format=${args.payload.format}&oauth_token=${args.payload.oauth_token}`,
    nestedResponseType: false,
    config: {
      method: 'GET',
      // headers: {
      //  Authorization: `OAuth ${args.payload.oauth_token}`,
      // },
    },
    ...args,
  });

const authViaGoogle: APIRequest<RegisterViaGoogleRequest, LoginViaPhoneResponse, RegisterViaGoogleErrorResponse> = (
  args
) => callAPI({ url: 'login/google', ...args });

const authViaYandex: APIRequest<any, any> = (
  args
) => callAPI({ url: 'login/yandex', ...args });

const authViaEmailConfirmPassword: APIRequest<
  { password: string; email: string },
  RegisterResponse,
  { password: Array<string>; email: Array<string> | string }
> = (args) => callAPI({ url: 'login/email', ...args });

const loginViaPhone: APIRequest<
  RegisterViaPhoneRequest,
  LoginViaPhoneResponse,
  RegisterViaPhoneErrorResponse | string
> = (args) => callAPI({ url: 'login/phone', ...args });

const sendResetLinkEmail: APIRequest<{ email: string }, string, { email: Array<string> } | string> = (args) =>
  callAPI({ url: 'password/sendResetLinkEmail', ...args });

const resetPassword: APIRequest<ResetPasswordRequest, LoginViaPhoneResponse, { password: Array<string> } | string> = (
  args
) => callAPI({ url: 'password/reset', ...args });

const getCountries: APIRequest<{}, Array<CountryI>> = (args) =>
  callAPI({ url: 'getCountries', config: { method: 'get' }, ...args, nestedResponseType: false });

const getRegions: APIRequest<{}, Array<CountryI>, {}, { params: { country_id: number } }> = (args) => {
  const { params } = args.variables;
  return callAPI({ url: 'getRegions', config: { method: 'get', params }, ...args, nestedResponseType: false });
};

const getCities: APIRequest<{}, Array<CountryI>, {}, { params: { region_id: number } }> = (args) => {
  const { params } = args.variables;
  return callAPI({ url: 'getCities', config: { method: 'get', params }, ...args, nestedResponseType: false });
};

const APIs = {
  checkValidateAddress,
  sendCode,
  verifyCode,
  register,
  getCodeYandexOAuth,
  registerViaPhone,
  getYandexUserInfo,
  registerViaGoogle,
  registerViaYandex,
  authViaGoogle,
  authViaYandex,
  authViaEmailConfirmPassword,
  loginViaPhone,
  checkValidateEmail,
  checkValidatePhone,
  checkValidateEmailLogin,
  checkValidatePhoneLogin,
  sendResetLinkEmail,
  resetPassword,
  getCountries,
  getRegions,
  getCities,
};

export const authAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...APIs,
    },
    dispatch
  );
};
