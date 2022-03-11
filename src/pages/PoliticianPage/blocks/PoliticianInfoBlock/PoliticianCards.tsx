import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '@material-ui/core';
import styles from '../../PoliticianPage.module.scss';
import { politicianSelectors } from '../../../../slices/politicianSlice';
import { PercentsLinearGraphic } from './PercentsLinearGraphic';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import InDevelop from '../../../../components/InDevelop/InDevelop';
import { LineChartVoters } from './LineChartVoters';

const PoliticianCards = () => {
  const { t, i18n } = useTranslation();
  const data = useSelector(politicianSelectors.getPoliticianInfo());
  const { isMobile } = useWindowSize();
  const history = useHistory();
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
      return '#ffffff';
    }
    return '#757474';
  };
  // const trust = data?.rating ? (data?.rating > 50 ? 'Высокое доверие' : 'Низкое доверие') : 'Без рейтинга';
  // const badgeBackground = trust === 'Высокое доверие' ? 'green' : trust === 'Низкое доверие' ? 'red' : null;
  // const badgeColor = trust === 'Высокое доверие' ? '#fff' : '#222';
  const titleTooltip = () => {
    const title = `${t('profile.rankingPlace')}: ${
      data?.city_full?.title?.[i18n.language] ||
      data?.region?.title?.[i18n.language] ||
      data?.country?.title?.[i18n.language] ||
      t('info.worldUser')
    }`;
    return title;
  };
  return (
    <div className={styles.cardsBlock}>
      {/* <div className={styles.card}>
        <div className={styles.description}>
          <div className={styles.text}>{hiddenText || 'Описание отсутствует'}</div>
        </div>
      </div> */}
      {!isMobile ? (
        <>
          <div className={data?.place ? styles.card : `${styles.card} ${styles.card__nonRaiting}`}>
            <div className={styles.secondCard}>
              <div className={styles.trustRow}>
                <Tooltip title={titleTooltip()}>
                  <div
                    className={data?.place ? styles.badge : `${styles.badge} ${styles.badge__nonRaiting}`}
                    style={{
                      backgroundColor: badgeColorChanger(data?.rating, 'ground'),
                      cursor: 'pointer',
                    }}
                  >
                    <div
                      className={styles.text}
                      style={{
                        color: badgeColorChanger(data?.rating, 'text'),
                      }}
                    >
                      {data?.place ? `${t('info.place')} ${data?.place}` : t('info.withoutRating')}
                    </div>
                  </div>
                </Tooltip>
                {data?.rating && <div className={styles.percent}>{data?.rating} %</div>}
              </div>
              {data?.rating && <PercentsLinearGraphic vote_groups={data?.vote_groups} />}
            </div>
          </div>
        </>
      ) : (
        <div className={styles.mobCard}>
          <div className={styles.mobSecondCard}>
            <div className={styles.mobTrustRow}>
              <div
                className={data?.place ? styles.mobBadge : `${styles.mobBadge} ${styles.mobBadge__nonRaiting}`}
                style={{
                  backgroundColor: badgeColorChanger(data?.rating, 'ground'),
                }}
              >
                <div
                  className={styles.text}
                  style={{
                    color: badgeColorChanger(data?.rating, 'text'),
                  }}
                >
                  {data?.place ? `${t('info.place')} ${data?.place}` : t('info.withoutRating')}
                </div>
              </div>
              {data?.rating && <div className={styles.mobPercent}>{data?.rating} %</div>}
            </div>
            {data?.rating && <PercentsLinearGraphic vote_groups={data?.vote_groups} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default PoliticianCards;
