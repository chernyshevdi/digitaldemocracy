import React, { useEffect } from 'react';
import { Grid, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { APIStatus } from 'src/lib/axiosAPI';
import { Loading } from 'src/components/Loading/Loading';
import { WrapperAsyncRequest } from 'src/components/Loading/WrapperAsyncRequest';
import { RootState } from '../../../../../store/index';
import { useFetchNews } from '../../../hooks/useFetchNews';
import { politicianSelectors, politicianActionCreators } from '../../../../../slices/politicianSlice';
import CardSmall from '../../../../../components/CardSmall/CardSmall';
import styles from '../../../PoliticianPage.module.scss';

const NewsBlock = () => {
  const { t } = useTranslation();
  const news = useSelector(politicianSelectors.getNews());
  const { fetch, status } = useFetchNews();
  const { setMorePage } = politicianActionCreators();
  const isMorePages = useSelector((s: RootState) => s.politician.news?.isMorePages);
  const { start_date, end_date, page } = useSelector((s: RootState) => s.politician.news);

  return (
    <div className={styles.newsContainer}>
      {news?.news && news?.news?.length > 0 ? (
        <Grid
          container
          spacing={2}
          sx={{
            justifyContent: 'flex-start',
          }}
        >
          {news?.news?.map((item, index) => (
            <Grid key={index.toString()} item md={4} sm={6} xs={12}>
              <CardSmall {...item} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div className={styles.noNewsBlock}>
          <span>{t('info.notNewsPeriod')}</span>
        </div>
      )}
      {isMorePages ? (
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'cetner',
            marginTop: '20px',
          }}
        >
          <Button
            onClick={() => {
              setMorePage();
            }}
            className={styles.moreButton}
          >
            {t('buttons.showMore')}
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default NewsBlock;
