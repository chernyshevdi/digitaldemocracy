import React, { FC } from 'react';
import { APIStatus } from '../../lib/axiosAPI';
import { Loading } from './Loading';
import styles from './Loading.module.scss';

interface WrapperAsyncRequestProps {
  status: APIStatus
  height?: number
}

export const WrapperAsyncRequest: FC<WrapperAsyncRequestProps> = ({ children, status, height }) => (
  status === APIStatus.Loading
    ? (
      <div
        className={styles.loaderWrapper}
        style={{ height }}
      >
        <Loading size={40} />
      </div>
    )
    : <>{children}</>
);
