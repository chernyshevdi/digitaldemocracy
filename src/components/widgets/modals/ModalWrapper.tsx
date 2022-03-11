import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import { useWindowSize } from '../../../hooks/useWindowSize';

export const ModalWrapper: React.FC = ({ children }) => {
  const { isMobile } = useWindowSize();
  return (
    <Card sx={{
      maxWidth: 555,
      width: isMobile ? 'auto' : 555
    }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '70px',
          paddingBottom: '70px!important',
          paddingRight: '45px',
          paddingLeft: '45px'
        }}
      >
        {children}
      </CardContent>
    </Card>
  );
};
