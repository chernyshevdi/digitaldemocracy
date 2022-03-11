import React, { useState } from 'react';
import type { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import PersonIcon from '@material-ui/icons/Person';
import { Button, Tooltip, Dialog, IconButton, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import classNames from 'classnames';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import FacebookIcon from '@material-ui/icons/Facebook';
import { avatarColorChanger } from 'src/utils/avatarColorChanger';
import { LineChartVoters } from './LineChartVoters';

import InputTextField from '../../../../components/widgets/inputs/InputTextField';
import styles from '../../PoliticianPage.module.scss';
import { politicianSelectors } from '../../../../slices/politicianSlice';
import PoliticianCards from './PoliticianCards';
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

interface IProps {
  handleClickOpen?: any;
}

const PoliticianInfoBlock: FC<IProps> = ({ handleClickOpen }) => {
  const { t, i18n } = useTranslation();
  const data = useSelector(politicianSelectors.getPoliticianInfo());
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const { isMobile } = useWindowSize();
  const { status, change } = useChangeSubscribe();
  const linkShareFacebook = process.env.REACT_APP_HOST + window.location.pathname;

  const { push } = useHistory();
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
        <>
          <div className={styles.topItems}>
            <div
              className={
                data?.rating ? styles.avatarBlock : classNames(styles.avatarBlock, styles.avatarBlock__nonRaiting)
              }
              style={
                data?.rating
                  ? { backgroundImage: `url(${avatarColorChanger(data?.rating)})`, backgroundSize: 'cover' }
                  : {}
              }
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
                          {status === APIStatus.Loading ? (
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
                  {/* <p>{data?.description ?? 'Описание отсутствует'}</p> */}
                  {data?.english_name && <div className={styles.englishName}>{data?.english_name}</div>}
                  {data?.number_of_subscribers && (
                    <div
                      className={styles.subscribersBadge}
                      style={data?.english_name ? { textAlign: 'end' } : { textAlign: 'start' }}
                    >
                      {`${data?.number_of_subscribers} ${endOfWords(
                        data?.number_of_subscribers,
                        { one: t('info.subscriber'), many: t('info.subscribers') },
                        i18n.language
                      )}`}
                    </div>
                  )}
                </div>
                {data?.position && (
                  <div className={styles.politicPosition}>
                    {data?.position}
                    {data?.list_active_position.length ? (
                      <Link to={'position_history'}>{` ${t('info.more')} ${data.position_count}` || ''}</Link>
                    ) : (
                      ''
                    )}
                  </div>
                )}
                {(data?.age || data?.city) && (
                  <>
                    <div className={styles.age}>{data?.age ? `${data?.age} ${t('info.age')}` : ''}</div>
                    <div className={styles.age}>{data?.city ? `${data?.city}` : ''}</div>
                  </>
                )}
                <div
                  onClick={() => push(`/party/${data?.party?.short_link}`)}
                  aria-hidden="true"
                  className={styles.title}
                >
                  {data?.party?.name}
                </div>
              </div>
              <div className={styles.aboutRatings}>
                <div className={styles.bottom}>
                  <PoliticianCards />

                  <div className={styles.bottomRight}>
                    <Button
                      className={classNames('comeIn', styles.changeButton, {
                        '-disabled': !isAuthenticated,
                      })}
                      variant="outlined"
                      color="primary"
                      onClick={isAuthenticated ? handleClickOpen : handleClick}
                    >
                      <Tooltip title={isAuthenticated ? '' : t('errors.notAuth')}>
                        <span>{t('info.suggestionChange')}</span>
                      </Tooltip>
                    </Button>

                    <FacebookShare url={linkShareFacebook}>
                      <FacebookIcon fontSize={isMobile ? 'small' : 'large'} className={styles.facebook} />
                    </FacebookShare>
                  </div>
                </div>
                <LineChartVoters />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.mobileRoot}>
          <p>{data?.name}</p>
          {data?.number_of_subscribers && (
            <div className={styles.mobSubscribers}>
              {`${data?.number_of_subscribers} ${endOfWords(
                data?.number_of_subscribers,
                { one: t('info.subscriber'), many: t('info.subscribers') },
                i18n.language
              )}`}
            </div>
          )}
          {/* {data?.position && <div className={styles.age}>{data?.position}</div>} */}
          <div className={styles.mobInfoBlock}>
            <div
              className={
                data?.rating
                  ? styles.mobAvatarBlock
                  : classNames(styles.mobAvatarBlock, styles.mobAvatarBlock__nonRaiting)
              }
              style={
                data?.rating
                  ? { backgroundImage: `url(${avatarColorChanger(data?.rating)})`, backgroundSize: 'cover' }
                  : {}
              }
            >
              <div
                className={data?.rating ? styles.mobAvatar : classNames(styles.mobAvatar, styles.mobAvatar__nonRaiting)}
              >
                {!data?.photo ? <PersonIcon className={styles.mobNoAvatarIcon} /> : <img src={data?.photo} alt="" />}
              </div>
            </div>
            <div className={styles.mobRightBlock}>
              {data?.english_name && <div className={styles.mobEnglishName}>{data?.english_name}</div>}
              <div className={styles.mobPosition}>
                <div className={styles.positionText}> {data?.position}</div>
                {data?.list_active_position.length ? (
                  <Link to={`/politician/${data?.short_link}/position_history`}>
                    {data?.position ? `${` ${t('info.more')}${data?.position_count}`}` : ''}
                  </Link>
                ) : (
                  ''
                )}
              </div>
              {(data?.age || data?.city) && (
                <div className={styles.mobAge}>
                  <>
                    <div className={styles.mobAge}>{data?.age ? `${data?.age} ${t('info.age')}` : ''}</div>
                    <div className={styles.mobAge}>{data?.city ? `${data?.city}` : ''}</div>
                  </>
                </div>
              )}
              <div
                onClick={() => push(`/party/${data?.party?.short_link}`)}
                aria-hidden="true"
                className={styles.mobTitle}
              >
                {data?.party?.name}
              </div>
            </div>
          </div>
          <PoliticianCards />
          <LineChartVoters />
          <Button
            variant="outlined"
            color={data?.is_subscribed ? 'secondary' : 'primary'}
            onClick={isAuthenticated ? change : handleClick}
            disabled={status === APIStatus.Loading}
            className={classNames([
              'MuiButton-containedPrimary',
              styles.mobSubscriberButton,
              { '-disabled': !isAuthenticated },
            ])}
          >
            <Tooltip title={isAuthenticated ? '' : t('errors.notAuth')}>
              <span>
                {status === APIStatus.Loading ? (
                  <Loading />
                ) : data?.is_subscribed ? (
                  t('buttons.unsubscribe')
                ) : (
                  t('buttons.subscribe')
                )}
              </span>
            </Tooltip>
          </Button>
          <div className={styles.MobBottom}>
            <Button
              className={classNames('comeIn', styles.mobChangeButton, {
                '-disabled': !isAuthenticated,
              })}
              variant="outlined"
              color="primary"
              onClick={isAuthenticated ? handleClickOpen : handleClick}
            >
              <Tooltip title={isAuthenticated ? '' : t('errors.notAuth')}>
                <span>{t('info.suggestionChangeInProfile')}</span>
              </Tooltip>
            </Button>

            <FacebookShare url={linkShareFacebook}>
              <FacebookIcon fontSize={isMobile ? 'small' : 'large'} className={styles.facebook} />
            </FacebookShare>
          </div>
        </div>
      )}
    </div>
  );
};

export default PoliticianInfoBlock;
