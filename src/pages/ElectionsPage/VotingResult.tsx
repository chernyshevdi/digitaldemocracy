import { Button, Tooltip } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import badgeColorChanger from 'src/utils/badgeColorChanger';
import PersonIcon from '@material-ui/icons/Person';
import { APIStatus } from 'src/lib/axiosAPI';
import { ModalParams } from 'src/types/routing';
import { useSearchParams } from 'src/hooks/useSearchParams';
import { useSelector } from 'react-redux';
import { userSelectors } from 'src/slices/userSlice';
import { useChangeSubscribePolitician } from './hooks/useChangeSubscribePolitician';
import styles from './VotingResult.module.scss';

const VotingResult = ({ outsideWinners, value, updateData }) => {
  const [button, setButton] = useState(!outsideWinners.is_subscribed);
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const { status, change } = useChangeSubscribePolitician(outsideWinners.id, !button);
  const { t, i18n } = useTranslation();
  const {
    [ModalParams.Auth]: { setValue: setAuthValue },
  } = useSearchParams(ModalParams.Auth);

  const handleClick = () => {
    if (!isAuthenticated) {
      setAuthValue('/login');
    }
  };

  const subscribed = () => {
    if (isAuthenticated) {
      change();
    } else {
      handleClick();
    }
  };

  useEffect(() => {
    if (status === APIStatus.Success) {
      setButton(!button);
      updateData({ id: outsideWinners.id, button: !button });
    }
  }, [status]);
  useEffect(() => {
    if (value?.id === outsideWinners.id) {
      setButton(!button);
    }
  }, [value]);
  return (
    <div className={styles.root}>
      <div className={styles.avatarBlock}>
        <div className={styles.avatar}>
          {outsideWinners.photo || outsideWinners.logo ? (
            <img src={outsideWinners.photo || outsideWinners.logo} alt="" />
          ) : (
            <PersonIcon className={styles.noAvatarIcon} />
          )}
        </div>
      </div>
      <div className={styles.second}>
        <div
          className={styles.badge}
          style={{
            backgroundColor: '#248232',
          }}
        >
          <div className={styles.text}>
            {outsideWinners.place} {t('info.place')}
          </div>
        </div>
        <div className={styles.percent}>{outsideWinners.percent_rating_election}%</div>
      </div>

      <div className={styles.positionText}>
        <Link
          to={
            outsideWinners?.type === 'politician'
              ? `/politician/${outsideWinners?.short_link}/politician_news/?photo=${
                  outsideWinners?.photo ||
                  'https://ipbmafia.ru/uploads/monthly_2018_07/895242-200.png.e10304d04e80f56d3ebaa863b4ccdd41.png'
                }&name=${outsideWinners?.name || 'name'}&position=${outsideWinners?.position || 'политик'}`
              : `/party/${outsideWinners?.short_link}/`
          }
        >
          <p className={styles.positionText_text}>{outsideWinners.name}</p>
        </Link>
      </div>
      {outsideWinners.type === 'politician' && (
        <Button
          variant="outlined"
          disabled={status === APIStatus.Loading}
          onClick={() => subscribed()}
          style={{
            backgroundColor: button ? '#363557' : '#fff',
            borderColor: button ? '#363557' : '#BE3B21',
            color: button ? '#fff' : '#BE3B21',
            width: '100%',
          }}
        >
          {button ? t('buttons.subscribe') : t('buttons.unsubscribe')}
        </Button>
      )}
    </div>
  );
};

export default VotingResult;
