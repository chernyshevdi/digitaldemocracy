import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { APIRequest, callAPI } from '../lib/axiosAPI';
import { SingleNewsI } from '../slices/SingleNewsSlice';

interface LikeRequest {
  bill_id?: number;
}

interface LikeResponse {}
interface LikeErr {}

interface LikeVar {
  isMassmediaDisliked?: boolean;
  isMassmediaLiked?: boolean;
  token?: string;
  isAuthorLiked?: boolean;
  isBillLiked?: boolean;
  isAuthorDisliked?: boolean;
  isBillDisliked?: boolean;
  isPoliticianLiked?: boolean;
  isPoliticianDisliked?: boolean;
}

const fetchSingleBills = (args) =>
  callAPI({
    url: `bill/${args.payload.link}`,
    config: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${args.payload.token}`,
      },
    },
    ...args,
  });

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

// const massmediaLike: APIRequest<LikeRequest, LikeResponse, LikeErr, LikeVar> = (args) => {
//   const { isMassmediaLiked, token } = args.variables;
//   return callAPI({
//     url: isMassmediaLiked ? 'deleteLikeFromMedia ' : 'addLikeToMedia ',
//     config: {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         Authorization: `Bearer ${args.variables.token}`,
//       },
//     },
//     ...args,
//   });
// };

// const massmediaDislike: APIRequest<LikeRequest, LikeResponse, LikeErr, LikeVar> = (args) => {
//   const { isMassmediaDisliked, token } = args.variables;
//   return callAPI({
//     url: isMassmediaDisliked ? 'deleteDislikeFromMedia   ' : 'addDislikeToMedia  ',
//     config: {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         Authorization: `Bearer ${args.variables.token}`,
//       },
//     },
//     ...args,
//   });
// };

// const politicianLike: APIRequest<LikeRequest, LikeResponse, LikeErr, LikeVar> = (args) => {
//   const { isPoliticianLiked, token } = args.variables;
//   return callAPI({
//     url: isPoliticianLiked ? 'deleteLikeFromPolitician' : 'addLikeToPolitician',
//     config: {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         Authorization: `Bearer ${args.variables.token}`,
//       },
//     },
//     ...args,
//   });
// };

// const politicianDislike: APIRequest<LikeRequest, LikeResponse, LikeErr, LikeVar> = (args) => {
//   const { isPoliticianDisliked, token } = args.variables;
//   return callAPI({
//     url: isPoliticianDisliked ? 'deleteDislikeFromPolitician' : 'addDislikeToPolitician',
//     config: {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         Authorization: `Bearer ${args.variables.token}`,
//       },
//     },
//     ...args,
//   });
// };

export const singleBillsAPI = {
  fetchSingleBills,
  // massmediaLike,
  // massmediaDislike,
  billLike,
  billDislike,
  // politicianLike,
  // politicianDislike,
};

export const singleBillsAPIActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...singleBillsAPI,
    },
    dispatch
  );
};
