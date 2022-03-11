import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import { useFetchBrowsingHistory } from './hooks/useFetchBrowsingHistory';
import { userActionCreators, userSelectors } from '../../../../slices/userSlice';
import styles from './styles.module.scss';
import CardSmall from '../../../../components/CardSmall/CardSmall';
import { WrapperAsyncRequest } from '../../../../components/Loading/WrapperAsyncRequest';
import { APIStatus } from '../../../../lib/axiosAPI';

export const BrowsingHistory = () => {
  const { t } = useTranslation();
  const { status, fetch } = useFetchBrowsingHistory();
  const { data, page } = useSelector(userSelectors.getBrowsingHistory());
  const [loadMore, setLoadMore] = useState(false);
  const { resetNews } = userActionCreators();

  const handleLoadMore = () => {
    setLoadMore(true);
    fetch(page + 1);
  };

  useEffect(() => {
    fetch();
    return () => {
      resetNews();
    };
  }, []);

  return (
    <WrapperAsyncRequest status={loadMore ? APIStatus.Success : status}>
      <div className={styles.container}>
        {data?.views && data?.views?.length > 0
          ? data?.views?.map((newsBlock) => (
            <div className={styles.newsBlock}>
              <span>
                {t('info.dateView')}:
                {' '}
                {newsBlock.dateView}
              </span>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                sx={{
                  maxWidth: '900px',
                  justifyContent: 'flex-start'
                }}
                className={styles.block}
              >
                {newsBlock?.news.map((item, index) => (
                  <Grid
                    key={index.toString()}
                    item
                    md={4}
                    sm={6}
                    xs={12}
                  >
                    <CardSmall
                      {...item}
                    />
                  </Grid>
                ))}
              </Grid>
            </div>
          ))
          : (
            <Box>{t('news.warningMissNews')}</Box>
          )}
      </div>
      {data?.isMorePages && (
        <Button
          onClick={handleLoadMore}
        >
          <Typography
            className={styles.transparentButtonText}
          >
            {t('buttons.showMore')}
          </Typography>
        </Button>
      )}
      <WrapperAsyncRequest status={loadMore ? status : APIStatus.Success}><></></WrapperAsyncRequest>
    </WrapperAsyncRequest>
  );
};
