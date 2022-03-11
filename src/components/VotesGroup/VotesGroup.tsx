/* eslint-disable import/no-cycle */
import React, { useState, FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, IconButton } from '@material-ui/core';
import { ReactComponent as Like } from 'src/icons/pictures/smallActiveLike.svg';
import { ReactComponent as LikeDisabled } from 'src/icons/pictures/smallDisabledLike.svg';
import { ReactComponent as Dislike } from 'src/icons/pictures/smallActiveDislike.svg';
import { ReactComponent as DislikeDisabled } from 'src/icons/pictures/smallDisabledDislike.svg';
import { useSearchParams } from '../../hooks/useSearchParams';
import { useWindowSize } from '../../hooks/useWindowSize';
import { ModalParams } from '../../types/routing';
import { userSelectors } from '../../slices/userSlice';
import styles from './VotesGroup.module.scss';

interface IProps {
  likes?: number;
  dislikes?: number;
}

export const VotesGroup: FC<IProps> = ({ likes, dislikes }) => {
  const { isMobile } = useWindowSize();
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const { push } = useHistory();
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
        className={like ? styles['likeButton-active'] : styles.likeButton}
        onClick={
          isAuthenticated
            ? () => {
              setLike(!like);
              setDislike(false);
            }
            : handleClickLogin
        }
      >
        {like ? <Like className={styles.likeButtonIcon} /> : <LikeDisabled className={styles.likeButtonIcon} />}
        <div className={styles.votes}>{likes || 23}</div>
      </button>

      <button
        type="button"
        className={dislike ? styles['dislikeButton-active'] : styles.likeButton}
        onClick={
          isAuthenticated
            ? () => {
              setDislike(!dislike);
              setLike(false);
            }
            : handleClickLogin
        }
      >
        {dislike ? (
          <Dislike className={styles.likeButtonIcon} />
        ) : (
          <DislikeDisabled className={styles.likeButtonIcon} />
        )}
        <div className={styles.votes}>{dislikes || 55}</div>
      </button>
    </div>
    // <Box className={styles.likeButtons}>
    //   <IconButton
    //     className={styles.likeButton}
    //     sx={{ marginRight: '10px' }}
    //     onClick={
    //       isAuthenticated
    //         ? () => {
    //             setLike(!like);
    //             setDislike(false);
    //           }
    //         : handleClickLogin
    //     }
    //   >
    //     {like ? (
    //       <Like className={isMobile ? styles.likeButtonIconMobile : styles.likeButtonIcon} />
    //     ) : (
    //       <LikeDisable className={isMobile ? styles.likeButtonIconMobile : styles.likeButtonIcon} />
    //     )}
    //   </IconButton>
    //   <IconButton
    //     className={styles.likeButton}
    //     onClick={
    //       isAuthenticated
    //         ? () => {
    //             setDislike(!dislike);
    //             setLike(false);
    //           }
    //         : handleClickLogin
    //     }
    //   >
    //     {dislike ? (
    //       <Dislike className={isMobile ? styles.likeButtonIconMobile : styles.likeButtonIcon} />
    //     ) : (
    //       <DislikeDisable className={isMobile ? styles.likeButtonIconMobile : styles.likeButtonIcon} />
    //     )}
    //   </IconButton>
    // </Box>
  );
};
