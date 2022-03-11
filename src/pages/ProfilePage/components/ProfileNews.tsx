import React, { FC, useEffect } from 'react';
import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import classNames from 'classnames';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { useTranslation } from 'react-i18next';
import CardSmall from '../../../components/CardSmall/CardSmall';
import Like from '../../../icons/Like';
import DisLike from '../../../icons/DisLike';
import { useActions } from '../../../components/News/hooks/useActions';
import { WrapperAsyncRequest } from '../../SingleNewsPage/features/Loading/WrapperAsyncRequest';
import { APIStatus } from '../../../lib/axiosAPI';

const useStyles = makeStyles((theme) => ({
  hocNewsCard: {
    height: '100%',
    position: 'relative',
    // maxWidth: '270px',
    margin: '0 auto',
  },
  grade: {
    position: 'absolute',
    bottom: '30px',
    width: '106px',
    background: '#BE3B21',
    textAlign: 'right',
    padding: '5px 20px',
    borderRadius: '0px 20px 20px 0px',
    color: '#fff',
  },
  like: {
    background: '#248232',
  },
  dislike: {
    background: '#BE3B21',
  },
  boxShowBtn: {
    textAlign: 'center',
  },
  showBtn: {
    padding: '5px 100px',
    [theme.breakpoints.down('sm')]: {
      padding: '5px 50px',
    },
  },
}));
interface IProps {
  items: any;
  isMorePagesNews: boolean;
  showMoreNews: () => void;
}
const ProfileNews: FC<IProps> = ({ items, isMorePagesNews, showMoreNews }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  if (!items) return null;
  return (
    <Grid container spacing={2}>
      {items.length ? (
        items.map((item) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <div className={classes.hocNewsCard}>
                <CardSmall {...item} />
                {item.vote_of_politician.vote ? (
                  <div className={classNames(classes.grade, classes.like)}>
                    <Like />
                  </div>
                ) : (
                  <div className={classNames(classes.grade, classes.dislike)}>
                    <DisLike sx={{ transform: 'rotate(180deg)' }} />
                  </div>
                )}
              </div>
            </Grid>
          );
        })
      ) : (
        <Grid item xs={12}>
          <Typography align="center">Новостей нет</Typography>
        </Grid>
      )}
      {isMorePagesNews && (
        <Grid item xs={12}>
          <Box className={classes.boxShowBtn}>
            <Button
              variant="outlined"
              onClick={showMoreNews}
              className={classes.showBtn}
              startIcon={<ArrowDownwardIcon />}
            >
              {t('buttons.showMore')}
            </Button>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default ProfileNews;
