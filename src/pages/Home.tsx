import { useEffect } from 'react';
import type { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { HomeHero, HomeSlider, HomeFeatures } from '../components/home';
import { useFetchHomePageData } from '../components/home/hooks/useFetchHomePageData';
import { homeSelector, homeSlice } from '../slices/homeSlice';
import { APIStatus } from '../lib/axiosAPI';
import { Loading } from '../components/Loading/Loading';
import gtm from '../lib/gtm';
import { userSelectors } from '../slices/userSlice';
import News from './News';

const Home: FC = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);
  const { fetch, fetchDataStatus } = useFetchHomePageData();
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());

  const { pageReset } = homeSlice.actions;
  const dispatch = useDispatch();

  useEffect(() => {
    fetch();
    return () => {
      dispatch(pageReset());
    };
  }, []);
  const data = useSelector(homeSelector.getData());
  return (
    <>
      <div>
        {fetchDataStatus === APIStatus.Loading ? (
          <Container
            maxWidth="lg"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '80vh',
            }}
          >
            <Loading size={80} />
          </Container>
        ) : (
          <>
            {!isAuthenticated && <HomeHero />}
            <HomeSlider data={data?.politicians} />
            <News main />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
