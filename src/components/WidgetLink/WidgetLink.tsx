import type { FC } from 'react';
import React from 'react';
import { matchPath, useHistory } from 'react-router';
import { Box } from '@material-ui/core';
import styles from './WidgetLink.module.scss';

interface WidgetLinkPropsI {
  id?: number,
  title?: string
}

const WidgetLink: FC<WidgetLinkPropsI> = ({ id, title }) => {
  const history = useHistory();
  const handle = () => {
    const newPath = matchPath(`/widgetLink/${id}`, { path: '/widgetLink/:id' });
    history.push(newPath.url);
  };
  return (
    <Box
      className={styles.container}
      onClick={handle}
    >
      {title}
    </Box>
  );
};

export default WidgetLink;
