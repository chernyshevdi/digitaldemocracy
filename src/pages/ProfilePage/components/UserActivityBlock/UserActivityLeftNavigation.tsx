import React from 'react';
import styles from '../../ProfilePage.module.scss';
import { userActivityLeftNavigationItems } from '../types';

const UserActivityLeftNavigation = () => (
  <div className={styles.leftList}>
    {userActivityLeftNavigationItems.map(({ title, id }, index) => (
      <div
        key={id}
        className={styles.item}
      >
        <p>{title}</p>
        {index !== userActivityLeftNavigationItems.length - 1 && <div className={styles.hLineLite} />}
      </div>
    ))}
  </div>
);

export default UserActivityLeftNavigation;
