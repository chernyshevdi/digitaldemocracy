import React, { FC, useState } from 'react';
import { Box, Button, Grid, Link, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './WidgetLinkPageContent.module.scss';
import { NewsArrayI, NewTopicsI, widgetLinkSelector } from '../../../slices/widgetLinkSlice';
import CardSmall from '../../CardSmall/CardSmall';
import { useFetchWidgetLinkData } from '../hooks/useFetchWidgetLinkPage';
import { APIStatus } from '../../../lib/axiosAPI';
import { WrapperAsyncRequest } from '../../Loading/WrapperAsyncRequest';

interface NewsPropsI {
  newsTopics?: Array<NewTopicsI>;
  news?: Array<NewsArrayI>;
  isMorePages?: boolean;
  widgetTitle?: string;
}

const WidgetLinkPageContent: FC<NewsPropsI> = ({ news, isMorePages, widgetTitle }) => {
  const { t } = useTranslation();
  const [loadMoreNews, setLoadMoreNews] = useState(false);
  const { fetch, fetchNewsStatus } = useFetchWidgetLinkData(setLoadMoreNews);
  const page = useSelector(widgetLinkSelector.getPage());

  const handleGetMorePages = () => {
    setLoadMoreNews(true);
    fetch(page + 1, undefined, true);
  };

  return (
    <Box className={styles.content}>
      <Box className={styles.contentContainer}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Typography fontSize="24px" textAlign="center" component="span" marginBottom="20px">
            {widgetTitle}
          </Typography>
        </Box>
        <Box className={styles.news}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{
              justifyContent: 'flex-start',
            }}
          >
            <WrapperAsyncRequest status={loadMoreNews ? APIStatus.Success : fetchNewsStatus}>
              {news &&
                news.length > 0 &&
                news.map((item, index) => (
                  <Grid key={index.toString()} item md={3} sm={6} xs={12}>
                    <CardSmall {...item} />
                  </Grid>
                ))}
            </WrapperAsyncRequest>
          </Grid>
          <div className={styles.loadMore}>
            <WrapperAsyncRequest status={loadMoreNews ? fetchNewsStatus : APIStatus.Success}>
              <></>
            </WrapperAsyncRequest>
          </div>
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
    </Box>
  );
};

export default WidgetLinkPageContent;
