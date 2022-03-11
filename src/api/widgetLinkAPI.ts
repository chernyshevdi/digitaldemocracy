import { APIRequest, callAPI } from '../lib/axiosAPI';
import { NewsI } from '../slices/widgetLinkSlice';

interface WidgetLinkRequest {
  topicId?: any;
  page?: number;
  id?: string;
}

interface WidgetLinkResponse {
  data?: NewsI;
}

const fetchWidgetLink: APIRequest<WidgetLinkRequest, WidgetLinkResponse> = (args) => {
  const { topicId, page, id } = args.payload;
  // eslint-disable-next-line no-nested-ternary
  return callAPI({
    url: `news/widgetLink/${id}${
      topicId && page
        ? `?page=${page}&topic_id=${topicId}`
        : !topicId && page
          ? `?page=${args.payload.page}`
          : topicId && !page
            ? `?topic_id=${topicId}`
            : ''
    }`,
    config: { method: 'GET' },
    ...args,
  });
};

export const widgetLinkAPI = {
  fetchWidgetLink,
};
