import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@material-ui/core';
import classNames from 'classnames';
import PersonIcon from '@material-ui/icons/Person';
import styles from '../ProfilePage.module.scss';
import { userActionCreators } from '../../../slices/userSlice';

interface PersonBlockProps {
  avatar?: string;
}

const PersonBlock: FC<PersonBlockProps> = ({ avatar }) => {
  const { t } = useTranslation();
  const { logout } = userActionCreators();
  return (
    <div className={styles.avatarBlock}>
      <div className={classNames(styles.avatar, { [styles.noAvatar]: !avatar })}>
        {!avatar ? <PersonIcon className={styles.noAvatarIcon} /> : <img src={avatar} alt="" />}
      </div>
      <Link to="/changeProfile" className={styles.changeProfileButton}>
        {t('buttons.changeProfile')}
      </Link>
      {/* <Button onClick={logout} className={styles.changeProfileButton}>
        Выйти из профиля
      </Button> */}
    </div>
  );
};

export default PersonBlock;
