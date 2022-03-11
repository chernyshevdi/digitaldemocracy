import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, IconButton, Card, Typography, Tooltip } from '@material-ui/core';
import { avatarColorChanger } from 'src/utils/avatarColorChanger';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { BillVotesGroup } from '../VotesGroup/BillVotesGroup';
import styles from './StatisticsBillCard.module.scss';

interface StatisticsCardPropsI {
  name?: string;
  short_link?: string;
  field?: string;
  rating?: string;
  likes?: number;
  dislikes?: number;
  isLiked?: boolean;
  isDisliked?: boolean;
  billIndex?: number;
  id?: number;
  isMasmedia?: boolean;
}

const StatisticsBillCard: FC<StatisticsCardPropsI> = ({
  id,
  billIndex,
  name,
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
              <Link to={`/singleBills/${short_link}`} className={styles.title}>
                {name}
              </Link>
            </div>
          </div>
          <div className={styles.bottomItems}>
            <BillVotesGroup
              id={id}
              index={billIndex}
              likes={likes}
              dislikes={dislikes}
              isLiked={isLiked}
              isDisliked={isDisliked}
            />
          </div>
        </div>
      ) : (
        <div className={styles.card}>
          <Tooltip title={name}>
            <div className={styles.cardContent}>
              <Link to={`/singleBills/${short_link}`} className={styles.title}>
                {name}
              </Link>
              <div className={styles.bottomItem}>
                <BillVotesGroup
                  id={id}
                  index={billIndex}
                  likes={likes}
                  dislikes={dislikes}
                  isLiked={isLiked}
                  isDisliked={isDisliked}
                />
              </div>
            </div>
          </Tooltip>
        </div>
      )}
    </>
  );
};
export default StatisticsBillCard;
