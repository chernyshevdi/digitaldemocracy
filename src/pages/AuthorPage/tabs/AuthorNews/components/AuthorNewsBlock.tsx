import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFetchAuthor } from 'src/pages/AuthorPage/hooks/useFetchAuthor';
import { RootState } from 'src/store/index';
import { APIStatus } from 'src/lib/axiosAPI';
import { useLocation } from 'react-router-dom';
import { authorActionCreators } from '../../../../../slices/authorSlice';
import CardSmall from '../../../../../components/CardSmall/CardSmall';
import styles from '../../../AuthorPage.module.scss';

import { useWindowSize } from '../../../../../hooks/useWindowSize';
import { SortBadge } from './SortBadge';
import { sortMassMedia } from '../../../../../static/static';
import { Loading } from '../../../blocks/Loading/Loading';

export const AuthorNewsBlock = () => {
  const { t } = useTranslation();
  const { news } = useSelector((s: RootState) => s?.author?.news);
  const location = useLocation().pathname;
  const { newsStatus, sort_direction, sort_field, page } = useSelector((s: RootState) => s.author);
  const { resetNews, resetSort } = authorActionCreators();
  const { isMobile } = useWindowSize();
  const { fetchNews } = useFetchAuthor();
  useEffect((): any => {
    if (newsStatus !== APIStatus.Initial) {
      resetNews();
      resetSort();
    }
    return (): any => {
      resetSort();
      resetNews();
    };
  }, []);
  useEffect((): any => {
    fetchNews();
  }, [sort_direction, sort_field, page]);
  return (
    <>
      {newsStatus === APIStatus.Success ? (
        <div className={styles.newsContainer}>
          {news && news.length > 0 ? (
            <>
              <div className={styles.sortRow}>
                {sortMassMedia(t).map(({ id, full_title, short_title, field }) => {
                  return <SortBadge key={id} text={!isMobile ? full_title : short_title} field={field} />;
                })}
              </div>
              <div className={styles.news}>
                {news?.map((item, index) => (
                  <div className={styles.outerCardContainer}>
                    <CardSmall {...item} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className={styles.noNewsBlock}>
              <span>{t('info.newsSelectPeriod')}</span>
            </div>
          )}
        </div>
      ) : newsStatus === APIStatus.Failure ? (
        <div className={styles.noNewsBlock}>
          <span>{t('info.newsNotFoundAuthor')}</span>
        </div>
      ) : (
        <div className={styles.loaderWrapper}>
          <Loading size={40} />
        </div>
      )}
    </>
  );
};

export default AuthorNewsBlock;
