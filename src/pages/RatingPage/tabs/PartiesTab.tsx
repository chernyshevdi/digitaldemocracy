import React, { useEffect, useState } from 'react';
import { WrapperAsyncRequest } from 'src/components/Loading/WrapperAsyncRequest';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Box, Button, Typography } from '@material-ui/core';
import { ratingSelectors } from '../../../slices/ratingSlice';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { useFetchParties } from '../hooks/useFetchParties';
import { RootState } from '../../../store';
import { SortBadge } from './SortBadge';
import { sortRatingParties } from '../../../static/static';
import { userSelectors } from '../../../slices/userSlice';
import PartyCard from '../PartyCard/PartyCard';
import styles from './Tabs.module.scss';
import { APIStatus } from '../../../lib/axiosAPI';

const PartiesTab = () => {
  const { t } = useTranslation();
  const { isMobile } = useWindowSize();
  const { parties, isMorePages } = useSelector((s: RootState) => s.rating?.parties);
  const { fetch, status } = useFetchParties();
  const sortDirection = useSelector((s: RootState) => s.rating.sort_direction);
  const sortField = useSelector((s: RootState) => s.rating.sort_field);
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (page > 1) {
      fetch(page);
    } else {
      fetch();
    }
  }, [sortDirection, sortField, isAuthenticated]);

  const handleMorePages = () => {
    setPage(page + 1);
  };

  return (
    <>
      <div className={styles.newsContainer}>
        <div className={styles.sortRow}>
          {sortRatingParties(t).map(({ id, full_title, short_title, field }) => {
            return <SortBadge key={id} text={!isMobile ? full_title : short_title} field={field} setPage={setPage} />;
          })}
        </div>
        <WrapperAsyncRequest status={isMorePages ? APIStatus.Success : status}>
          {parties && parties?.length > 0 ? (
            <>
              <div className={styles.news}>
                {parties?.map((item, index) => (
                  <PartyCard key={item.id} {...item} />
                ))}
              </div>
              <WrapperAsyncRequest status={status} />
            </>
          ) : (
            <div className={styles.noNewsBlock}>
              <span>{t('tabs.warningMessageParties')}</span>
            </div>
          )}
        </WrapperAsyncRequest>
        {isMorePages && status !== APIStatus.Loading && (
          <Box className={styles.containerBtn}>
            <Button className={styles.containerBtn}>
              <Typography
                className={styles.btnShowMore}
                onClick={handleMorePages}
              >
                {t('buttons.showMore')}
              </Typography>
            </Button>
          </Box>
        )}
      </div>
    </>
  );
};

export default PartiesTab;
