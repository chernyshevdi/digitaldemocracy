import React, { useEffect, useMemo, useState, memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Highcharts from 'highcharts';
import { WrapperAsyncRequest } from 'src/components/Loading/WrapperAsyncRequest';
import HighchartsReact from 'highcharts-react-official';
import { useFetchChart } from '../../../hooks/useFetchChart';
import { politicianActionCreators, politicianSelectors } from '../../../../../slices/politicianSlice';

export const Highchart = memo(() => {
  const { t } = useTranslation();
  const { fetch, status } = useFetchChart();
  const { setDate, setReset } = politicianActionCreators();
  const chartData = useSelector(politicianSelectors.getChartData());

  const formatDate = (date) => {
    return new Date(date).toLocaleString('ru-RU',
      {
        weekday: 'long',
        month: 'long',
        day: '2-digit',
        year: 'numeric'
      });
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

  const afterSetExtremes = (zoomAxis) => {
    const { min } = zoomAxis;
    const { max } = zoomAxis;
    setDate({ min: Math.floor(min / 1000), max: Math.floor(max / 1000) });
    setReset();
  };

  useEffect(() => {
    fetch();
  }, []);
  const dateForChat = useMemo(() => {
    let arr = [];
    if (chartData.politicianVotingElectorateChange) {
      arr = chartData.politicianVotingElectorateChange.map((item) => ({
        x: item[0],
        y: item[2],
        votes: item[3],
        votes2: item[1] || 0,
      }));
    }
    return arr;
  }, [chartData]);
  const options = {
    chart: {
      zoomType: 'x',
    },
    title: {
      text: '',
    },
    xAxis: {
      type: 'datetime',
      events: {
        afterSetExtremes,
      },
      startOfWeek: 1
    },
    yAxis: {
      title: {
        text: '0% - 100%',
      },
      max: 100,
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
    plotOptions: {
      line: {
        marker: {
          enabled: false
        }
      },
      area: {
        marker: {
          enabled: false
        }
      }
    },
    series: [
      {
        name: '%',
        data: [...(chartData?.politicianRatingChange || [])],
        zoneAxis: 'y',
        tooltip: {
          headerFormat: '<b>{point.x:%A %d-%b-%Y}</b><br/>',
        },
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
      {
        type: 'area',
        name: t('info.voted'),
        data: [...dateForChat],
        lineColor: 'rgb(128, 127, 127)',
        tooltip: {
          headerFormat: '<b>{point.x:%A %d-%b-%Y}</b><br/>',
          pointFormat: `${t('info.votedPeople')}: {point.votes2}<br/>${t('info.totalElectorate')}: {point.votes}`,
        },
      },
    ],
  };
  return (
    <WrapperAsyncRequest status={status}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </WrapperAsyncRequest>
  );
});
