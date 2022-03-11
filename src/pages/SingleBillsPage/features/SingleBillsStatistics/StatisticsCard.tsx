import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, IconButton, Card, Typography } from '@material-ui/core';
import { avatarColorChanger } from 'src/utils/avatarColorChanger';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { SingleBillsVotesGroup } from '../VotesGroup/SingleBillsVotesGroup';
import styles from './StatisticsCard.module.scss';

interface StatisticsCardPropsI {
  name?: string;
  photo?: string;
  percent?: string;
  short_link?: string;
  field?: string;
  rating?: string;
  likes?: number;
  dislikes?: number;
  isLiked?: boolean;
  isDisliked?: boolean;
  politicianIndex?: number;
  id?: number;
  isMasmedia?: boolean;
}

const StatisticsCard: FC<StatisticsCardPropsI> = ({
  name,
  photo,
  short_link,
  likes,
  dislikes,
  isLiked,
  isDisliked,
}) => {
  const { isMobile } = useWindowSize();
  return (
    <>
      {isMobile ? (
        <div className={styles['card-mobile']}>
          <div className={styles.topItems}>
            <div className={styles.cardContent}>
              <div className={styles.title}>{name}</div>
            </div>
          </div>
          <div className={styles.bottomItems}>
            <SingleBillsVotesGroup likes={likes} dislikes={dislikes} isLiked={isLiked} isDisliked={isDisliked} />
          </div>
        </div>
      ) : (
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <div className={styles.title}>{name}</div>
            <div className={styles.bottomItem}>
              <SingleBillsVotesGroup likes={likes} dislikes={dislikes} isLiked={isLiked} isDisliked={isDisliked} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default StatisticsCard;
