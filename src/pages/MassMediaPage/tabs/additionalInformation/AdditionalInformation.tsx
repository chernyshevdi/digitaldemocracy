/* eslint-disable import/no-cycle */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import CallMadeIcon from '@material-ui/icons/CallMade';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFetchAdditionalInformation } from './hooks/useFetchAdditionalInformation';
import { WrapperAsyncRequest } from '../../../../components/Loading/WrapperAsyncRequest';
import { massmediaSelectors } from '../../../../slices/massMediaSlice';
import styles from './styles.module.scss';

export const AdditionalInformationMassMedia = () => {
  const { t } = useTranslation();
  const { fetch, status } = useFetchAdditionalInformation();
  const data = useSelector(massmediaSelectors.getAdditionalInformation());

  useEffect(() => {
    fetch();
  }, [data?.[0]?.id]);

  return (
    <div className={styles.container}>
      <WrapperAsyncRequest status={status}>
        {data?.length > 0 ? (
          data?.map((item) => {
            return (
              <div key={item.id} className={styles.informationBlock}>
                <div className={styles.link}>
                  <p>{t('info.linkOnSource')}:</p>
                  <a href={item.link} className={styles.linkContent}>
                    {item.title}
                  </a>
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.empty}>
            <h3>{t('info.noData')}</h3>
          </div>
        )}
      </WrapperAsyncRequest>
    </div>
  );
};
