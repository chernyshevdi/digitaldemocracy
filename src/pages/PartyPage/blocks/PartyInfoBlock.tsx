import React from 'react';
import type { FC } from 'react';
import { useSelector } from 'react-redux';
import PersonIcon from '@material-ui/icons/Person';
import { Button, Tooltip, IconButton } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import CallMadeIcon from '@material-ui/icons/CallMade';
import FacebookIcon from '@material-ui/icons/Facebook';
import { useHistory, Link } from 'react-router-dom';
import { avatarColorChanger } from 'src/utils/avatarColorChanger';
import styles from '../PartyPage.module.scss';
import { partySelectors } from '../../../slices/partySlice';
import PartyCards from './PartyCards';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { APIStatus } from '../../../lib/axiosAPI';
import { Loading } from '../../../components/Loading/Loading';
import { userSelectors } from '../../../slices/userSlice';
import { endOfWords } from '../../../utils/endOfWords';
import { PercentsLinearGraphic } from './PercentsLinearGraphic';
import FacebookShare from '../../../components/FacebookShare/FacebookShare';
import { useSearchParams } from '../../../hooks/useSearchParams';
import { ModalParams } from '../../../types/routing';

const PartyInfoBlock: FC = () => {
  const { t, i18n } = useTranslation();
  const data = useSelector(partySelectors.getPartyInfo());
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const { isMobile } = useWindowSize();
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
  return (
    <div className={isMobile ? styles['profileInfoContainer-mobile'] : styles.profileInfoContainer}>
      {!isMobile ? (
        <div className={styles.topItems}>
          <div
            className={
              data?.rating && data?.place
                ? styles.avatarBlock
                : classNames(styles.avatarBlock, styles.avatarBlock__nonRaiting)
            }
            style={
              data?.rating && data?.place
                ? { backgroundImage: `url(${avatarColorChanger(data?.rating)})`, backgroundSize: 'cover' }
                : {}
            }
          >
            <div
              className={
                data?.rating && data?.place ? styles.avatar : classNames(styles.avatar, styles.avatar__nonRaiting)
              }
            >
              {!data?.logo ? <PersonIcon className={styles.noAvatarIcon} /> : <img src={data?.logo} alt="" />}
            </div>
          </div>
          <div className={styles.personBlock}>
            <div>
              <div className={styles.fioBlock}>
                <div className={styles.fio}>
                  <p>{data?.name}</p>
                </div>
              </div>
              <div className={styles.description}>
                {/* <p>{data?.description ?? 'Описание отсутствует'}</p> */}
                {data?.politicians_count !== 0 && (
                  <div className={styles.subscribersBadge}>
                    {`${data.politicians_count ?? 0} ${endOfWords(
                      data?.politicians_count,
                      { one: t('info.member'), many: t('info.members') },
                      i18n.language
                    )} ${t('elections.partyMembersDD')}`}
                  </div>
                )}
              </div>
            </div>
            <div className={styles.bottom}>
              <PartyCards data={data} />
              <div className={styles.bottomRight}>
                {data?.source_link && (
                  <a href={data?.source_link}>
                    <IconButton className={styles.arrowButton}>
                      <CallMadeIcon className={styles.arrowLink} />
                    </IconButton>
                  </a>
                )}
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
          {data?.politicians_count && (
            <div className={styles.mobSubscribers}>
              {`${data?.politicians_count} ${endOfWords(
                data?.politicians_count,
                { one: t('info.member'), many: t('info.members') },
                i18n.language
              )} ${t('elections.partyMembersDD')}`}
            </div>
          )}
          <div className={styles.mobInfoBlock}>
            <div
              className={
                data?.rating && data?.place
                  ? styles.mobAvatarBlock
                  : classNames(styles.mobAvatarBlock, styles.mobAvatarBlock__nonRaiting)
              }
              style={
                data?.rating && data?.place
                  ? { backgroundImage: `url(${avatarColorChanger(data?.rating)})`, backgroundSize: 'cover' }
                  : {}
              }
            >
              <div
                className={
                  data?.rating && data?.place
                    ? styles.mobAvatar
                    : classNames(styles.mobAvatar, styles.mobAvatar__nonRaiting)
                }
              >
                {!data?.logo ? <PersonIcon className={styles.mobNoAvatarIcon} /> : <img src={data?.logo} alt="" />}
              </div>
            </div>
            <div className={styles.mobRightBlock}>{/* <p>{data?.description ?? 'Описание отсутствует'}</p> */}</div>
          </div>
          <PartyCards data={data} />
          <div className={styles.MobBottom}>
            {data?.source_link && (
              <a href={data?.source_link}>
                <IconButton className={styles.arrowButton}>
                  <CallMadeIcon className={styles.arrowLink} />
                </IconButton>
              </a>
            )}
            <FacebookShare url={linkShareFacebook}>
              <FacebookIcon fontSize={isMobile ? 'small' : 'large'} className={styles.facebook} />
            </FacebookShare>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartyInfoBlock;
