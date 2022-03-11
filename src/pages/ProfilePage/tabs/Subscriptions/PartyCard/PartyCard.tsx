import React, { FC } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import { useHistory, matchPath } from 'react-router';
import { useTranslation } from 'react-i18next';
import { withStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { Button, Tooltip } from '@material-ui/core';
import { badgeColorChanger } from 'src/utils/badgeColorChanger';
import { avatarColorChanger } from 'src/utils/avatarColorChanger';
import styles from './PartyCard.module.scss';
import { useSearchParams } from '../../../../../hooks/useSearchParams';
import { ModalParams } from '../../../../../types/routing';
import { userSelectors } from '../../../../../slices/userSlice';
import { PoliticianInfoI } from '../../../../../slices/politicianSlice';
import { Loading } from '../../../../../components/Loading/Loading';
import { useChangeSubscribe } from '../../../../PartyPage/hooks/useChangeSubscribe';
import { APIStatus } from '../../../../../lib/axiosAPI';

interface IProps extends PoliticianInfoI {}

const PartyCard: FC<IProps> = ({ photo, rating, name, is_subscribed, id, short_link, position, place }) => {
  const { t } = useTranslation();
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const { status, change } = useChangeSubscribe(id);
  const { push } = useHistory();
  const {
    [ModalParams.Auth]: { setValue: setAuthValue },
  } = useSearchParams(ModalParams.Auth);
  const handleClick = () => {
    if (!isAuthenticated) {
      setAuthValue('/login');
    }
  };

  const LightTooltip = withStyles((theme: Theme) => ({
    tooltip: {
      backgroundColor: '#363557',
      color: 'white',
      boxShadow: theme.shadows[1],
      fontSize: 11,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: '270px',
    },
  }))(Tooltip);

  return (
    <div className={styles.root}>
      <LightTooltip title={position ?? ''}>
        <Link
          to={`/politician/${short_link}/politician_news/?photo = ${
            photo || 'https://ipbmafia.ru/uploads/monthly_2018_07/895242-200.png.e10304d04e80f56d3ebaa863b4ccdd41.png'
          }&name=${name || 'name'}&position=${position || 'политик'}`}
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
      </LightTooltip>
      <div className={styles.second}>
        <div
          className={styles.badge}
          style={{
            backgroundColor: badgeColorChanger(rating),
          }}
        >
          <div className={styles.text}>{`${t('info.place')} ${place ?? '-'}`}</div>
        </div>
        <div className={styles.percent}>{rating ?? '-'} %</div>
      </div>
      <div className={styles.name}>{name}</div>
      <Button
        variant="outlined"
        color={'secondary'}
        onClick={isAuthenticated ? change : handleClick}
        disabled={status === APIStatus.Loading}
        className={classNames([
          'MuiButton-containedPrimary',
          styles.subscriberButton,
          { '-disabled': !isAuthenticated },
        ])}
      >
        {t('buttons.unsubscribe')}
      </Button>
    </div>
  );
};

export default PartyCard;
