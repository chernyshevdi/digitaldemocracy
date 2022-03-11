import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { WrapperAsyncRequest } from 'src/components/Loading/WrapperAsyncRequest';
// import { BackButton } from 'src/components/BackButton/BackButton';
import { useFetchProfileInfo } from './hooks/useFetchProfileInfo';
import styles from './ChangeProfilePage.module.scss';
import { ChangeBlock } from './blocks/ChangeBlock';

const ChangeProfilePage = () => {
  const { data } = useSelector((s: RootState) => s.profile);
  const {
    fetch,
    status,
    fetchCountryData,
    fetchEducationData,
    fetchGenderData,
    fetchPoliticalViewData,
    fetchReligionData,
    fetchRegionData,
    fetchCityData,
  } = useFetchProfileInfo();

  useEffect(() => {
    fetch();
    fetchCountryData();
    fetchEducationData();
    fetchGenderData();
    fetchPoliticalViewData();
    fetchReligionData();
  }, []);

  return (
    <div className={styles.container}>
      <WrapperAsyncRequest status={status}>
        <div className={styles.root}>
          <ChangeBlock />
        </div>
      </WrapperAsyncRequest>
    </div>
  );
};

export default ChangeProfilePage;
