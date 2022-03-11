import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '@material-ui/core';
import classNames from 'classnames';
import styles from './NewsNav.module.scss';
import { TypeNavigationMenu } from '../../../pages/News';

interface PropsNewsTab{
  objForTab: {
    actual : boolean,
    subscriptions: boolean,
    country: any,
    region: any,
    city: any
  },
  handlerTab?: any,
  valTab?: string
}

const NewsTab: FC<PropsNewsTab> = ({ objForTab, handlerTab, valTab }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const navigation = [
    { title: t('news.tabTitleActual'), id: 0, type: TypeNavigationMenu.ACTUAL },
    { title: t('news.tabTitleSubscription'), id: 1, type: TypeNavigationMenu.SUBSCRIPTIONS },
    { title: t('news.tabTitleCountry'), id: 2, type: TypeNavigationMenu.COUNTRY },
    { title: t('news.tabTitleRegion'), id: 3, type: TypeNavigationMenu.REGION },
    { title: t('news.tabTitleCity'), id: 4, type: TypeNavigationMenu.CITY },
  ];

  return (
    <div className={styles.list}>
      {navigation.filter((el) => objForTab[el.type]).map((nav) => {
        const { title, type } = nav;
        let text = title;
        if (type !== TypeNavigationMenu.ACTUAL && type !== TypeNavigationMenu.SUBSCRIPTIONS) {
          text = objForTab[type]?.title[lang];
        }
        return (
          /* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
          <Tooltip title={text} key={nav.id}>
            <div
              onClick={() => handlerTab(nav.type)}
              className={classNames(styles.listItem, { [styles.selectedItem]: nav.type === valTab })}
            >
              {nav.title}
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
};

export default NewsTab;
