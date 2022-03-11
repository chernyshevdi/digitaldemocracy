import { useEffect, useState } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Divider, List, ListItem, ListItemText, makeStyles, Typography } from '@material-ui/core';
import { NewsTopicsI } from '../slices/homeSlice';
// import { useFetchHomePageData } from './home/hooks/useFetchHomePageData';
import './home/styles.scss';
import { useSearchParams } from '../hooks/useSearchParams';

const useStyles = makeStyles(() => ({
  listTitle: {
    fontSize: 40,
    fontWeight: 400,
  },
  lineStyle: {
    whiteSpace: 'nowrap',
  },
}));

interface SidebarPropsI {
  newsTopics?: NewsTopicsI[],
  fetch?: any
}

const ListSidebar: FC<SidebarPropsI> = ({ newsTopics, fetch }) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const [resultNewsTopics, setResultNewsTopics] = useState([]);
  const { news_topic_id: { value: topicId, setValue: setTopicId } } = useSearchParams('news_topic_id');

  const handleNewsTopics = (id) => {
    fetch(1, id, true);
    setTopicId(id);
  };

  useEffect(() => {
    if (newsTopics && newsTopics.length !== 0) {
      setResultNewsTopics([{ id: -1, title: t('news.mainTitleList') }, ...newsTopics]);
    }
  }, [newsTopics, i18n.language]);

  return (
    <Box sx={{ maxWidth: '270px' }}>
      <Typography className={classes.listTitle}>{t('news.titleList')}</Typography>
      <List
        className={classes.lineStyle}
        sx={{ maxWidth: '270px' }}
      >
        {resultNewsTopics?.map((item) => (
          <Box
            key={item.id}
            onClick={() => handleNewsTopics(item.id)}
          >
            <ListItem
              alignItems="flex-start"
              sx={{
                maxWidth: '270px',
                whiteSpace: 'pre-wrap',
                cursor: 'pointer',
                margin: 0,
                backgroundColor: Number(topicId) === item.id ? '#363557 !important' : 'transparent'
              }}
              className="list-item"
            >
              <ListItemText
                primary={item.title}
                sx={{
                  maxWidth: '250px',
                  fontSize: 14,
                  color: Number(topicId) === item.id ? 'white!important' : 'black'
                }}
              />
            </ListItem>
            <Divider component="li" />
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default ListSidebar;
