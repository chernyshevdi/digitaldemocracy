import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import ListSidebar from '../../ListSidebar';
import styles from './NewsContent.module.scss';
import { NewsArrayI, NewsListI, newsSelector, NewTopicsI } from '../../../slices/newsSlice';
import CardSmall from '../../CardSmall/CardSmall';
import WidgetLink from '../../WidgetLink/WidgetLink';
import { useWindowSize } from '../../../hooks/useWindowSize';
import TopicsSlider from '../../TopicsSlider';
import { useFetchNewsData } from '../hooks/useFetchNewsData';
import { APIStatus } from '../../../lib/axiosAPI';
import { WrapperAsyncRequest } from '../../Loading/WrapperAsyncRequest';
import { TypeNavigationMenu } from '../../../pages/News';

interface NewsPropsI {
  newsTopics?: Array<NewTopicsI>;
  news?: Array<NewsListI> | Array<NewsArrayI>;
  isMorePages?: boolean;
  nameArea?: string;
  selectedTab?: TypeNavigationMenu;
}

const NewsContent: FC<NewsPropsI> = ({ newsTopics, news, isMorePages, nameArea, selectedTab }) => {
  const { t } = useTranslation();
  const { isMobile } = useWindowSize();
  const [loadMoreNews, setLoadMoreNews] = useState(false);
  const { fetch, fetchSubscriptionsNews, fetchAreaNews, fetchNewsStatus } = useFetchNewsData(setLoadMoreNews);
  const page = useSelector(newsSelector.getPage());

  const handleGetMorePages = () => {
    switch (selectedTab) {
      case TypeNavigationMenu.COUNTRY:
      case TypeNavigationMenu.REGION:
      case TypeNavigationMenu.CITY:
        setLoadMoreNews(true);
        fetchAreaNews(selectedTab, page + 1, undefined, true);
        return;
      case TypeNavigationMenu.SUBSCRIPTIONS:
        setLoadMoreNews(true);
        fetchSubscriptionsNews(page + 1, undefined, true);
        return;
      default:
        setLoadMoreNews(true);
        fetch(page + 1, undefined, true);
    }
  };

  const getHeaderContent = () => {
    if (selectedTab === TypeNavigationMenu.SUBSCRIPTIONS) {
      return t('news.actualNewsSubscriptions');
    }
    return nameArea || t('news.actualNews');
  };

  return (
    <Box className={styles.content}>
      <Box className={styles.contentContainer}>
        {isMobile ? (
          <Box
            sx={{
              minWidth: '160px',
              // maxWidth: '80%',
              margin: '35px auto',
            }}
          >
            <TopicsSlider newsTopics={newsTopics} fetch={fetch} />
          </Box>
        ) : (
          <Box className={styles.listSidebar}>
            <ListSidebar newsTopics={newsTopics} fetch={fetch} />
          </Box>
        )}
        <Box className={styles.news}>
          {!isMobile && (
            <Typography fontSize="35px" textAlign="left" component="span" marginBottom="20px">
              {getHeaderContent()}
            </Typography>
          )}
          <WrapperAsyncRequest height={600} status={loadMoreNews ? APIStatus.Success : fetchNewsStatus}>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              sx={{
                maxWidth: '900px',
                justifyContent: 'center',
              }}
            >
              {news && news.length > 0 ? (
                news.map((item, index) => (
                  <Grid
                    key={index.toString()}
                    item
                    md={4}
                    sm={6}
                    xs={12}
                    style={
                      item.type === 'widgetLink'
                        ? {
                          alignSelf: 'center',
                        }
                        : {}
                    }
                  >
                    {item.type ? (
                      item.type === 'widgetLink' ? (
                        <WidgetLink {...item.widgetLink} />
                      ) : (
                        <CardSmall {...item.news} />
                      )
                    ) : (
                      <CardSmall {...item} />
                    )}
                  </Grid>
                ))
              ) : (
                <Box component={'span'} p={2}>
                  {t('news.warningMissNews')}
                </Box>
              )}
            </Grid>
            <div className={styles.loadMore}>
              <WrapperAsyncRequest status={loadMoreNews ? fetchNewsStatus : APIStatus.Success}>
                <div />
              </WrapperAsyncRequest>
            </div>
          </WrapperAsyncRequest>
          <Box className={styles.content} sx={{ mt: 2 }}>
            {isMorePages && fetchNewsStatus !== APIStatus.Loading && (
              <Button sx={{ mt: 4 }}>
                <Typography className={styles.transparentButtonText} onClick={handleGetMorePages}>
                  {t('buttons.showMore')}
                </Typography>
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NewsContent;
