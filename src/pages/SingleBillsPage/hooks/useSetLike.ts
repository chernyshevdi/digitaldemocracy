import { useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RootState } from 'src/store';
import { APIStatus } from 'src/lib/axiosAPI';
import { getItem } from 'src/lib/localStorageManager';
import { singleBillsActionCreators } from 'src/slices/SingleBillsSlice';
import { singleBillsAPIActions } from 'src/api/singleBillsAPI';

export const useSetLike = () => {
  const isBillLiked = useSelector((s: RootState) => s?.singleBills?.data?.bill.is_user_liked);
  const isBillDisliked = useSelector((s: RootState) => s?.singleBills?.data?.bill.is_user_disliked);
  const { data } = useSelector((s: RootState) => s?.singleBills);
  const { startLike, successLike, failLike, startDislike, successDislike, failDislike } = singleBillsActionCreators();
  const { billLike, billDislike } = singleBillsAPIActions();
  const token = getItem('token');
  const setBillLike = useCallback(() => {
    startLike();
    billLike({
      onSuccess: () => {
        if (isBillLiked) {
          successLike(false);
        } else {
          successLike(true);
          if (isBillDisliked) {
            successDislike(false);
          }
        }
      },
      onError: () => {
        failLike();
      },
      payload: {
        bill_id: data?.bill?.id,
      },
      variables: {
        isBillLiked,
        token,
      },
    });
  }, [isBillLiked, isBillDisliked, token, data?.bill?.id]);
  const setBillDislike = useCallback(() => {
    startDislike();
    billDislike({
      onSuccess: () => {
        if (isBillDisliked) {
          successDislike(false);
        } else {
          successDislike(true);
          if (isBillLiked) {
            successLike(false);
          }
        }
      },
      onError: () => {
        failDislike();
      },
      payload: {
        bill_id: data?.bill?.id,
      },
      variables: {
        isBillDisliked,
        token,
      },
    });
  }, [isBillDisliked, isBillLiked, token, data?.bill?.id]);

  return {
    setBillLike,
    setBillDislike,
  };
};

export default useSetLike;
