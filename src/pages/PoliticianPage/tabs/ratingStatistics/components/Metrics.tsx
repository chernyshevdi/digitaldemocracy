import React from 'react';
import { useSelector } from 'react-redux';
import { politicianSelectors } from '../../../../../slices/politicianSlice';
import styles from '../styles.module.scss';

export const Metrics = () => {
  const data = useSelector(politicianSelectors.getRatingStatistic());
  return (
    <div className={styles.metricsContainer}>
      {data?.metrics?.map(({ color, icon, text, title }, index) => (
        <div className={styles.metric} style={{ backgroundColor: color }} key={index.toString()}>
          <div className={styles.icon}>
            <img src={icon} alt="" />
          </div>
          <div className={styles.text}>
            <span className={styles.percent}>{title}</span>
            <span className={styles.desc}>{text}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
