import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Highcharts, { chart } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import { useFetchPoliticianDossierGraph } from '../hooks/useFetchPoliticianDossierGraph';
import { WrapperAsyncRequest } from '../../../../../components/Loading/WrapperAsyncRequest';
import styles from '../styles.module.scss';
import { userSelectors } from '../../../../../slices/userSlice';

interface IPoliticianDossierGraph {
  setIsGraphShown: any,
  politician: any,
  changedChartData: any,
  status: any,
  setDate: any
}

const PoliticianDossierChart: React.FC<IPoliticianDossierGraph> = ({ setIsGraphShown, politician, changedChartData, status, setDate }) => {
  const { t } = useTranslation();
  const afterSetExtremes = (zoomAxis) => {
    const { min } = zoomAxis;
    const { max } = zoomAxis;
    setDate({ min: Math.floor(min / 1000), max: Math.floor(max / 1000) });
  };

  const options = {
    chart: {
      zoomType: 'x',
    },
    title: {
      text: `${politician.name || ''} ${politician.english_name ? `(${politician.english_name})` : ''}`,
    },
    xAxis: {
      type: 'datetime',
      events: {
        afterSetExtremes
      },
    },
    yAxis: {
      title: {
        text: '0% - 100%',
      },
      max: 100,
    },
    tooltip: {
      xDateFormat: '%A, %b %e',
    },
    area: {
      fillColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1,
        },
        stops: [
          [0, Highcharts.getOptions().colors[0]],
          [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')],
        ],
      },
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        name: '%',
        data: changedChartData,
        zoneAxis: 'y',
        zones: [
          {
            value: 49,
            color: 'rgb(190, 59, 33)',
          },
          {
            color: 'rgb(36, 130, 50)',
          },
        ],
      },
    ],
  };
  const cd = (w) => {
    const arr = Object.values(w);
    return [arr.pop(), ...arr] || [];
  };
  Highcharts.setOptions({
    lang: {
      months: Object.values(t('mountsFullName')),
      // @ts-ignore
      weekdays: cd(t('days')),
      shortMonths: Object.values(t('mountsShortName')),
      resetZoom: t('info.resetZoom'),
    },
  });
  const zoomInHandler = () => {

  };
  return (
    <WrapperAsyncRequest status={status}>
      <div>
        <span
          className={styles.hideChartBtn}
          onClick={() => setIsGraphShown(false)}
          onKeyDown={() => setIsGraphShown(false)}
          role={'button'}
          tabIndex={0}
        >
          {t('buttons.hideChart')}
        </span>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </WrapperAsyncRequest>
  );
};

export default PoliticianDossierChart;
