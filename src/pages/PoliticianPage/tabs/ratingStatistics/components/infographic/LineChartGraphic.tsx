import React, { FC } from 'react';
import { Tooltip } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import styles from './InfoGraphic.module.scss';

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

interface IProps{
  electorate: any
}

const getWidth = (item: number, total: number) => ((item * 100) / total < 1 ? 1 : (item * 100) / total);

const LineChartGraphic:FC<IProps> = ({ electorate }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.lineChartVotersContainer}>
        <div className={styles.lines}>
          {electorate.totalElectorate !== null &&
          lines(t).map(({ color, id, zIndex, width }, index) => {
            const item = getWidth(electorate[id], electorate.totalElectorate);

            return (
              <Tooltip title="" key={index.toString()}>
                <div className={styles.line} style={{ backgroundColor: color, width: `${width}%`, zIndex }}>
                  <span className={styles.count}>{`${electorate[id]} ${t('info.people')} `}</span>
                </div>
              </Tooltip>
            );
          })}
        </div>
        <div className={styles.legends}>
          {electorate.totalElectorate !== null &&
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

export default LineChartGraphic;
