import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { WrapperAsyncRequest } from 'src/components/Loading/WrapperAsyncRequest';
import { Loading } from 'src/components/Loading/Loading';
import { useFetchNews } from '../../hooks/useFetchNews';
import NewsBlock from './components/NewsBlock';
// import ChartNews from './components/ChartNews.js';
import { Highchart } from './components/Highchart';
import { RootState } from '../../../../store/index';
import { APIStatus } from '../../../../lib/axiosAPI';
import { politicianActionCreators } from '../../../../slices/politicianSlice';
import styles from '../../PoliticianPage.module.scss';

export const PoliticianNews = () => {
  const { fetch, status } = useFetchNews();
  const { start_date, end_date, page } = useSelector((s: RootState) => s.politician.news);
  const { setReset } = politicianActionCreators();

  useEffect(() => {
    fetch();
  }, [page, start_date, end_date]);

  return (
    <>
      <Highchart />
      <WrapperAsyncRequest status={status}>
        <NewsBlock />
      </WrapperAsyncRequest>
    </>
  );
};
