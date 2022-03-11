import React from 'react';
import { useSelector } from 'react-redux';
import { Chart } from 'react-google-charts';
import { useTranslation } from 'react-i18next';
import styles from '../styles.module.scss';
import { politicianSelectors } from '../../../../../slices/politicianSlice';
import { Loading } from '../../../../../components/Loading/Loading';
import { useWindowSize } from '../../../../../hooks/useWindowSize';

export const RatingDiagram = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const data = useSelector(politicianSelectors.getRatingStatistic());
  const chartData = data?.voicesByRegion?.map(({ country_with_type, region_with_type, total }) => {
    const { [currentLang]: lang } = JSON.parse(region_with_type || country_with_type);
    const { ru } = JSON.parse(region_with_type || country_with_type);
    return [lang || ru, total];
  });
  const { isMobile } = useWindowSize();
  return (
    <div className={styles.diagramContainer}>
      {chartData && chartData.length !== 0 && (
        <div className={styles.wrapper}>
          <Chart
            width={isMobile ? '300px' : '500px'}
            height="300px"
            chartType="PieChart"
            className={styles.chart}
            loader={<Loading />}
            data={[['Task', 'Hours per Day'], ...chartData]}
            options={{
              title: t('info.titleStatisticRegion'),
              is3D: true,
              animation: {
                duration: 1000,
                easing: 'out',
                startup: true,
              },
            }}
          />
        </div>
      )}
    </div>
  );
};
