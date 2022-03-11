import React, { FC } from 'react';
// import { BackButton } from 'src/components/BackButton/BackButton';
import { APIStatus } from '../../../../lib/axiosAPI';
import { Loading } from './Loading';
import { FailLoading } from './FailLoading';

import styles from './Loading.module.scss';

interface WrapperAsyncRequestProps {
  status: APIStatus;
  height?: number;
}

export const WrapperAsyncRequest: FC<WrapperAsyncRequestProps> = ({ children, status, height }) =>
  status === APIStatus.Success ? (
    <>{children}</>
  ) : status === APIStatus.Failure ? (
    <>
      {/* <BackButton /> */}
      <FailLoading />
    </>
  ) : (
    <div className={styles.loaderWrapper} style={{ height }}>
      <Loading size={40} />
    </div>
  );
