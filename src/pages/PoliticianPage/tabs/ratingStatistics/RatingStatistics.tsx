import React, { useEffect } from 'react';
import { useFetchRatingStatistic } from './hooks/useFetchRatingStatistic';
import { useFetchInfoGrapchicData } from './hooks/useFetchInfoGrapchicData';
import { WrapperAsyncRequest } from '../../../../components/Loading/WrapperAsyncRequest';
import { Metrics } from './components/Metrics';
import { RatingDiagram } from './components/RatingDiagram';
// import { LineChartVoters } from './components/LineChartVoters';
import { InfoGraphic } from './components/infographic/InfoGraphic';

export const RatingStatistics = () => {
  const { status, fetch } = useFetchRatingStatistic();
  const { fetchCountry, statusCountries } = useFetchInfoGrapchicData();
  useEffect(() => {
    fetch();
    fetchCountry();
  }, []);
  return (
    <WrapperAsyncRequest status={status && statusCountries}>
      <Metrics />
      <RatingDiagram />
      <InfoGraphic />
      {/* <LineChartVoters /> */}
    </WrapperAsyncRequest>
  );
};
