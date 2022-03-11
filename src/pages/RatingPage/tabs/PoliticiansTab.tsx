import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { WrapperAsyncRequest } from 'src/components/Loading/WrapperAsyncRequest';
import { Box, Button, Typography } from '@material-ui/core';
import { ratingActionCreators } from '../../../slices/ratingSlice';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { useFetchPoliticians } from '../hooks/useFetchPoliticians';
import { RootState } from '../../../store';
import { SortBadge } from './SortBadge';
import { SortDropdown } from './SortDropdown';
import { SortDropdownMobile } from './SortDropdownMobile';
import { sortDropdownPoliticians, sortRatingPoliticians } from '../../../static/static';
import { userSelectors } from '../../../slices/userSlice';
import PoliticiansCard from '../PoliticianCard/PoliticiansCard';
import styles from './Tabs.module.scss';
import { APIStatus } from '../../../lib/axiosAPI';

const PoliticiansTab = () => {
  const { t } = useTranslation();
  const { isMobile } = useWindowSize();
  const { politicians, isMorePages } = useSelector((s: RootState) => s.rating?.politicians);
  const { fetch, status } = useFetchPoliticians();
  // const { resetFilterForGeography } = ratingActionCreators();
  const sortDirection = useSelector((s: RootState) => s.rating.sort_direction);
  const sortField = useSelector((s: RootState) => s.rating.sort_field);
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const [world, setWorld] = useState(true);
  const [worldVotes, setWorldVotes] = useState(false);
  const [page, setPage] = useState(1);
  const [update, setUpdate] = useState(true);

  useEffect(() => {
    if (page > 1) {
      fetch(world, worldVotes, page);
    } else {
      fetch(world, worldVotes);
    }
  }, [sortDirection, sortField, isAuthenticated, world, worldVotes, update, page]);

  const handleMorePages = () => {
    setPage(page + 1);
  };

  return (
    <>
      <div className={styles.newsContainer}>
        {!isMobile ? (
          <div className={styles.sortDrop}>
            {sortDropdownPoliticians(t).map(({ id, full_title, field }) => {
              return <SortDropdown
                key={id}
                text={full_title}
                field={field}
                world={world}
                setWorld={setWorld}
                update={update}
                setUpdate={setUpdate}
                worldVotes={worldVotes}
                setWorldVotes={setWorldVotes}
              />;
            })}
          </div>
        ) : (
          <div className={styles.sortDrop}>
            {sortDropdownPoliticians(t).map(({ id, full_title, field }) => {
              return <SortDropdownMobile
                key={id}
                text={full_title}
                field={field}
                world={world}
                setWorld={setWorld}
                update={update}
                setUpdate={setUpdate}
                worldVotes={worldVotes}
                setWorldVotes={setWorldVotes}
              />;
            })}
          </div>
        )}
        <div className={styles.sortRow}>
          {sortRatingPoliticians(t).map(({ id, full_title, short_title, field }) => {
            return <SortBadge key={id} text={full_title} field={field} setPage={setPage} />;
          })}
        </div>
        <WrapperAsyncRequest status={isMorePages ? APIStatus.Success : status}>
          {politicians && politicians?.length > 0 ? (
            <>
              <div className={styles.news}>
                {politicians?.map((item, index) => (
                  <PoliticiansCard key={item.id} {...item} />
              ))}
              </div>
              <WrapperAsyncRequest status={status} />
            </>
          ) : (
            <div className={styles.noNewsBlock}>
              <span>{t('tabs.warningMessagePoliticians')}</span>
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

export default React.memo(PoliticiansTab);
