/* eslint-disable import/no-cycle */
import React, { useState, FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, IconButton } from '@material-ui/core';
import { ReactComponent as Like } from 'src/icons/pictures/smallActiveLike.svg';
import { ReactComponent as LikeDisabled } from 'src/icons/pictures/smallDisabledLike.svg';
import { ReactComponent as Dislike } from 'src/icons/pictures/smallActiveDislike.svg';
import { ReactComponent as DislikeDisabled } from 'src/icons/pictures/smallDisabledDislike.svg';
import { useSearchParams } from 'src/hooks/useSearchParams';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { ModalParams } from 'src/types/routing';
import { userSelectors } from 'src/slices/userSlice';
import { RootState } from 'src/store';
import { APIStatus } from 'src/lib/axiosAPI';
import styles from './VotesGroup.module.scss';
import { useSetLike } from '../../hooks/useSetLike';

interface IProps {
  likes?: number;
  dislikes?: number;
  isLiked?: boolean;
  isDisliked?: boolean;
}

export const SingleBillsVotesGroup: FC<IProps> = ({ likes, dislikes, isLiked, isDisliked }) => {
  const { isMobile } = useWindowSize();
  const { likeStatus, dislikeStatus } = useSelector((s: RootState) => s?.singleBills);
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const { setBillLike, setBillDislike } = useSetLike();
  const {
    [ModalParams.Auth]: { setValue: setAuthValue },
  } = useSearchParams(ModalParams.Auth);

  const handleClickLogin = () => {
    if (!isAuthenticated) {
      setAuthValue('/login');
    }
  };

  return (
    <div className={styles.likeButtons}>
      <button
        type="button"
        className={isLiked ? styles['likeButton-active'] : styles.likeButton}
        onClick={() => {
          if (likeStatus !== APIStatus.Loading && dislikeStatus !== APIStatus.Loading) {
            if (isAuthenticated) {
              setBillLike();
            } else {
              handleClickLogin();
            }
          }
        }}
      >
        {isLiked ? <Like className={styles.likeButtonIcon} /> : <LikeDisabled className={styles.likeButtonIcon} />}
        <div className={styles.votes}>{likes}</div>
      </button>

      <button
        type="button"
        className={isDisliked ? styles['dislikeButton-active'] : styles.likeButton}
        onClick={() => {
          if (likeStatus !== APIStatus.Loading && dislikeStatus !== APIStatus.Loading) {
            if (isAuthenticated) {
              setBillDislike();
            } else {
              handleClickLogin();
            }
          }
        }}
      >
        {isDisliked ? (
          <Dislike className={styles.likeButtonIcon} />
        ) : (
          <DislikeDisabled className={styles.likeButtonIcon} />
        )}
        <div className={styles.votes}>{dislikes}</div>
      </button>
    </div>
  );
};
