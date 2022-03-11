/* eslint-disable import/no-cycle */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@material-ui/core';
import CallMadeIcon from '@material-ui/icons/CallMade';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { useSelector } from 'react-redux';
import { useFetchPromises } from './hooks/useFetchPromises';
import { WrapperAsyncRequest } from '../../../../components/Loading/WrapperAsyncRequest';
import { politicianActionCreators, politicianSelectors } from '../../../../slices/politicianSlice';
import { PromisesVotesGroup } from './VotesGroup/PromisesVotesGroup';
import styles from './styles.module.scss';

export const Promises = () => {
  const { t } = useTranslation();
  const { status, fetch } = useFetchPromises();
  const data = useSelector(politicianSelectors.getPositionPromises());
  const { resetPromises } = politicianActionCreators() as any;
  useEffect(() => {
    fetch();
    return () => resetPromises();
  }, []);

  return (
    <div className={styles.container}>
      <WrapperAsyncRequest status={status}>
        {data?.length ? (
          data?.map(
            (
              {
                text,
                link,
                youtube,
                id,
                promise_date,
                is_user_liked,
                is_user_disliked,
                number_of_likes,
                number_of_dislikes,
              },
              index
            ) => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
              <div key={index.toString()} className={styles.promise}>
                <div className={styles.promises}>
                  <div className={styles.date}>{promise_date}</div>
                  <span>{text}</span>
                  <div className={styles.link}>
                    <p>{t('info.linkOnSource')}:</p>
                    <div className={styles.buttons}>
                      <IconButton className={styles.arrowButton} onClick={() => window.open(link)}>
                        <CallMadeIcon className={styles.arrowLink} />
                      </IconButton>
                      {youtube && (
                        <IconButton className={styles.arrowButton} onClick={() => window.open(youtube)}>
                          <YouTubeIcon className={styles.youtube} />
                        </IconButton>
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.votes}>
                  <p>{t('info.titleRelations')}</p>
                  <PromisesVotesGroup
                    likes={number_of_likes}
                    dislikes={number_of_dislikes}
                    isLiked={is_user_liked}
                    isDisliked={is_user_disliked}
                    index={index}
                    id={id}
                  />
                </div>
              </div>
            )
          )
        ) : (
          <div className={styles.noPromises}>{t('info.noPromises')}</div>
        )}
      </WrapperAsyncRequest>
    </div>
  );
};
