import type { FC } from 'react';
import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import watched from '../../../icons/pictures/watched.png';
import logo from '../../../icons/logo/2.svg';
import meeting from '../../../icons/pictures/meetingShe.png';

const useStyles = makeStyles(() => ({
  bigCardContainer: {
    width: 325,
    height: 450,
    background: '#F3F3F3',
    borderRadius: 20,
    marginTop: 20,
  },
  bigHeadre: {
    display: 'flex',
    flexFlow: 'column',
  },
  cardContent: {
    fontSize: 24,
    marginBottom: 14,
    fontWeight: 400,
  },
  cardNames: {
    fontSize: 18,
    color: '#747373',
    justifyContent: 'space-around',
    display: 'flex',
    marginBottom: 16,
    textDecoration: 'underline',
  },
  cardImage: {
    borderRadius: 15,
    width: '100%',
    padding: '0 10px',
  },
  imgSize: {
    width: 14,
    height: 14,
  },
  mainHeader: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '25px 11px',
    color: '#747373',
  },
}));

const CardBig: FC = () => {
  const classes = useStyles();
  return (
    <Container style={{ textAlign: 'center' }}>
      <Box className={classes.bigCardContainer}>
        <Box className={classes.mainHeader}>
          <Typography>Дата новости</Typography>
          <Box className={classes.bigHeadre}>
            <Box>
              <img
                className={classes.imgSize}
                src={watched}
                alt="/"
              />
              {' '}
              2203
            </Box>
            <Box mr={1}>
              <img
                className={classes.imgSize}
                src={logo}
                alt="/"
              />
              {' '}
              2203
            </Box>
          </Box>
        </Box>
        <Typography
          variant="h4"
          className={classes.cardContent}
        >
          <Typography style={{ fontSize: 24 }}>В Узбекистане вывели</Typography>
          <Typography style={{ fontSize: 24 }}> новый сорт чая</Typography>
        </Typography>
        <Box className={classes.cardNames}>
          <Typography>Алина Романова</Typography>
          <Typography>Rusbase.ru</Typography>
        </Box>
        <Box>
          <img
            src={meeting}
            alt="/"
            className={classes.cardImage}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default CardBig;
