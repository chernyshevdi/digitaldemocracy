import React from 'react';
import { FacebookButton } from 'react-social';

const FacebookShare = (props) => {
  const { url, children } = props;
  return (
    <FacebookButton
      url={url}
      appId="634901081285366"
      style={{
        padding: 0,
        border: 'none',
        outline: 'none',
        backgroundColor: 'transparent',
      }}
    >
      {children}
    </FacebookButton>
  );
};

export default FacebookShare;
