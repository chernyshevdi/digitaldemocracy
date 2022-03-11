import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { APIRequest, callAPI } from '../lib/axiosAPI';
import { SingleNewsI } from '../slices/SingleNewsSlice';

interface SingleNewsRequest {
  link?: string;
  token: string;
}

interface SingleNewsResponse {
  data?: SingleNewsI;
}

interface SingleNewsErrorResponse {
  link?: Array<string>;
}

interface LikeRequest {
  news_id?: number;
  media_id?: number;
  author_id?: number;
  politician_id?: number;
  bill_id?: number;
  voting_place?: string;
}

interface LikeResponse {}
interface LikeErr {}

interface LikeVar {
  isMassmediaDisliked?: boolean;
  isMassmediaLiked?: boolean;
  token?: string;
  isAuthorLiked?: boolean;
  isAuthorDisliked?: boolean;
  isPoliticianLiked?: boolean;
  isPoliticianDisliked?: boolean;
  isBillLiked?: boolean;
  isBillDisliked?: boolean;
}

const fetchSingleNews: APIRequest<SingleNewsRequest, SingleNewsResponse, SingleNewsErrorResponse> = (args) =>
  callAPI({
    url: `getNews/${args.payload.link}`,
    config: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${args.payload.token}`,
      },
    },
    ...args,
  });

const massmediaLike: APIRequest<LikeRequest, LikeResponse, LikeErr, LikeVar> = (args) => {
  const { isMassmediaLiked, token } = args.variables;
  return callAPI({
    url: isMassmediaLiked ? 'deleteLikeFromMedia ' : 'addLikeToMedia ',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args.variables.token}`,
      },
    },
    ...args,
  });
};

const massmediaDislike: APIRequest<LikeRequest, LikeResponse, LikeErr, LikeVar> = (args) => {
  const { isMassmediaDisliked, token } = args.variables;
  return callAPI({
    url: isMassmediaDisliked ? 'deleteDislikeFromMedia   ' : 'addDislikeToMedia  ',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args.variables.token}`,
      },
    },
    ...args,
  });
};

const authorLike: APIRequest<LikeRequest, LikeResponse, LikeErr, LikeVar> = (args) => {
  const { isAuthorLiked, token } = args.variables;
  return callAPI({
    url: isAuthorLiked ? 'deleteLikeFromAuthor' : 'addLikeToAuthor',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args.variables.token}`,
      },
    },
    ...args,
  });
};

const authorDislike: APIRequest<LikeRequest, LikeResponse, LikeErr, LikeVar> = (args) => {
  const { isAuthorDisliked, token } = args.variables;
  return callAPI({
    url: isAuthorDisliked ? 'deleteDislikeFromAuthor' : 'addDislikeToAuthor',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args.variables.token}`,
      },
    },
    ...args,
  });
};

const politicianLike: APIRequest<LikeRequest, LikeResponse, LikeErr, LikeVar> = (args) => {
  const { isPoliticianLiked, token } = args.variables;
  return callAPI({
    url: isPoliticianLiked ? 'deleteLikeFromPolitician' : 'addLikeToPolitician',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args.variables.token}`,
      },
    },
    ...args,
  });
};

const politicianDislike: APIRequest<LikeRequest, LikeResponse, LikeErr, LikeVar> = (args) => {
  const { isPoliticianDisliked, token } = args.variables;
  return callAPI({
    url: isPoliticianDisliked ? 'deleteDislikeFromPolitician' : 'addDislikeToPolitician',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args.variables.token}`,
      },
    },
    ...args,
  });
};
const billLike: APIRequest<LikeRequest, LikeResponse, LikeErr, LikeVar> = (args) => {
  const { isBillLiked, token } = args.variables;
  return callAPI({
    url: isBillLiked ? 'deleteLikeFromPoliticianOnBill' : 'addLikeToPoliticianOnBill',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args.variables.token}`,
      },
    },
    ...args,
  });
};

const billDislike: APIRequest<LikeRequest, LikeResponse, LikeErr, LikeVar> = (args) => {
  const { isBillDisliked, token } = args.variables;
  return callAPI({
    url: isBillDisliked ? 'deleteDislikeFromPoliticianOnBill' : 'addDislikeToPoliticianOnBill',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args.variables.token}`,
      },
    },
    ...args,
  });
};

export const singleNewsAPI = {
  fetchSingleNews,
  massmediaLike,
  massmediaDislike,
  authorLike,
  authorDislike,
  politicianLike,
  politicianDislike,
  billLike,
  billDislike,
};

export const singleNewsAPIActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...singleNewsAPI,
    },
    dispatch
  );
};
