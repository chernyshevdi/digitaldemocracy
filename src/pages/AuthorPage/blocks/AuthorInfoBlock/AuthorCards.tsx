import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../../AuthorPage.module.scss';
import { PercentsLinearGraphic } from './PercentsLinearGraphic';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import InDevelop from '../../../../components/InDevelop/InDevelop';

const AuthorCards = ({ data }) => {
  const { isMobile } = useWindowSize();
  // const maxLength = isMobile ? 160 : 180;
  // const hiddenText =
  //   data?.description?.length >= maxLength ? `${data?.description.slice(0, maxLength)} ...` : data?.description;
  const hiddenText = data?.description;
  // const trust = data?.rating ? (data?.rating > 50 ? 'Высокое доверие' : 'Низкое доверие') : 'Без рейтинга';
  // const badgeBackground = trust === 'Высокое доверие' ? 'green' : trust === 'Низкое доверие' ? 'red' : null;
  // const badgeColor = trust === 'Высокое доверие' ? '#fff' : '#222';
  return (
    <div className={styles.cardsBlock}>
      {!isMobile ? (
        <div className={data?.place ? styles.card : `${styles.card} ${styles.card__nonRaiting}`}>
          <div className={styles.secondCard}>
            <div className={data?.rating ? styles.trustRow : `${styles.trustRow} ${styles.trustRow__nonRaiting}`}>
              {!data?.rating && (
                <div
                  className={`${styles.badge} ${styles.badge__nonRaiting}`}
                >
                  <div className={styles.text}>{'Без рейтинга'}</div>
                </div>
              )}
              { data?.rating && (<div className={styles.percent}>{data?.rating} %</div>) }
            </div>
            { data?.rating && (<PercentsLinearGraphic vote_groups={data?.vote_groups} />) }
          </div>
        </div>
      ) : (
        <div className={styles.mobCard}>
          <div className={styles.mobSecondCard}>
            <div className={styles.mobTrustRow}>
              {!data?.rating && (
                <div
                  className={`${styles.mobBadge} ${styles.mobBadge__nonRaiting}`}
                >
                  <div className={styles.mobText}>{'Без рейтинга'}</div>
                </div>
              )}
              { data?.rating && (<div className={styles.mobPercent}>{data?.rating} %</div>) }
            </div>
            { data?.rating && (<PercentsLinearGraphic vote_groups={data?.vote_groups} />) }
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorCards;
