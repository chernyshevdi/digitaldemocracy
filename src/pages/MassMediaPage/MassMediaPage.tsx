import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
// import { BackButton } from 'src/components/BackButton/BackButton';
import { getItem } from 'src/lib/localStorageManager';
import MassMediaInfoBlock from './blocks/MassMediaInfoBlock/MassMediaInfoBlock';
import MassMediaNavigation from './blocks/MassMediaNavigation';
import { WrapperAsyncRequest } from './blocks/Loading/WrapperAsyncRequest';
import { useFetchMassMedia } from './hooks/useFetchMassMedia';
import { massmediaActionCreators } from '../../slices/massMediaSlice';

import { RootState } from '../../store';

import styles from './MassMediaPage.module.scss';

const MassMediaPage = () => {
  const { status } = useSelector((s: RootState) => s.massmedia);
  const { fetchData } = useFetchMassMedia();
  const { resetData } = massmediaActionCreators();
  const token = getItem('token');
  useEffect(() => {
    resetData();
    fetchData();
  }, [token]);
  return (
    <Container maxWidth="lg" className={styles.container}>
      <div className={styles.container}>
        <WrapperAsyncRequest status={status}>
          <MassMediaInfoBlock />
          <MassMediaNavigation />
        </WrapperAsyncRequest>
      </div>
    </Container>
  );
};

export default MassMediaPage;
