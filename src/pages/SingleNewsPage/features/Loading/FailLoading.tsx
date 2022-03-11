import React, { FC } from 'react';
import Alert from '@material-ui/lab/Alert';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import styles from './Loading.module.scss';

export const FailLoading = () => {
  const { goBack, length, push } = useHistory() as any;
  return (
    <Alert variant="outlined" severity="warning">
      К сожалению, нам не удалось найти страницу новости по Вашему запросу. Нажмите кнопку &apos;Назад&lsquo; для перехода на
      прошлую страницу.
    </Alert>
  );
};
