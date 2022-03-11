import { CircularProgress } from '@material-ui/core';
import React, { FC } from 'react';

interface LoadingProps {
  size?: number;
  color?: string;
}

export const Loading: FC<LoadingProps> = ({ size, color }) => (
  <CircularProgress style={color === 'white' ? { color: 'white' } : { color: '#363557' }} size={size || 20} />
);
