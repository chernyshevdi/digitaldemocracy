import React from 'react';
// import type { FC } from 'react';
// import { useHistory } from 'react-router';
// import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import { useWindowSize } from 'src/hooks/useWindowSize';
// import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { Button, Tooltip } from '@material-ui/core';
import classNames from 'classnames';
// import { userSelectors } from 'src/slices/userSlice';
// import { RootState } from 'src/store';

import styles from './styles.module.scss';

// interface IProps {
//   handleClickOpen?: any;
// }

// export const SuggestButton: FC<IProps> = () => {
//   const { t } = useTranslation();
//   const { pathname } = useLocation();
//   const { push } = useHistory() as any;
//   const { deleteLastRout } = userActionCreators();
//   const { data } = useSelector((s: RootState) => s?.user?.routes);
//   const lastRout = data[data.length - 2]?.path || '/';
//   const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
//   const { isMobile } = useWindowSize();
//   return (
//     <div className={styles.mobileButtons}>
//       <div className={styles.row}>
//         <Button
//           className={styles.backButton}
//           onClick={() => {
//             push(lastRout);
//             deleteLastRout();
//           }}
//         >
//           <div className={styles.icon}>←</div>
//         </Button>
//         <Link to="/suggestion" className={styles.link}>
//           <Button
//             className={classNames('MuiButton-containedPrimary', styles.changeButton, {
//               '-disabled': !isAuthenticated,
//             })}
//             variant="outlined"
//             color="primary"
//           >
//             <Tooltip title={isAuthenticated ? '' : t('errors.notAuth')}>
//               <span>{t('buttons.suggestion')}</span>
//             </Tooltip>
//           </Button>
//         </Link>
//       </div>
//     </div>
//   );
// };

export const SuggestButton = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.mobileButtons}>
      <div className={styles.row}>
        <Link to="/suggestion" className={styles.link}>
          <Button
            className={classNames('MuiButton-containedPrimary', styles.changeButton)}
            variant="outlined"
            color="primary"
          >
            <span>{t('buttons.suggestion')}</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};
