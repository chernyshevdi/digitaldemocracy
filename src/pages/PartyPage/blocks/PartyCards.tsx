import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
// import { badgeColorChanger } from 'src/utils/badgeColorChanger';
import styles from '../PartyPage.module.scss';
import { PercentsLinearGraphic } from './PercentsLinearGraphic';
import { useWindowSize } from '../../../hooks/useWindowSize';
import InDevelop from '../../../components/InDevelop/InDevelop';

const PartyCards = ({ data }) => {
  const { t } = useTranslation();
  const trust = data?.rating ? (data?.rating > 50 ? t('info.highTrust') : t('info.lowTrust')) : t('info.withoutRating');
  const badgeBackground = trust === t('info.highTrust') ? 'green' : trust === t('info.lowTrust') ? 'red' : null;
  const badgeColor = trust === t('info.highTrust') ? '#fff' : '#222';
  const { isMobile } = useWindowSize();
  const badgeColorChanger = (percent, type) => {
    if (type === 'ground') {
      if (!!percent && percent >= 0 && percent <= 20) {
        return '#BE3B21';
      }
      if (!!percent && percent > 20 && percent <= 40) {
        return '#EB4335';
      }
      if (!!percent && percent > 40 && percent <= 60) {
        return '#9F9F9F';
      }
      if (!!percent && percent > 60 && percent <= 80) {
        return '#34A853';
      }
      if (!!percent && percent > 80 && percent <= 100) {
        return '#248232';
      }
      return '#B0B0B0';
    }
    if (type === 'text') {
      // if (!!percent && percent >= 0 && percent <= 20) {
      //   return '#BF381B';
      // }
      // if (!!percent && percent > 20 && percent <= 40) {
      //   return '#EC4132';
      // }
      // if (!!percent && percent > 40 && percent <= 60) {
      //   return '#757474';
      // }
      // if (!!percent && percent > 60 && percent <= 80) {
      //   return '#31AA52';
      // }
      // if (!!percent && percent > 80 && percent <= 100) {
      //   return '#1F832E';
      // }
      return 'white';
    }
    return '#757474';
  };
  return (
    <div className={styles.cardsBlock}>
      {!isMobile ? (
        <div className={data?.place && data?.rating ? styles.card : `${styles.card} ${styles.card__nonRaiting}`}>
          <div className={styles.secondCard}>
            <div className={styles.trustRow}>
              <div
                className={data?.place && data?.rating ? styles.badge : `${styles.badge} ${styles.badge__nonRaiting}`}
                style={{
                  backgroundColor: data?.place && data?.rating ? badgeColorChanger(data?.rating, 'ground') : '#C4C4C4',
                }}
              >
                <div
                  className={styles.text}
                  style={{
                    color: data?.place && data?.rating ? badgeColorChanger(data?.rating, 'text') : 'white',
                  }}
                >
                  {data?.place && data?.rating ? `${t('info.place')} ${data?.place}` : t('info.withoutRating')}
                </div>
              </div>
              {data?.place && data?.rating && <div className={styles.percent}>{data?.rating} %</div>}
            </div>
            {data?.place && data?.rating && <PercentsLinearGraphic vote_groups={data?.vote_groups} />}
          </div>
        </div>
      ) : (
        <div className={styles.mobCard}>
          <div className={styles.mobSecondCard}>
            <div className={styles.mobTrustRow}>
              <div
                className={
                  data?.place && data?.rating ? styles.mobBadge : `${styles.mobBadge} ${styles.mobBadge__nonRaiting}`
                }
                style={{
                  backgroundColor: data?.place && data?.rating ? badgeColorChanger(data?.rating, 'ground') : '#C4C4C4',
                }}
              >
                <div
                  className={styles.mobText}
                  style={{
                    color: data?.place && data?.rating ? badgeColorChanger(data?.rating, 'text') : 'white',
                  }}
                >
                  {`${t('info.place')} ${data?.place}`}
                </div>
              </div>
              {data?.place && data?.rating && <div className={styles.mobPercent}>{data?.rating} %</div>}
            </div>
            {data?.place && data?.rating && <PercentsLinearGraphic vote_groups={data?.vote_groups} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default PartyCards;
