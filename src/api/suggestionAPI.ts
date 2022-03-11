import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { APIRequest, callAPI } from '../lib/axiosAPI';

interface SuggestionRequest {
  type: string;
  token: string;
  source_link?: string;
  description?: string;
}

interface SuggestionResponse {
  data?: string;
}

const fetchSuggestion: APIRequest<SuggestionRequest, SuggestionResponse> = (args) => {
  const { type } = args.payload;
  return callAPI({
    url: type === 'NEWS' ? 'addNewsByUser' : 'addPoliticianByUser',
    config: {
      headers: {
        Authorization: `Bearer ${args.payload.token}`,
      },
    },
    ...args,
  });
};

const APIs = {
  fetchSuggestion,
};

export const suggestionAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...APIs,
    },
    dispatch
  );
};
