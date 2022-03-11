import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '@material-ui/core';
import { politicianSelectors } from '../../../../slices/politicianSlice';
import styles from '../../PoliticianPage.module.scss';
import { useFetchLineChartVoters } from '../../hooks/useFetchLineChartVoters';

const lines = (t) => [
  {
    width: 33.3,
    title: t('info.voted') || 'Проголосовали',
    id: 'numberOfVotedUsers',
    color: '#747373',
    zIndex: 3,
  },
  {
    width: 66.6,
    title: t('info.present') || 'Присутствуют',
    id: 'numberOfUsersFromRegion',
    color: '#C1C1C1',
    zIndex: 2,
  },
  {
    width: 100,
    title: t('info.totalElectorate') || 'Всего электората',
    id: 'totalElectorate',
    color: '#E1E0E0',
    zIndex: 1,
  },
];

const getWidth = (item: number, total: number) => ((item * 100) / total < 1 ? 1 : (item * 100) / total);

export const LineChartVoters = () => {
  const { t, i18n } = useTranslation();
  const data = useSelector(politicianSelectors.getPoliticianInfo());
  const numberOfVotes = useSelector(politicianSelectors.getVoteCountStatistics());
  const { fetch } = useFetchLineChartVoters();
  useEffect(() => {
    fetch();
  }, []);
  const titleTooltip = () => {
    const title = `${t('profile.electorate')}: ${
      data?.city_full?.title?.[i18n.language] ||
      data?.region?.title?.[i18n.language] ||
      data?.country?.title?.[i18n.language] ||
      t('info.worldUser')
    }`;
    return title;
  };
  return (
    <div className={styles.lineChartVotersContainer}>
      <Tooltip title={titleTooltip()}>
        <div className={styles.lines}>
          {numberOfVotes &&
            lines(t).map(({ color, id, zIndex, width }, index) => {
              const item = getWidth(numberOfVotes[id], numberOfVotes.totalElectorate);

              return (
                <Tooltip title="" key={index.toString()}>
                  <div className={styles.line} style={{ backgroundColor: color, width: `${width}%`, zIndex }}>
                    <span className={styles.count}>{`${numberOfVotes[id]} ${t('info.people')} `}</span>
                  </div>
                </Tooltip>
              );
            })}
        </div>
      </Tooltip>
      <div className={styles.legends}>
        {numberOfVotes &&
          lines(t).map(({ color, title, id }) => (
            <div className={styles.legend} key={id}>
              <span>{title}</span>
              <div style={{ backgroundColor: color }} className={styles.legendMark} />
            </div>
          ))}
      </div>
    </div>
  );
};
