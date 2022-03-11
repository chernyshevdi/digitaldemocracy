import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import { useSelector } from 'react-redux';
import { userSelectors } from 'src/slices/userSlice';
import { ModalParams } from 'src/types/routing';
import { useSearchParams } from 'src/hooks/useSearchParams';
import { APIStatus } from 'src/lib/axiosAPI';
import { useChangeSubscribePolitician } from './hooks/useChangeSubscribePolitician';
import styles from './VotingResult.module.scss';

const VotingResultDD = ({ winners, updateData, value }) => {
  const [button, setButton] = useState(!winners.is_subscribed);
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const { status, change } = useChangeSubscribePolitician(winners.id, !button);
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
      updateData({ id: winners.id, button: !button });
    }
  }, [status]);
  useEffect(() => {
    if (value?.id === winners.id) {
      setButton(!button);
    }
  }, [value]);
  return (
    <div className={styles.root}>
      <div className={styles.avatarBlock}>
        <div className={styles.avatar}>
          {winners.photo || winners.logo ? (
            <img src={winners.photo || winners.logo} alt="" />
          ) : (
            <PersonIcon className={styles.noAvatarIcon} />
          )}
        </div>
      </div>
      <Link
        to={
          winners?.type === 'politician'
            ? `/politician/${winners?.short_link}/politician_news/?photo = ${
                winners?.photo ||
                'https://ipbmafia.ru/uploads/monthly_2018_07/895242-200.png.e10304d04e80f56d3ebaa863b4ccdd41.png'
              }&name=${winners?.name || 'name'}&position=${winners?.position || 'политик'}`
            : `/party/${winners?.short_link}/`
        }
      >
        <p className={styles.name}>{winners.name}</p>
      </Link>
      <div className={styles.second}>
        <div
          className={styles.badge}
          style={{
            backgroundColor: '#248232',
          }}
        >
          <div className={styles.text}>
            {winners.place} {t('info.place')}
          </div>
        </div>
        <div className={styles.percent}>{winners.election_vote_statistics.percent_rating_election}%</div>
      </div>
      <div className={styles.position}>
        <div className={styles.position_text}>
          {t('elections.voted')}: {winners.election_vote_statistics.count_voted_users_on_election} {t('info.people')}
        </div>
      </div>
      {winners.type === 'politician' && (
        <div className={styles.button}>
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
        </div>
      )}
    </div>
  );
};

export default VotingResultDD;
