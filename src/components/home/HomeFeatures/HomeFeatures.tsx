import type { FC } from 'react';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Button, Container, Grid, Link, Typography } from '@material-ui/core';
// import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './HomeFeatures.module.scss';
import ListSidebar from '../../ListSidebar';
import { APIStatus } from '../../../lib/axiosAPI';
import { homeSelector, NewsI, NewsTopicsI } from '../../../slices/homeSlice';
import CardSmall from '../../CardSmall/CardSmall';
import TopicsSlider from '../../TopicsSlider';
import { useFetchHomePageData } from '../hooks/useFetchHomePageData';
import { useWindowSize } from '../../../hooks/useWindowSize';
import '../HomeSlider/HomeSlider.module.scss';
import { WrapperAsyncRequest } from '../../Loading/WrapperAsyncRequest';

interface HomeFeaturesPropsI {
  status?: APIStatus;
  newsTopics?: NewsTopicsI[];
  news?: NewsI[];
  isMorePages?: boolean;
}

const HomeFeatures: FC<HomeFeaturesPropsI> = ({ status, newsTopics, news, isMorePages }) => {
  const { t } = useTranslation();
  const { fetch, fetchNewsStatus } = useFetchHomePageData();
  const page = useSelector(homeSelector.getPage());
  const { isMobile } = useWindowSize();
  const [loadMoreNews, setLoadMoreNews] = useState(false);

  const handleGetMorePages = () => {
    setLoadMoreNews(true);
    fetch(page + 1, undefined, true);
  };

  return (
    <Box>
      <WrapperAsyncRequest status={status} height={600}>
        <Container maxWidth="lg" className={styles.newsWrapper}>
          {isMobile ? (
            <Box className={styles.container}>
              <TopicsSlider newsTopics={newsTopics} fetch={fetch} />
            </Box>
          ) : null}
          <Box style={{ display: 'flex' }}>
            {!isMobile ? (
              <Box
                sx={{
                  marginRight: '60px',
                  width: '24%',
                  minWidth: '220px',
                }}
              >
                <ListSidebar newsTopics={newsTopics} fetch={fetch} />
              </Box>
            ) : null}

            <Box className={styles.news}>
              <Typography fontSize="35px" textAlign="center" component="span" mb={2} style={{ width: '100%' }}>
                {t('home.titleNews')}
              </Typography>
              <WrapperAsyncRequest status={loadMoreNews ? APIStatus.Success : fetchNewsStatus}>
                {news && news.length > 0 ? (
                  <Grid
                    container
                    spacing={2}
                    justifyContent="center"
                    sx={{
                      maxWidth: '900px',
                      justifyContent: 'center',
                    }}
                  >
                    {news?.map((item, index) => (
                      <Grid key={index.toString()} item md={4} sm={6} xs={12}>
                        <CardSmall key={index.toString()} {...item} />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Box>{t('news.warningMissNews')}</Box>
                )}
              </WrapperAsyncRequest>
              {loadMoreNews && fetchNewsStatus !== APIStatus.Initial && (
                <div className={styles.loadMore}>
                  <WrapperAsyncRequest status={loadMoreNews ? fetchNewsStatus : APIStatus.Success}>
                    <div />
                  </WrapperAsyncRequest>
                </div>
              )}
              {fetchNewsStatus !== APIStatus.Loading && (
                <Box className={styles.content} sx={{ mt: 2 }}>
                  <Link to="/news" component={RouterLink} style={{ textDecoration: 'none' }}>
                    <Typography className={styles.violetButtonText}>{t('buttons.inNewsSection')}</Typography>
                  </Link>
                  {isMorePages && (
                    <Button>
                      <Typography className={styles.transparentButtonText} onClick={handleGetMorePages}>
                        {t('buttons.showMore')}
                      </Typography>
                    </Button>
                  )}
                </Box>
              )}
            </Box>
          </Box>
        </Container>
      </WrapperAsyncRequest>
    </Box>
  );
};

export default HomeFeatures;
