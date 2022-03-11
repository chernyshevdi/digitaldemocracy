import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { APIRequest, callAPI } from '../lib/axiosAPI';

export interface LangI {
  'id': number,
  'key_lang': string,
  'title': string
}

interface LangResponse {
  success?: boolean;
  data?: LangI;
}

const fetchLang: APIRequest<any, Array<LangI>> = (args) => {
  return callAPI({
    url: 'getLangsToSite',
    config: {
      method: 'GET',
    },
    ...args
  });
};

export const langAPIs = {
  fetchLang
};

export const langAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...langAPIs,
    },
    dispatch
  );
};
