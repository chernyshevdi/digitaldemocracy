import React, { useRef } from 'react';
import { Redirect, Route, Switch, useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { AuthorTabs as AuthorTabsData } from '../../../types/routing';
import styles from '../AuthorPage.module.scss';
import { useWindowSize } from '../../../hooks/useWindowSize';

const AuthorNavigation = () => {
  const { t } = useTranslation();
  const { link }: { link: string } = useParams();
  const {
    location: { pathname },
  } = useHistory();
  const { isMobile } = useWindowSize();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const listItemRef = useRef<HTMLAnchorElement>(null);
  const AuthorTabs = AuthorTabsData(t);

  const handlePrevClick = () => {
    scrollContainerRef.current.scrollLeft -= listItemRef.current.getBoundingClientRect().width + 10;
  };

  const handleNextClick = () => {
    if (scrollContainerRef) {
      scrollContainerRef.current.scrollLeft += listItemRef.current.getBoundingClientRect().width + 10;
    }
  };

  return (
    <div className={styles.navigation}>
      {!isMobile ? (
        <div className={styles.tabList}>
          {AuthorTabs.map(({ title, id }, index) => (
            <Link
              key={id}
              className={classNames(styles.link, {
                [styles.withOutBorder]: index === AuthorTabs.length - 1,
                [styles['-active']]: pathname.includes(id),
              })}
              to={(location: any) => ({ ...location, pathname: `/author/${link}/${id}` })}
            >
              {title}
            </Link>
          ))}
        </div>
      ) : (
        <div className={styles.tabListContainer}>
          <ArrowForwardIosIcon className={styles.prevArrow} onClick={handlePrevClick} />
          <div className={styles.tabList} ref={scrollContainerRef}>
            {AuthorTabs.map(({ title, id }, index) => (
              <Link
                ref={index === 0 ? listItemRef : undefined}
                key={id}
                className={classNames(styles.link, {
                  [styles['-active']]: pathname.includes(id),
                })}
                to={(location: any) => ({ ...location, pathname: `/author/${link}/${id}` })}
              >
                {title}
              </Link>
            ))}
          </div>
          <ArrowForwardIosIcon className={styles.nextArrow} onClick={handleNextClick} />
        </div>
      )}
      <div className={styles.tabContent}>
        <Switch>
          {AuthorTabs.map(({ id, component }) => (
            <Route key={id} path={`/author/:link/${id}`} component={component} />
          ))}
          <Redirect to={`/author/:link/${AuthorTabs[0].id}`} />
        </Switch>
      </div>
    </div>
  );
};

export default AuthorNavigation;
