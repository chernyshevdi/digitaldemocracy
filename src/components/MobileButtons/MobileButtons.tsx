import React from 'react';
import type { FC } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { useWindowSize } from 'src/hooks/useWindowSize';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { Button, Tooltip } from '@material-ui/core';
import classNames from 'classnames';
import { userActionCreators, userSelectors } from 'src/slices/userSlice';
import { RootState } from 'src/store';

import styles from './styles.module.scss';

interface IProps {
  handleClickOpen?: any;
}

export const MobileButtons: FC<IProps> = ({ handleClickOpen }) => {
  const { push } = useHistory() as any;
  const { deleteLastRout } = userActionCreators();
  const { data } = useSelector((s: RootState) => s?.user?.routes);
  const lastRout = data[data.length - 2]?.path || '/';
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const { isMobile } = useWindowSize();
  return (
    <div className={styles.mobileButtons}>
      <div className={styles.row}>
        <Button
          className={styles.backButton}
          onClick={() => {
            push(lastRout);
            deleteLastRout();
          }}
        >
          <div className={styles.icon}>←</div>
        </Button>
        {/* <Button
          className={classNames('MuiButton-containedPrimary', styles.changeButton, {
            '-disabled': !isAuthenticated,
          })}
          variant="outlined"
          color="primary"
          onClick={isAuthenticated ? handleClickOpen : null}
        >
          <Tooltip title={isAuthenticated ? '' : 'Вы не авторизованы'}>
            <span style={{ textDecoration: 'none' }}>Предложить изменения</span>
          </Tooltip>
        </Button> */}
      </div>
    </div>
  );
};

export default MobileButtons;
