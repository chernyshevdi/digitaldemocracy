import { CircularProgress } from '@material-ui/core';
import React, { FC } from 'react';

interface LoadingProps {
  size?: number
}

export const Loading:FC<LoadingProps> = ({ size }) => (
  <CircularProgress
    style={{ color: '#363557' }}
    size={size || 20}
  />
);
