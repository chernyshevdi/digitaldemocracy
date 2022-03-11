import { APIRequest, callAPI } from '../lib/axiosAPI';
import { HomeI } from '../slices/homeSlice';

interface HomeRequest {
  topic_id?: any,
  page?: number
}

interface HomeResponse {
  data?: Array<HomeI>
}

interface HomeErrorResponse {
  page?: Array<string>
  topic_id?: Array<string>
}

const fetchHome: APIRequest<HomeRequest, HomeResponse, HomeErrorResponse> = (args) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { topic_id, page } = args.payload;
  // eslint-disable-next-line no-nested-ternary
  return callAPI({ url: `homePage${topic_id && page ? `?page=${page}&topic_id=${topic_id}` : !topic_id && page ? `?page=${args.payload.page}` : topic_id && !page ? `?topic_id=${topic_id}` : ''}`, config: { method: 'GET' }, ...args });
};

export const homeAPI = {
  fetchHome,
};
