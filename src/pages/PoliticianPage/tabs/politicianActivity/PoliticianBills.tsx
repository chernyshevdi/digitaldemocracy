/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CallMadeIcon from '@material-ui/icons/CallMade';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { useSelector } from 'react-redux';
import { useFetchBills } from './hooks/useFetchBills';
import { WrapperAsyncRequest } from '../../../../components/Loading/WrapperAsyncRequest';
import { politicianSelectors, politicianActionCreators } from '../../../../slices/politicianSlice';
import { BillsVotesGroup } from './VotesGroup/BillsVotesGroup';
import styles from './styles.module.scss';

const Bills = (props) => {
  const {
    title,
    source_link,
    publication_date,
    id,
    index,
    number_of_likes,
    number_of_dislikes,
    is_user_liked,
    is_user_disliked,
    link,
    short_link
  } = props;
  const { t } = useTranslation();
  return (
    <>
      <div className={styles.promise}>
        <div className={styles.promises}>
          <div className={styles.date}>{publication_date}</div>
          <Link to={`/singleBills/${short_link}`}>
            <span style={{ color: 'black' }}>{title}</span>
          </Link>
          {/* <div className={styles.link}>
            <p>Иcточник: </p>
            <IconButton className={styles.arrowButton} onClick={() => setOpen(!open)}>
              <CallMadeIcon className={styles.arrowLink} />
            </IconButton>
          </div> */}
        </div>
        <div className={styles.votes}>
          <p>{t('info.titleRelations')}</p>
          <BillsVotesGroup
            index={index}
            id={id}
            likes={number_of_likes}
            dislikes={number_of_dislikes}
            isLiked={is_user_liked}
            isDisliked={is_user_disliked}
          />
        </div>
      </div>
    </>
  );
};

export const PoliticianBills = () => {
  const { t } = useTranslation();
  const { status, fetch } = useFetchBills();
  const data = useSelector(politicianSelectors.getBills());
  const { resetBills } = politicianActionCreators() as any;
  useEffect(() => {
    fetch();
    return () => resetBills();
  }, []);

  return (
    <div className={styles.container}>
      <WrapperAsyncRequest status={status}>
        {data?.length ? (
          data?.map((item, index) => <Bills key={item.id} {...item} index={index} />)
        ) : (
          <div className={styles.noPromises}>{t('info.emptySection')}</div>
        )}
      </WrapperAsyncRequest>
    </div>
  );
};
