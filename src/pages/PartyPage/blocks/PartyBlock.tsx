import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PartyCard from '../../../components/PartyCard/PartyCard';
import styles from '../PartyPage.module.scss';
import { partySelectors } from '../../../slices/partySlice';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { useFetchPartyPoliticians } from '../hooks/useFetchPoliticians';
import { RootState } from '../../../store';
import { SortBadge } from './SortBadge';
import { sortParty } from '../../../static/static';
import { WrapperAsyncRequest } from '../../../components/Loading/WrapperAsyncRequest';
import { userSelectors } from '../../../slices/userSlice';
import { APIStatus } from '../../../lib/axiosAPI';

const PartyBlock = () => {
  const { t } = useTranslation();
  const { isMobile } = useWindowSize();
  const data = useSelector(partySelectors.getPartyPoliticians());
  const partyInfo = useSelector(partySelectors.getPartyInfo());
  const { fetch, status } = useFetchPartyPoliticians();
  const sortDirection = useSelector((s: RootState) => s.party.sort_direction);
  const sortField = useSelector((s: RootState) => s.party.sort_field);
  const [page, setPage] = useState(1);
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());

  useEffect(() => {
    fetch(partyInfo.id, page);
  }, [sortDirection, sortField, page, isAuthenticated]);

  const handleMorePages = () => {
    setPage(page + 1);
  };

  return (
    <div className={styles.newsContainer}>
      <div className={styles.sortRow}>
        {sortParty(t).map(({ id, full_title, short_title, field }) => {
          return <SortBadge key={id} text={!isMobile ? full_title : short_title} field={field} />;
        })}
      </div>
      <WrapperAsyncRequest status={data?.isMorePages ? APIStatus.Success : status}>
        {data?.politicians && data?.politicians.length > 0 ? (
          <div className={styles.news}>
            {data?.politicians?.map((item, index) => (
              <PartyCard key={item.id} {...item} />
            ))}
          </div>
        ) : (
          <div className={styles.noNewsBlock}>
            <span>{t('tabs.warningMessagePoliticians')}</span>
          </div>
        )}
        <div>
          <WrapperAsyncRequest status={data?.isMorePages ? status : APIStatus.Success}>
            <div />
          </WrapperAsyncRequest>
        </div>
      </WrapperAsyncRequest>
      {data?.isMorePages && status !== APIStatus.Loading && (
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
  );
};

export default PartyBlock;
