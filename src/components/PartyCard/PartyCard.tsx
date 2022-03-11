import React, { FC } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import { useHistory, matchPath } from 'react-router';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { Button, Tooltip } from '@material-ui/core';
import { badgeColorChanger } from 'src/utils/badgeColorChanger';
import { avatarColorChanger } from 'src/utils/avatarColorChanger';
import { useTranslation } from 'react-i18next';
import styles from './PartyCard.module.scss';
import { useSearchParams } from '../../hooks/useSearchParams';
import { ModalParams } from '../../types/routing';
import { userSelectors } from '../../slices/userSlice';
import { PoliticianInfoI } from '../../slices/politicianSlice';
import { Loading } from '../Loading/Loading';
import { useChangeSubscribe } from '../../pages/PartyPage/hooks/useChangeSubscribe';
import { APIStatus } from '../../lib/axiosAPI';

interface IProps extends PoliticianInfoI {}

const PartyCard: FC<IProps> = ({
  photo,
  rating,
  name,
  is_subscribed,
  id,
  short_link,
  position,
  place,
  position_count,
  list_active_position,
}) => {
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const { status, change } = useChangeSubscribe(id);
  const { t, i18n } = useTranslation();
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
        to={`/politician/${short_link}/politician_news/?photo=${
          photo || 'https://ipbmafia.ru/uploads/monthly_2018_07/895242-200.png.e10304d04e80f56d3ebaa863b4ccdd41.png'
        }&name=${name || 'name'}&position=${position || 'политик'}`}
      >
        <div
          className={
            rating && place ? styles.avatarBlock : classNames(styles.avatarBlock, styles.avatarBlock__nonRaiting)
          }
          style={
            rating && place ? { backgroundImage: `url(${avatarColorChanger(rating)})`, backgroundSize: 'cover' } : {}
          }
        >
          <div className={rating && place ? styles.avatar : classNames(styles.avatar, styles.avatar__nonRaiting)}>
            {!photo ? <PersonIcon className={styles.noAvatarIcon} /> : <img src={photo} alt="" />}
          </div>
        </div>
      </Link>
      <div className={styles.second}>
        <div
          className={styles.badge}
          style={{
            backgroundColor: rating && place ? badgeColorChanger(rating) : '#C4C4C4',
          }}
        >
          <div className={styles.text}>{rating && place ? `Место ${place}` : 'Без рейтинга'}</div>
        </div>
        {rating && place && <div className={styles.percent}>{rating} %</div>}
      </div>
      <hr />
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
        <Tooltip title={isAuthenticated ? '' : 'Вы не авторизованы'}>
          <span>
            {/* eslint-disable-next-line no-nested-ternary */}
            {status === APIStatus.Loading ? <Loading /> : is_subscribed ? 'Отписаться' : 'Следить'}
          </span>
        </Tooltip>
      </Button>
    </div>
  );
};

export default PartyCard;
