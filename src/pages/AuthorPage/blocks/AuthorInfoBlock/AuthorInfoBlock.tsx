import React from 'react';
import type { FC } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PersonIcon from '@material-ui/icons/Person';
import { Button, Tooltip } from '@material-ui/core';
import classNames from 'classnames';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import FacebookIcon from '@material-ui/icons/Facebook';
import { useHistory } from 'react-router-dom';
import { RootState } from 'src/store';
import { avatarColorChanger } from 'src/utils/avatarColorChanger';

import styles from '../../AuthorPage.module.scss';
import { authorSelectors } from '../../../../slices/authorSlice';
import AuthorCards from './AuthorCards';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import { useChangeSubscribe } from '../../hooks/useChangeSubscribe';
import { APIStatus } from '../../../../lib/axiosAPI';
import { Loading } from '../../../../components/Loading/Loading';
import { userSelectors } from '../../../../slices/userSlice';
import { endOfWords } from '../../../../utils/endOfWords';
import { PercentsLinearGraphic } from './PercentsLinearGraphic';
import FacebookShare from '../../../../components/FacebookShare/FacebookShare';
import { useSearchParams } from '../../../../hooks/useSearchParams';
import { ModalParams } from '../../../../types/routing';

const AuthorInfoBlock: FC = () => {
  const { t, i18n } = useTranslation();
  const data = useSelector(authorSelectors.getAuthorInfo());
  const { subscribeStatus } = useSelector((s: RootState) => s.author);
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const { isMobile } = useWindowSize();
  const { setAuthorSubscribe } = useChangeSubscribe();
  const { goBack, length, push } = useHistory() as any;
  const linkShareFacebook = process.env.REACT_APP_HOST + window.location.pathname;
  const {
    [ModalParams.Auth]: { setValue: setAuthValue },
  } = useSearchParams(ModalParams.Auth);
  const handleClick = () => {
    if (!isAuthenticated) {
      setAuthValue('/login');
    }
  };
  const trust = data?.rating
    ? parseInt(data?.rating, 10) > 50
      ? t('info.highTrust')
      : t('info.lowTrust')
    : t('info.withoutRating');
  const badgeBackground = trust === t('info.highTrust') ? 'green' : trust === t('info.lowTrust') ? 'red' : null;
  const badgeColor = trust === t('info.highTrust') ? '#fff' : '#222';
  return (
    <div className={isMobile ? styles['profileInfoContainer-mobile'] : styles.profileInfoContainer}>
      {!isMobile ? (
        <div className={styles.topItems}>
          <div
            className={data?.rating ? styles.avatarBlock : classNames(styles.avatarBlock, styles.avatarBlock__nonRaiting)}
            style={data?.rating ? { backgroundImage: `url(${avatarColorChanger(data?.rating)})`, backgroundSize: 'cover' } : {}}
          >
            <div className={data?.rating ? styles.avatar : classNames(styles.avatar, styles.avatar__nonRaiting)}>
              {!data?.photo ? <PersonIcon className={styles.noAvatarIcon} /> : <img src={data?.photo} alt="" />}
            </div>
          </div>
          <div className={styles.personBlock}>
            <div>
              <div className={styles.fioBlock}>
                <div className={styles.fio}>
                  <p>{data?.name}</p>
                  <Button
                    variant="outlined"
                    color={data?.is_subscribed ? 'secondary' : 'primary'}
                    onClick={isAuthenticated ? setAuthorSubscribe : handleClick}
                    disabled={subscribeStatus === APIStatus.Loading}
                    className={classNames([
                      'MuiButton-containedPrimary',
                      styles.subscriberButton,
                      { '-disabled': !isAuthenticated },
                    ])}
                  >
                    <Tooltip title={isAuthenticated ? '' : t('errors.notAuth')}>
                      <span>
                        {subscribeStatus === APIStatus.Loading ? (
                          <Loading />
                        ) : data?.is_subscribed ? (
                          t('buttons.unsubscribe')
                        ) : (
                          t('buttons.subscribe')
                        )}
                      </span>
                    </Tooltip>
                  </Button>
                </div>
              </div>
              <div className={styles.description}>
                <p>{data?.description ?? t('info.descriptionMissing')}</p>
                {data?.number_of_subscribers && (
                  <div className={styles.subscribersBadge}>
                    {`${data?.number_of_subscribers} ${endOfWords(data?.number_of_subscribers, { one: t('info.subscriber'), many: t('info.subscribers') }, i18n.language)}`}
                  </div>
                )}
              </div>
            </div>
            <div className={styles.bottom}>
              <AuthorCards data={data} />
              <div className={styles.bottomRight}>
                <FacebookShare url={linkShareFacebook}>
                  <FacebookIcon fontSize={isMobile ? 'small' : 'large'} className={styles.facebook} />
                </FacebookShare>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.mobileRoot}>
          <p>{data?.name}</p>
          {data?.number_of_subscribers && (
            <div className={styles.mobSubscribers}>
              {`${data?.number_of_subscribers} ${endOfWords(data?.number_of_subscribers, { one: t('info.subscriber'), many: t('info.subscribers') }, i18n.language)}`}
            </div>
          )}
          <div className={styles.mobInfoBlock}>
            <div
              className={data?.rating ? styles.mobAvatarBlock : classNames(styles.mobAvatarBlock, styles.mobAvatarBlock__nonRaiting)}
              style={data?.rating ? { backgroundImage: `url(${avatarColorChanger(data?.rating)})`, backgroundSize: 'cover' } : {}}
            >
              <div className={data?.rating ? styles.mobAvatar : classNames(styles.mobAvatar, styles.mobAvatar__nonRaiting)}>
                {!data?.photo ? <PersonIcon className={styles.mobNoAvatarIcon} /> : <img src={data?.photo} alt="" />}
              </div>
            </div>
            <div className={styles.mobRightBlock}>
              <p>{data?.description ?? t('info.descriptionMissing')}</p>
            </div>
          </div>
          <AuthorCards data={data} />
          <Button
            variant="outlined"
            color={data?.is_subscribed ? 'secondary' : 'primary'}
            onClick={isAuthenticated ? setAuthorSubscribe : handleClick}
            disabled={subscribeStatus === APIStatus.Loading}
            className={classNames([
              'MuiButton-containedPrimary',
              styles.mobSubscriberButton,
              { '-disabled': !isAuthenticated },
            ])}
          >
            <Tooltip title={isAuthenticated ? '' : t('errors.notAuth')}>
              <span>
                {subscribeStatus === APIStatus.Loading ? <Loading /> : data?.is_subscribed ? t('buttons.unsubscribe') : t('buttons.subscribe')}
              </span>
            </Tooltip>
          </Button>
          <div className={styles.MobBottom}>
            <FacebookShare url={linkShareFacebook}>
              <FacebookIcon fontSize={isMobile ? 'small' : 'large'} className={styles.facebook} />
            </FacebookShare>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorInfoBlock;
