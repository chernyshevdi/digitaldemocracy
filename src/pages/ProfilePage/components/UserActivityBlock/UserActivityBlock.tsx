import React from 'react';
import styles from '../../ProfilePage.module.scss';
import UserActivityLeftNavigation from './UserActivityLeftNavigation';

const UserActivityBlock = () => (
  <div className={styles.userActivityBlockContainer}>
    <div className={styles.hLine} />
    <div className={styles.userActivityBlock}>
      <UserActivityLeftNavigation />
    </div>
  </div>
);

export default UserActivityBlock;
