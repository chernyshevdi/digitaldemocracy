import React, { FC } from 'react';
import { Box, Tooltip, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useHistory, matchPath } from 'react-router';
import { useSelector } from 'react-redux';
import { votesSelectors } from 'src/slices/votesPageSlice';
import { useTranslation } from 'react-i18next';
import watched from '../../icons/pictures/watched.png';
import logo from '../../icons/logo/2.svg';
import { AuthorI, MediaI } from '../../slices/homeSlice';
import hish from '../../icons/pictures/hish.png';

import classes from './VoteCard.module.scss';

interface ElectionsI {
  props?: any;
  bool?: boolean;
}

const VoteCard: FC<ElectionsI> = ({ props, bool }) => {
  const { t, i18n } = useTranslation();
  const getCountry = () => {
    const language = i18n?.language ?? 'ru';
    return props?.country?.title[language];
  };
  const getRegion = () => {
    const language = i18n?.language ?? 'ru';
    return props?.region?.title[language];
  };
  const getCity = () => {
    const language = i18n?.language ?? 'ru';
    return props?.city?.title[language];
  };

  const getBackgroundColor = () => {
    let color = '';
    if (props?.is_silence) {
      color = '#E5E5E5';
    } else if (props?.is_before) {
      color = '#D5EEDC';
    } else if (props?.is_after || props?.is_now) {
      color = 'none';
    }

    return color;
  };
  const getBorder = () => {
    let border = '';
    if (props?.is_silence) {
      border = '1px solid #B0B0B0';
    } else if (props?.is_before) {
      border = '1px solid #248232';
    } else if (props?.is_after || props?.is_now) {
      border = '1px solid #B0B0B0';
    }

    return border;
  };

  return (
    <Box
      className={bool ? classes.bigCardContainerCard : classes.bigCardContainer}
      style={{ background: getBackgroundColor(), border: getBorder() }}
    >
      <Box className={classes.mainHeader}>
        <Box className={classes.date}>
          {props?.start_date && (
            <Typography className={classes.text}>{`${t('votes.startDate')} ${props?.start_date}`}</Typography>
          )}
          {props?.end_date && (
            <Typography className={classes.text}>{`${t('votes.endDate')} ${props?.end_date}`}</Typography>
          )}
        </Box>
        <Box className={classes.bigHeader}>
          {props?.is_silence ? (
            <div className={classes.hish}>
              <img className={classes.imgSizeForHish} src={hish} alt="hish" />
            </div>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img className={classes.imgSize} src={logo} alt="/" />
              <Typography
                sx={{
                  marginLeft: '7px',
                }}
                className={classes.text}
              >
                {props?.count_voted_users || '0'}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      <Box className={classes.content}>
        <Box className={classes.cardContent}>
          {props?.is_silence ? (
            <Tooltip title={props?.silence_tip}>
              <Box sx={{ marginBottom: '10px', minHeight: '115px' }}>
                <Link to={`/elections/${props?.short_link}`}>
                  <Typography className={classes.bigTitle}>{props?.title}</Typography>
                </Link>
              </Box>
            </Tooltip>
          ) : (
            <Box sx={{ marginBottom: '10px', minHeight: '115px' }}>
              <Link to={`/elections/${props?.short_link}`}>
                <Typography className={classes.bigTitle}>{props?.title}</Typography>
              </Link>
            </Box>
          )}

          <Box className={classes.cardNames}>
            {props?.country?.title && <Typography sx={{ padding: 0 }}>{getCountry()}</Typography>}
            {props?.region?.title && <Typography sx={{ padding: 0 }}>{getRegion()}</Typography>}
            {props?.city?.title && <Typography sx={{ padding: 0 }}>{getCity()}</Typography>}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default VoteCard;
