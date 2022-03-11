import React from 'react';
import { Button, InputAdornment } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { APIStatus } from '../../../lib/axiosAPI';
import { Loading } from '../../Loading/Loading';

interface InputIconProps {
  disable?: boolean
  onClick?: () => void
  id?: string
  status?: APIStatus
}

export const ArrowInputIcon: React.FC<InputIconProps> = ({ disable, onClick, id, status }) => (
  <InputAdornment
    position="end"
  >
    <Button
      id={id}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 10,
      }}
      onClick={onClick}
      disabled={disable}
      type="submit"
    >
      {status === APIStatus.Loading ? <Loading /> : <ArrowForwardIcon />}
    </Button>
  </InputAdornment>
);
