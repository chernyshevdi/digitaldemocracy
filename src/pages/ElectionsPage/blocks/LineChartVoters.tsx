import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '@material-ui/core';
import styles from 'src/pages/PoliticianPage/PoliticianPage.module.scss';

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

interface IProps {
  data?: any;
}

export const LineChartVoters: FC<IProps> = ({ data }) => {
  const { t, i18n } = useTranslation();
  const titleTooltip = () => {
    const title = `${t('profile.electorate')}: ${
      data?.city_full?.title?.[i18n.language] ||
      data?.region?.title?.[i18n.language] ||
      data?.country?.title?.[i18n.language] ||
      data?.regionElection?.title?.[i18n.language] ||
      t('info.worldUser')
    }`;
    // console.log('title', data);
    return title;
  };
  return (
    <div className={styles.lineChartVotersContainer}>
      <Tooltip title={titleTooltip()}>
        <div className={styles.lines}>
          {data?.vote_groups &&
            lines(t).map(({ color, id, zIndex, width }, index) => {
              return (
                <Tooltip title="" key={index.toString()}>
                  <div className={styles.line} style={{ backgroundColor: color, width: `${width}%`, zIndex }}>
                    <span className={styles.count}>{`${data?.number_of_votes_users[id]} ${t('info.people')} `}</span>
                  </div>
                </Tooltip>
              );
            })}
        </div>
      </Tooltip>
      <div className={styles.legends}>
        {data?.vote_groups &&
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
