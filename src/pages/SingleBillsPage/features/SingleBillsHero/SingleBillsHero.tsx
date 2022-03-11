import type { FC } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Container, Typography, IconButton, Grid } from '@material-ui/core';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import CallMadeIcon from '@material-ui/icons/CallMade';
import FacebookIcon from '@material-ui/icons/Facebook';
import { SingleBillsI } from 'src/slices/SingleBillsSlice';
import FacebookShare from 'src/components/FacebookShare/FacebookShare';
import styles from './SingleBillsHero.module.scss';

const SingleBillsHero = ({ data }) => {
  const { t } = useTranslation();
  const [toggleIframe, setToggleIframe] = useState(true);
  const linkShareFacebook = process.env.REACT_APP_HOST + window.location.pathname;
  const handleToggleIframe = () => {
    setToggleIframe(!toggleIframe);
  };
  return (
    <Box className={styles.hero}>
      <Container maxWidth="lg">
        <Grid container className={styles.newsContainer}>
          <Grid item lg={6} md={12} sm={12} className={styles.newsTitle}>
            <Typography className={styles.newsHeading}>{data?.bill?.title}</Typography>
            <Box className={styles.newsLinks}>
              <Box className={styles.arrows}>
                <SubdirectoryArrowRightIcon className={styles.arrowGrey} />
                <IconButton className={styles.arrowButton} onClick={handleToggleIframe}>
                  <CallMadeIcon className={styles.arrowLink} />
                </IconButton>
                <FacebookShare url={linkShareFacebook}>
                  <FacebookIcon fontSize={'large'} className={styles.facebook} />
                </FacebookShare>
              </Box>
              {/* <Box className={styles.hashtags}>
                {data?.hashtags.map((item) => (
                  <Box className={styles.hashtag} key={item.id}>
                    <Typography className={styles.hashtagContain}>{`#${item.title}`}</Typography>
                  </Box>
                ))}
              </Box> */}
            </Box>
          </Grid>
          <Grid item lg={6} md={12} className={styles.newsInfo}>
            <Box className={styles.newsAuthor}>
              {/* <Box>
                <Typography>{data?.media?.name}</Typography>
                <Typography>{data?.author?.name}</Typography>
              </Box> */}
              <Box className={styles.date}>
                <Typography>{data?.bill?.publication_date}</Typography>
              </Box>
            </Box>

            <Box className={styles.politiciansSubject}>
              {data?.politicians.map((item) => (
                <Typography
                  key={item.id}
                  sx={{
                    marginRight: '15px',
                  }}
                >
                  {item.name}
                </Typography>
              ))}
            </Box>
          </Grid>
        </Grid>
        {toggleIframe ? (
          <>
            <Box className={styles.warningMessage}>
              <Typography className={styles.warningMessage__title}>{t('info.warningWatchNews')}</Typography>
            </Box>
            <Box>
              <iframe src={data?.bill.source_link} title="link" className={styles.iframe} width="80vw" />
            </Box>
          </>
        ) : null}
      </Container>
    </Box>
  );
};

export default SingleBillsHero;
