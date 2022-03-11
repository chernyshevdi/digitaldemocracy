import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { RatingTabs } from '../../types/routing';
import AuthorsTab from './tabs/AuthorsTab';
import MassMediaTab from './tabs/MassMediaTab';
import PartiesTab from './tabs/PartiesTab';
import PoliticiansTab from './tabs/PoliticiansTab';
// import { BackButton } from '../../components/BackButton/BackButton';

import styles from './RatingPage.module.scss';

const setTab = (location) => {
  switch (location) {
  case '/rating/politicians': {
    return <PoliticiansTab />;
  }
  case '/rating/massMedia': {
    return <MassMediaTab />;
  }
  case '/rating/authors': {
    return <AuthorsTab />;
  }
  case '/rating/parties': {
    return <PartiesTab />;
  }
  default: {
    return null;
  }
  }
};

const RatingPage = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const showTabs = ({ id, title, link }) => (
    <Link to={link} key={id} className={cn(pathname === link ? styles.selectedItem : styles.tabsItem)}>
      {/* <div className={cn(styles.tabsItem)}>{title}</div> */}
      <div className={styles.title}>{title}</div>
    </Link>
  );

  return (
    <Container maxWidth="lg" className={styles.container}>
      <div className={styles.container}>
        <div className={styles.tabs}>{RatingTabs(t).map(showTabs)}</div>
        {setTab(pathname)}
      </div>
    </Container>
  );
};

export default RatingPage;
