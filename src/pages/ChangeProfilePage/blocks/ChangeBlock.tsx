import React, { useLayoutEffect, useState } from 'react';
import { RootState } from 'src/store';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { userActionCreators } from 'src/slices/userSlice';
import { Loading } from 'src/components/Loading/Loading';
import { APIStatus } from 'src/lib/axiosAPI';
import { MainForm } from './forms/MainForm';
import { Accounts } from './Accounts';
import { PhoneForm } from './forms/PhoneForm';
import { EmailForm } from './forms/EmailForm';
import { PasswordForm } from './forms/PasswordForm';
import { useFetchAvatar } from '../hooks/useFetchAvatar';
import { useFetchProfileInfo } from '../hooks/useFetchProfileInfo';
import styles from '../ChangeProfilePage.module.scss';

export const ChangeBlock = () => {
  const { t } = useTranslation();
  const { fetchAvatar, statusAvatar } = useFetchAvatar();
  const { fetch, status } = useFetchProfileInfo();
  const [imageTest, setImageTest] = useState(false);
  const onChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type && !file.type.split('/').includes('image')) {
      setImageTest(true);
    } else if (file) {
      fetchAvatar(file);
    }
  };

  useLayoutEffect(() => {
    if (statusAvatar === APIStatus.Success) {
      fetch();
    }
  }, [statusAvatar]);

  const { logout } = userActionCreators();
  const data = useSelector((s: RootState) => s.profile.data);

  return (
    <div className={styles.tabContent}>
      <div className={styles.titleRow}>
        <div className={styles.title}>{t('profile.personInfo')}</div>
        <Button
          className={styles.logoutButton}
          sx={{
            p: 1,
            paddingRight: 2,
            paddingLeft: 2,
            borderRadius: 100,
            mr: 3,
            textDecoration: 'none',
          }}
          size="small"
          variant="outlined"
          onClick={logout}
        >
          {t('buttons.exit')}
        </Button>
      </div>
      <div className={styles.longVerticalBlock}>
        <div className={styles.helloMessage}>
          {t('profile.warningMessage')}
        </div>
        <div className={styles.avatarBlock}>
          <div className={styles.avatarContainer}>
            {statusAvatar === APIStatus.Loading || status === APIStatus.Loading ? (
              <Loading />
            ) : (
              <img src={data.userProfile?.avatar} alt="img" />
            )}
          </div>
          <form action="" method="POST" onSubmit={(e) => e.preventDefault()} encType="multipart/form-data">
            <input type="file" id="avatar" accept="image/*" hidden multiple onChange={onChange} />
            <label htmlFor="avatar" className={styles.uploadButton}>
              {t('buttons.loadPhoto')}
            </label>
          </form>
        </div>
        {imageTest ? (
          <div className={styles.message} style={{ marginTop: '40px', color: 'red' }}>
            {t('errors.formatFile')}
          </div>
        ) : null}
        <MainForm />
        <Accounts />
        <PhoneForm />
        <EmailForm />
        <PasswordForm />
      </div>
    </div>
  );
};

export default ChangeBlock;
