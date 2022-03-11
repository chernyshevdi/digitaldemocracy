import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@material-ui/core';
import CallMadeIcon from '@material-ui/icons/CallMade';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import styles from './PositionDescription.module.scss';
import { politicianSelectors } from '../../../../slices/politicianSlice';
import { useFetchPositionDescription } from './hooks/useFetchPositionDescription';
import { WrapperAsyncRequest } from '../../../../components/Loading/WrapperAsyncRequest';

export default function Description() {
  const { t } = useTranslation();
  const { status, fetch } = useFetchPositionDescription();
  const data = useSelector(politicianSelectors.getPositionsDescription());
  useEffect(() => {
    fetch();
  }, [data?.[0]?.id]);

  return (
    <WrapperAsyncRequest status={status}>
      {data?.length ? (
        <div className={styles.root}>
          <h4>{data[0].position}</h4>
          <p>{data[0].description}</p>
          {data[0].link !== null ? (
            <div className={styles.link}>
              <p>{t('info.linkOnSource')}:</p>
              <IconButton className={styles.arrowButton} onClick={() => window.open(data[0].link)}>
                <CallMadeIcon className={styles.arrowLink} />
              </IconButton>
            </div>
          ) : null}
        </div>
      ) : (
        <div className={styles.empty}>
          <h3>{t('info.noData')}</h3>
        </div>
      )}
    </WrapperAsyncRequest>
  );
}

export const PositionDescription = () => <Description />;
