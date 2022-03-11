import React, { FC, useMemo, useState } from 'react';
import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { useTranslation } from 'react-i18next';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import classNames from 'classnames';
import CardSmall from '../CardSmall/CardSmall';
import { WrapperAsyncRequest } from '../Loading/WrapperAsyncRequest';
import { APIStatus } from '../../lib/axiosAPI';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 35,
    marginBottom: 20
  },
  boxShowBtn: {
    textAlign: 'center'
  },
  showBtn: {
    padding: '5px 100px',
    [theme.breakpoints.down('sm')]: {
      padding: '5px 50px',
    }
  },
  moreBtn: {
    color: '#747373',
    marginTop: '21px',
    textDecoration: 'underline',
    cursor: 'pointer'
  },
  sortBtn: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  activeBtn: {
    backgroundColor: '#363557',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#363557',
      color: '#fff',
    }
  }
}));
interface IProps{
  main?: boolean,
  titleContent: string,
  news: any,
  loading: boolean,
  loadingMore: boolean,
  isMorePages: boolean,
  showMoreNews: () => void,
  viewWk: any,
  viewMore: (value: string) => void
}

const NewsBody:FC<IProps> = ({ main, titleContent, news, loadingMore, isMorePages, showMoreNews, loading, viewWk, viewMore }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [stateSort, setStateSort] = useState(null);
  const handlerSort = (val) => {
    setStateSort((prevState) => prevState === val ? null : val);
  };
  const sortArray = (arr) => {
    const copyArr = [...arr];
    if (!stateSort) {
      return arr;
    }
    if (stateSort === 'population') {
      return copyArr.sort((a, b) => b.number_of_views - a.number_of_views);
    }
    return copyArr.sort((a, b) => a.id - b.id);
  };
  const content = useMemo(() => {
    if (main) {
      return (
        <>
          {news.map((el) => {
            if (el.type !== 'news') return null;
            return (
              <Grid item md={4} sm={6} xs={12} key={el.news.id} paddingTop={0}>
                <CardSmall {...el.news} />
              </Grid>
            );
          })}
        </>
      );
    }
    return (
      <>
        {news.map((wkNews) => {
          return (
            <Grid item xs key={JSON.stringify(wkNews)}>
              <Typography sx={{ color: '#747373' }}>{t('news.newsFrom')} {wkNews.weekdayfrom} {t('news.newsTo')} {wkNews.weekdayto}</Typography>
              <Grid container spacing={2} sx={{ marginTop: 0 }}>
                {sortArray(wkNews.news).slice(0, viewWk[wkNews.weekdayfrom] || wkNews.news.length).map((el) => {
                  return (
                    <Grid item md={4} sm={6} xs={12} key={el.id}>
                      <CardSmall {...el} />
                    </Grid>
                  );
                })}
              </Grid>
              {viewWk[wkNews.weekdayfrom] && wkNews.news.length > viewWk[wkNews.weekdayfrom] && <Typography onClick={() => viewMore(wkNews.weekdayfrom)} className={classes.moreBtn}>{t('news.moreNewsWeek')}</Typography>}
            </Grid>
          );
        })}
      </>
    );
  }, [main, news, viewWk, stateSort]);
  return (
    <>
    <Typography align={!main ? 'left' : 'center'} className={classes.title}>{titleContent}</Typography>
      {!main && (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <Button
              fullWidth className={classNames(classes.sortBtn, stateSort === 'date' && classes.activeBtn)}
              variant="outlined" endIcon={stateSort === 'date' ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />} onClick={() => handlerSort('date')}
            >{t('news.sortByDate')}
            </Button>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Button
              fullWidth className={classNames(classes.sortBtn, stateSort === 'population' && classes.activeBtn)}
              endIcon={stateSort === 'population' ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />} variant="outlined" onClick={() => handlerSort('population')}
            >{t('news.sortByPopulation')}
            </Button>
          </Grid>
        </Grid>
      )}
    <WrapperAsyncRequest status={loading && APIStatus.Loading} height={600}>
      <Grid
        container spacing={!main ? 6 : 2} justifyContent="center"
        direction={!main ? 'column' : 'row'} sx={{ marginTop: !main ? 0 : '-16' }}
      >
        {!news.length && <Typography align="center">{t('news.warningMissNews')}</Typography>}
        {content}
        <Grid item xs={12}>
          <WrapperAsyncRequest status={loadingMore && APIStatus.Loading}>
            <div />
          </WrapperAsyncRequest>
        </Grid>
        {isMorePages && (
          <Grid item xs={12}>
            <Box
              className={classes.boxShowBtn}
            >
              <Button variant="outlined" onClick={showMoreNews} className={classes.showBtn} startIcon={<ArrowDownwardIcon />}>
                {t('buttons.showMore')}
              </Button>
            </Box>
          </Grid>
        )}
      </Grid>
    </WrapperAsyncRequest>
    </>
  );
};

export default NewsBody;
