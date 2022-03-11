import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@material-ui/core';
import classNames from 'classnames';
import styles from './SuggestionNav.module.scss';

interface IProps {
  setSuggest: any;
  setError: any;
  setIsRequiredInfo: any;
  setIsRequiredNews: any;
}

export const SuggestionNav: FC<IProps> = ({ setSuggest, setError, setIsRequiredInfo, setIsRequiredNews }) => {
  const { t } = useTranslation();
  const navigation = [
    { title: t('footer.menu.addPolitician') || 'Добавить политика', id: 0, key: 'POLITICIAN' },
    { title: t('footer.menu.addNews') || 'Добавить Новость', id: 1, key: 'NEWS' },
  ];
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Box className={styles.nav}>
      <div className={styles.list}>
        {navigation.map((item) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <div
            onClick={() => {
              setSelectedTab(item.id);
              setSuggest(item.key);
              setError(false);
              setIsRequiredInfo(false);
              setIsRequiredNews(false);
            }}
            className={classNames(styles.listItem, { [styles.selectedItem]: item.id === selectedTab })}
            key={item.id}
          >
            {item.title}
          </div>
        ))}
      </div>
    </Box>
  );
};

export default SuggestionNav;
