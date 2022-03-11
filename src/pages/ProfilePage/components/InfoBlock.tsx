import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { userSelectors } from 'src/slices/userSlice';
import styles from '../ProfilePage.module.scss';

interface InfoBlockProps {
  fio?: string;
}

const InfoBlock: FC<InfoBlockProps> = ({ fio }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const data = useSelector(userSelectors.getUser());
  const county = data?.country_id?.title?.[currentLang] ? `${data?.country_id?.title?.[currentLang]}, ` : '';
  const region = data?.region_id?.title?.[currentLang] ? `${data?.region_id?.title?.[currentLang]}, ` : '';
  const city = data?.city_id?.title?.[currentLang] ? `${data?.city_id?.title?.[currentLang]}` : '';
  const gender = data?.gender_id?.title?.[currentLang] ? `${data?.gender_id?.title?.[currentLang]}` : '';
  return (
    <div className={styles.personBlock}>
      <div className={styles.fio}>
        <p>{fio}</p>
      </div>
      <div className={styles.hLine} />
      <p>
        {county}
        {region}
        {city}
      </p>
      <p>{data?.age ? `${data.age} ${t('info.age')}` : null}</p>
      <p>{gender}</p>
    </div>
  );
};

export default InfoBlock;
