import { useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RootState } from 'src/store';
import { singleNewsAPIActions } from 'src/api/singleNewsAPI';
import { singleNewsActionCreators } from 'src/slices/SingleNewsSlice';
import { APIStatus } from 'src/lib/axiosAPI';
import { getItem } from 'src/lib/localStorageManager';

export const useSetLike = () => {
  const isMassmediaLiked = useSelector((s: RootState) => s?.singleNews?.data?.currentNews?.media?.is_user_liked);
  const isMassmediaDisliked = useSelector((s: RootState) => s?.singleNews?.data?.currentNews?.media?.is_user_disliked);
  const isAuthorLiked = useSelector((s: RootState) => s?.singleNews?.data?.currentNews?.author?.is_user_liked);
  const isAuthorDisliked = useSelector((s: RootState) => s?.singleNews?.data?.currentNews?.author?.is_user_disliked);
  const { data } = useSelector((s: RootState) => s?.singleNews);
  const {
    startMassmediaLike,
    successMassmediaLike,
    failMassmediaLike,
    startMassmediaDislike,
    successMassmediaDislike,
    failMassmediaDislike,
    startAuthorLike,
    successAuthorLike,
    failAuthorLike,
    startAuthorDislike,
    successAuthorDislike,
    failAuthorDislike,
    startPoliticianLike,
    successPoliticianLike,
    failPoliticianLike,
    startPoliticianDislike,
    successPoliticianDislike,
    failPoliticianDislike,
    startBillLike,
    successBillLike,
    failBillLike,
    startBillDislike,
    successBillDislike,
    failBillDislike,
  } = singleNewsActionCreators();
  const {
    massmediaLike,
    massmediaDislike,
    authorLike,
    authorDislike,
    politicianLike,
    politicianDislike,
    billLike,
    billDislike,
  } = singleNewsAPIActions();
  const token = getItem('token');
  const setMassMediaLike = useCallback(() => {
    startMassmediaLike();
    massmediaLike({
      onSuccess: () => {
        if (isMassmediaLiked) {
          successMassmediaLike(false);
        } else {
          successMassmediaLike(true);
          if (isMassmediaDisliked) {
            successMassmediaDislike(false);
          }
        }
      },
      onError: () => {
        failMassmediaLike();
      },
      payload: {
        news_id: data?.currentNews?.id,
        media_id: data?.currentNews?.media?.id,
      },
      variables: {
        isMassmediaLiked,
        token,
      },
    });
  }, [isMassmediaLiked, isMassmediaDisliked, token, data?.currentNews?.id, data?.currentNews?.media?.id]);
  const setMassMediaDislike = useCallback(() => {
    startMassmediaDislike();
    massmediaDislike({
      onSuccess: () => {
        if (isMassmediaDisliked) {
          successMassmediaDislike(false);
        } else {
          successMassmediaDislike(true);
          if (isMassmediaLiked) {
            successMassmediaLike(false);
          }
        }
      },
      onError: () => {
        failMassmediaDislike();
      },
      payload: {
        news_id: data?.currentNews?.id,
        media_id: data?.currentNews?.media?.id,
      },
      variables: {
        isMassmediaDisliked,
        token,
      },
    });
  }, [isMassmediaDisliked, isMassmediaLiked, token, data?.currentNews?.id, data?.currentNews?.media?.id]);
  const setAuthorLike = useCallback(() => {
    startAuthorLike();
    authorLike({
      onSuccess: () => {
        if (isAuthorLiked) {
          successAuthorLike(false);
        } else {
          successAuthorLike(true);
          if (isAuthorDisliked) {
            successAuthorDislike(false);
          }
        }
      },
      onError: () => {
        failAuthorLike();
      },
      payload: {
        news_id: data?.currentNews?.id,
        author_id: data?.currentNews?.author?.id,
      },
      variables: {
        isAuthorLiked,
        token,
      },
    });
  }, [isAuthorLiked, isAuthorDisliked, token, data?.currentNews?.id, data?.currentNews?.author?.id]);
  const setAuthorDislike = useCallback(() => {
    startAuthorDislike();
    authorDislike({
      onSuccess: () => {
        if (isAuthorDisliked) {
          successAuthorDislike(false);
        } else {
          successAuthorDislike(true);
          if (isAuthorLiked) {
            successAuthorLike(false);
          }
        }
      },
      onError: () => {
        failAuthorDislike();
      },
      payload: {
        news_id: data?.currentNews?.id,
        author_id: data?.currentNews?.author?.id,
      },
      variables: {
        isAuthorDisliked,
        token,
      },
    });
  }, [isAuthorLiked, isAuthorDisliked, token, data?.currentNews?.id, data?.currentNews?.author?.id]);
  const setPoliticianLike = useCallback(
    ({ index, id, isLiked, isDisliked }) => {
      const isPoliticianLiked = isLiked;
      const isPoliticianDisliked = isDisliked;
      startPoliticianLike({ id });
      politicianLike({
        onSuccess: () => {
          if (isPoliticianLiked) {
            successPoliticianLike({ index, id, status: false });
          } else {
            successPoliticianLike({ index, id, status: true });
            if (isPoliticianDisliked) {
              successPoliticianDislike({ index, id, status: false });
            }
          }
        },
        onError: () => {
          failPoliticianLike({ id });
        },
        payload: {
          politician_id: id,
          voting_place: 'news',
          news_id: data?.currentNews?.id,
        },
        variables: {
          isPoliticianLiked,
          token,
        },
      });
    },
    [token, data?.currentNews?.id]
  );

  const setPoliticianDislike = useCallback(
    ({ index, id, isLiked, isDisliked }) => {
      const isPoliticianLiked = isLiked;
      const isPoliticianDisliked = isDisliked;
      startPoliticianDislike({ id });
      politicianDislike({
        onSuccess: () => {
          if (isPoliticianDisliked) {
            successPoliticianDislike({ index, id, status: false });
          } else {
            successPoliticianDislike({ index, id, status: true });
            if (isPoliticianLiked) {
              successPoliticianLike({ index, id, status: false });
            }
          }
        },
        onError: () => {
          failPoliticianDislike({ id });
        },
        payload: {
          politician_id: id,
          voting_place: 'news',
          news_id: data?.currentNews?.id,
        },
        variables: {
          isPoliticianDisliked,
          token,
        },
      });
    },
    [token, data?.currentNews?.id]
  );
  const setBillLike = useCallback(
    ({ index, id, isLiked, isDisliked }) => {
      const isBillLiked = isLiked;
      const isBillDisliked = isDisliked;
      startBillLike({ id });
      billLike({
        onSuccess: () => {
          if (isBillLiked) {
            successBillLike({ index, id, status: false });
          } else {
            successBillLike({ index, id, status: true });
            if (isBillDisliked) {
              successBillDislike({ index, id, status: false });
            }
          }
        },
        onError: () => {
          failBillLike({ id });
        },
        payload: {
          bill_id: id,
          voting_place: 'news',
          news_id: data?.currentNews?.id,
        },
        variables: {
          isBillLiked,
          token,
        },
      });
    },
    [token, data?.currentNews?.id]
  );

  const setBillDislike = useCallback(
    ({ index, id, isLiked, isDisliked }) => {
      const isBillLiked = isLiked;
      const isBillDisliked = isDisliked;
      startBillDislike({ id });
      billDislike({
        onSuccess: () => {
          if (isBillDisliked) {
            successBillDislike({ index, id, status: false });
          } else {
            successBillDislike({ index, id, status: true });
            if (isBillLiked) {
              successBillLike({ index, id, status: false });
            }
          }
        },
        onError: () => {
          failBillDislike({ id });
        },
        payload: {
          bill_id: id,
          voting_place: 'news',
          news_id: data?.currentNews?.id,
        },
        variables: {
          isBillDisliked,
          token,
        },
      });
    },
    [token, data?.currentNews?.id]
  );
  return {
    setMassMediaLike,
    setMassMediaDislike,
    setAuthorLike,
    setAuthorDislike,
    setPoliticianLike,
    setPoliticianDislike,
    setBillLike,
    setBillDislike,
  };
};

export default useSetLike;
