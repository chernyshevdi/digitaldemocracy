import React, { FC } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import { useHistory, matchPath } from 'react-router';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { Button, Tooltip } from '@material-ui/core';
import { badgeColorChanger } from 'src/utils/badgeColorChanger';
import { avatarColorChanger } from 'src/utils/avatarColorChanger';
import styles from './PartyCard.module.scss';
import { useSearchParams } from '../../../hooks/useSearchParams';
import { ModalParams } from '../../../types/routing';
import { userSelectors } from '../../../slices/userSlice';
import { PartyI } from '../../../slices/politicianSlice';
import { Loading } from '../../../components/Loading/Loading';
import { APIStatus } from '../../../lib/axiosAPI';

interface IProps extends PartyI {}

const PartyCard: FC<IProps> = ({ logo, rating, name, id, short_link, place, country }) => {
  const { t, i18n } = useTranslation();
  return (
    <div className={styles.root}>
      <Link to={`/party/${short_link}`}>
        <div
          className={styles.avatarBlock}
          style={{ backgroundImage: `url(${avatarColorChanger(rating)})`, backgroundSize: 'cover' }}
        >
          <div className={styles.avatar}>
            {!logo ? <PersonIcon className={styles.noAvatarIcon} /> : <img src={logo} alt="" />}
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
      <hr />
      <div className={styles.name}>{name}</div>
      <div>{country?.title[i18n.language]}</div>
    </div>
  );
};

export default PartyCard;
