import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import { singleNewsSelector, singleNewsActionCreators } from 'src/slices/SingleNewsSlice';
import { useParams } from 'react-router-dom';
import { WrapperAsyncRequest } from './features/Loading/WrapperAsyncRequest';
import SingleNewsHero from './features/SingleNewsHero/SingleNewsHero';
import SingleNewsList from './features/SingleNewsList/SingleNewsList';
import SingleNewsStatistics from './features/SingleNewsStatistics/SingleNewsStatistics';
import { useFetchSingleNews } from './hooks/useFetchSingleNews';
import SingleNewsVotes from './features/SingleNewsList/SingleNewsVotes';
import styles from '../MassMediaPage/MassMediaPage.module.scss';

const SingleNews = (props) => {
  const { fetch } = useFetchSingleNews();
  const { resetSingleNews } = singleNewsActionCreators();
  const data = useSelector(singleNewsSelector.getData());
  const status = useSelector(singleNewsSelector.getStatus());
  const { link } = useParams() as any;
  useEffect((): any => {
    fetch(link);
    window.scrollTo(0, 0);
    return () => resetSingleNews();
  }, [link]);
  return (
    <Container maxWidth="lg" className={styles.container}>
      <div className={styles.container}>
        <WrapperAsyncRequest status={status}>
          <SingleNewsHero data={data?.currentNews} />
          <SingleNewsStatistics
            author={data?.currentNews?.author}
            media={data?.currentNews?.media}
            politicians={data?.politicians}
            bills={data?.bills}
          />
          {data?.news && data?.news.length > 0 && <SingleNewsList news={data?.news} isMorePages={data?.isMorePages} />}
          {data?.elections && data?.elections.length > 0 && (
            <SingleNewsVotes elections={data?.elections} news={data?.news} isMorePages={data?.isMorePages} />
          )}
        </WrapperAsyncRequest>
      </div>
    </Container>
  );
};

export default SingleNews;
