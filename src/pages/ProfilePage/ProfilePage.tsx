import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Container } from '@material-ui/core';
import { useFetchUserData } from './hooks/useFetchUserData';
import { userActionCreators, userSelectors } from '../../slices/userSlice';
import styles from './ProfilePage.module.scss';
import PersonBlock from './components/PersonBlock';
import InfoBlock from './components/InfoBlock';
import { WrapperAsyncRequest } from '../../components/Loading/WrapperAsyncRequest';
import { ProfilePageNavigation } from './components/ProfilePageNavigation';
// import { BackButton } from '../../components/BackButton/BackButton';

const ProfilePage = () => {
  const { t } = useTranslation();
  const { status, fetch } = useFetchUserData();
  const data = useSelector(userSelectors.getUser());
  const { resetStatus } = userActionCreators();

  useEffect(() => {
    fetch();
    return () => {
      resetStatus();
    };
  }, []);

  return (
    <Container maxWidth="lg">
      <div className={styles.container}>
        <WrapperAsyncRequest status={status}>
          {/* <BackButton /> */}
          <div className={styles.personContainer}>
            <PersonBlock avatar={data.avatar} />
            <InfoBlock
              fio={
                data?.first_name && data?.last_name
                  ? `${data?.first_name} ${data?.last_name}`
                  : data?.first_name || t('profile.userName')
              }
            />
          </div>
          <ProfilePageNavigation />
        </WrapperAsyncRequest>
      </div>
    </Container>
  );
};

export default ProfilePage;
