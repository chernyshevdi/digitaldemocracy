import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Redirect, Route, Switch, useHistory } from 'react-router';
import { ProfileTabs as ProfileTabsData } from '../../../types/routing';
import styles from '../ProfilePage.module.scss';
import { useWindowSize } from '../../../hooks/useWindowSize';

export const ProfilePageNavigation = () => {
  const { t } = useTranslation();
  const { location: { pathname } } = useHistory();
  const { isMobile } = useWindowSize();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const listItemRef = useRef<HTMLAnchorElement>(null);
  const ProfileTabs = ProfileTabsData(t);

  const handlePrevClick = () => {
    scrollContainerRef.current.scrollLeft -= (listItemRef.current.getBoundingClientRect().width + 10);
  };

  const handleNextClick = () => {
    if (scrollContainerRef) {
      scrollContainerRef.current.scrollLeft += listItemRef.current.getBoundingClientRect().width + 10;
    }
  };
  return (
    <div
      className={styles.navigation}
    >
      {!isMobile ? (
        <div className={styles.tabList}>
          {ProfileTabs.map(({ title, id }, index) => (
            <Link
              key={id}
              className={classNames(styles.link, { [styles.withOutBorder]: index === ProfileTabs.length - 1, [styles['-active']]: pathname.includes(id) })}
              to={(location: any) => ({ ...location, pathname: `/profile/${id}` })}
            >
              {title}
            </Link>
          ))}
        </div>
      ) : (
        <div className={styles.tabListContainer}>
          <ArrowForwardIosIcon
            className={styles.prevArrow}
            onClick={handlePrevClick}
          />
          <div
            className={styles.tabList}
            ref={scrollContainerRef}
          >
            {ProfileTabs.map(({ title, id }, index) => (
              <Link
                ref={index === 0 ? listItemRef : undefined}
                key={id}
                className={classNames(styles.link, { [styles.withOutBorder]: index === ProfileTabs.length - 1, [styles['-active']]: pathname.includes(id) })}
                to={(location: any) => ({ ...location, pathname: `/profile/${id}` })}
              >
                {title}
              </Link>
            ))}
          </div>
          <ArrowForwardIosIcon
            className={styles.nextArrow}
            onClick={handleNextClick}
          />
        </div>
      )}
      <div className={styles.tabContent}>
        <Switch>
          {ProfileTabs.map(({ id, component }) => (
            <Route
              key={id}
              path={`/profile/${id}`}
              component={component}
            />
          ))}
          <Redirect to={`/profile/${ProfileTabs[0].id}`} />
        </Switch>
      </div>
    </div>
  );
};
