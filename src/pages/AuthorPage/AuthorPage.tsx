import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import { getItem } from 'src/lib/localStorageManager';
import styles from './AuthorPage.module.scss';

import AuthorInfoBlock from './blocks/AuthorInfoBlock/AuthorInfoBlock';
import AuthorNavigation from './blocks/AuthorNavigation';
import { WrapperAsyncRequest } from './blocks/Loading/WrapperAsyncRequest';
import { useFetchAuthor } from './hooks/useFetchAuthor';
import { authorActionCreators } from '../../slices/authorSlice';

import { RootState } from '../../store';

const AuthorPage = () => {
  const { status } = useSelector((s: RootState) => s.author);
  const { fetchData } = useFetchAuthor();
  const { resetData } = authorActionCreators();
  const token = getItem('token');
  useEffect((): any => {
    fetchData();
    return () => resetData();
  }, [token]);
  return (
    <Container maxWidth="lg" className={styles.container}>
      <div className={styles.container}>
        <WrapperAsyncRequest status={status}>
          <AuthorInfoBlock />
          <AuthorNavigation />
        </WrapperAsyncRequest>
      </div>
    </Container>
  );
};

export default AuthorPage;
