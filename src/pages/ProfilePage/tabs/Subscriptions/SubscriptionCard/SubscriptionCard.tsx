import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import PersonIcon from '@material-ui/icons/Person';
import { useHistory } from 'react-router';
import { Theme, withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Button, Tooltip } from '@material-ui/core';
import { badgeColorChanger } from 'src/utils/badgeColorChanger';
import { avatarColorChanger } from 'src/utils/avatarColorChanger';
import styles from './SubscriptionCard.module.scss';
import { useSearchParams } from '../../../../../hooks/useSearchParams';
import { ModalParams } from '../../../../../types/routing';
import { PartyI, PositionHistoryI } from '../../../../../slices/politicianSlice';
import { useUnsubscribe } from '../hooks/useUnsubscribe';
import { TypeSubscribe } from '../Subscriptions';

interface IProps {
  id?: number;
  name?: string;
  english_name?: string;
  photo?: string;
  is_subscribed?: boolean;
  percent?: string;
  number_of_subscribers?: number;
  party?: PartyI;
  party_logo?: string;
  position?: string | null;
  age?: number;
  city?: string;
  trust?: string;
  link?: string;
  rating?: string;
  short_link?: string;
  place?: number;
  type?: TypeSubscribe;
  position_count?: number | null;
  list_active_position?: Array<PositionHistoryI>;
}

const SubscriptionCard: FC<IProps> = ({
  photo,
  rating,
  name,
  is_subscribed,
  id,
  short_link,
  position,
  place,
  type,
  position_count,
  list_active_position,
}) => {
  const { t } = useTranslation();
  const { unsubscribe } = useUnsubscribe(type, id);
  const { push } = useHistory();
  const {
    [ModalParams.Auth]: { setValue: setAuthValue },
  } = useSearchParams(ModalParams.Auth);

  // const LightTooltip = withStyles((theme: Theme) => ({
  //   tooltip: {
  //     backgroundColor: '#363557',
  //     color: 'white',
  //     boxShadow: theme.shadows[1],
  //     fontSize: 11,
  //     display: 'flex',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     maxWidth: '270px',
  //   },
  // }))(Tooltip);

  const getLink = () => {
    switch (type) {
      case TypeSubscribe.POLITICIANS:
        return `/politician/${short_link}/politician_news/?photo=${
          photo || 'https://ipbmafia.ru/uploads/monthly_2018_07/895242-200.png.e10304d04e80f56d3ebaa863b4ccdd41.png'
        }&name=${name || 'name'}&position=${position || 'политик'}`;
      case TypeSubscribe.AUTHORS:
        return `/author/${short_link}/news`;
      case TypeSubscribe.MEDIAS:
        return `/mass-media/${short_link}/news`;
      default:
        return '#';
    }
  };

  const sliceTxt = (txt) => {
    const countEnd = 75;
    const title = txt.slice(0, countEnd);
    return title + (txt.length >= countEnd ? '...' : '');
  };

  return (
    <div className={styles.root}>
      <Link to={getLink()}>
        <div
          className={rating ? styles.avatarBlock : `${styles.avatarBlock} ${styles.avatarBlock__nonRaiting}`}
          style={rating ? { backgroundImage: `url(${avatarColorChanger(rating)})`, backgroundSize: 'cover' } : {}}
        >
          <div className={rating ? styles.avatar : `${styles.avatar} ${styles.avatar__nonRaiting}`}>
            {!photo ? (
              <PersonIcon className={styles.noAvatarIcon} />
            ) : (
              <img
                src={photo}
                alt=""
                style={type === TypeSubscribe.MEDIAS ? { objectFit: 'contain' } : { objectFit: 'cover' }}
              />
            )}
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
          <div className={styles.text}>{place ? `${t('info.place')} ${place}` : t('info.withoutRating')}</div>
        </div>
        {rating && <div className={styles.percent}>{rating} %</div>}
      </div>
      <div className={styles.name}>{name}</div>
      {position && (
        <Tooltip title={position}>
          <div className={styles.position}>
            <div className={styles.position_text}>
              {position && sliceTxt(position)}
              {!!list_active_position.length && (
                <Link to={`/politician/${short_link}/position_history`} className={styles.position_textLink}>
                  {position ? `${` ${t('info.more')} ${position_count}`}` : ''}
                </Link>
              )}
            </div>
          </div>
        </Tooltip>
      )}
      <Button
        variant="outlined"
        color={'secondary'}
        onClick={unsubscribe}
        // disabled={/* status === APIStatus.Loading */}
        className={classNames([
          'MuiButton-containedPrimary',
          styles.subscriberButton,
          // { '-disabled': !isAuthenticated },
        ])}
      >
        {t('buttons.unsubscribe')}
      </Button>
    </div>
  );
};

export default React.memo(SubscriptionCard);
