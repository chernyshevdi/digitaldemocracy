import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import PersonIcon from '@material-ui/icons/Person';
import { useHistory, matchPath } from 'react-router';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { Button, Tooltip } from '@material-ui/core';
import { avatarColorChanger } from 'src/utils/avatarColorChanger';
import { badgeColorChanger } from 'src/utils/badgeColorChanger';
import styles from './PoliticiansCard.module.scss';
import { useSearchParams } from '../../../hooks/useSearchParams';
import { ModalParams } from '../../../types/routing';
import { userSelectors } from '../../../slices/userSlice';
import { PoliticianInfoI, politicianSelectors } from '../../../slices/politicianSlice';
import { Loading } from '../../../components/Loading/Loading';
import { useChangeSubscribePolitician } from '../hooks/useChangeSubscribePolitician';
import { APIStatus } from '../../../lib/axiosAPI';

interface IProps extends PoliticianInfoI {}

const PoliticiansCard: FC<IProps> = ({
  photo,
  rating,
  name,
  is_subscribed,
  id,
  short_link,
  position,
  place,
  position_count,
  country,
  list_active_position,
}) => {
  const { t, i18n } = useTranslation();
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const historyPosition = useSelector(politicianSelectors.getPositionHistory());
  const { status, change } = useChangeSubscribePolitician(id);
  const { push } = useHistory();
  const {
    [ModalParams.Auth]: { setValue: setAuthValue },
  } = useSearchParams(ModalParams.Auth);

  const handleClick = () => {
    if (!isAuthenticated) {
      setAuthValue('/login');
    }
  };
  const sliceTxt = (txt) => {
    const countEnd = 75;
    const title = txt.slice(0, countEnd);
    return title + (txt.length >= countEnd ? '...' : '');
  };
  return (
    <div className={styles.root}>
      <Link
        to={`/politician/${short_link}`}
      >
        <div
          className={styles.avatarBlock}
          style={{ backgroundImage: `url(${avatarColorChanger(rating)})`, backgroundSize: 'cover' }}
        >
          <div className={styles.avatar}>
            {!photo ? <PersonIcon className={styles.noAvatarIcon} /> : <img src={photo} alt="" />}
          </div>
        </div>
      </Link>
      <div className={styles.second}>
        <div
          className={styles.badge}
          style={{
            backgroundColor: badgeColorChanger(rating),
          }}
        >
          <div className={styles.text}>{rating && place ? `${t('info.place')} ${place}` : t('info.withoutRating')}</div>
        </div>
        <div className={styles.percent}>{rating ? `${rating} %` : ''}</div>
      </div>
      <div className={styles.name}>{name}</div>
      <div className={styles.position}>
        <Tooltip title={position}>
          <div className={styles.position_text}>
            {position && sliceTxt(position)}
            {!!list_active_position.length && (
              <Link to={`/politician/${short_link}/position_history`} className={styles.position_textLink}>
                {position ? `${` ${t('info.more')} ${position_count}`}` : ''}
              </Link>
            )}
          </div>
        </Tooltip>
      </div>
      <Button
        variant="outlined"
        color={is_subscribed ? 'secondary' : 'primary'}
        onClick={isAuthenticated ? change : handleClick}
        disabled={status === APIStatus.Loading}
        className={classNames([
          'MuiButton-containedPrimary',
          styles.subscriberButton,
          { '-disabled': !isAuthenticated },
        ])}
      >
        <Tooltip title={isAuthenticated ? '' : t('errors.notAuth')}>
          <span>
            {/* eslint-disable-next-line no-nested-ternary */}
            {status === APIStatus.Loading ? (
              <Loading />
            ) : is_subscribed ? (
              t('buttons.unsubscribe')
            ) : (
              t('buttons.subscribe')
            )}
          </span>
        </Tooltip>
      </Button>
    </div>
  );
};

export default PoliticiansCard;
