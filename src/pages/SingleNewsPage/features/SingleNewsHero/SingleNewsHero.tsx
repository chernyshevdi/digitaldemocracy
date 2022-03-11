import type { FC } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { Box, Container, Typography, IconButton, Grid, Button } from '@material-ui/core';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import CallMadeIcon from '@material-ui/icons/CallMade';
import FacebookIcon from '@material-ui/icons/Facebook';
import { CurrentNewsI } from 'src/slices/SingleNewsSlice';
import FacebookShare from 'src/components/FacebookShare/FacebookShare';
import styles from './SingleNewsHero.module.scss';

interface HeroPropsI {
  data?: CurrentNewsI;
}

const SingleNewsHero: FC<HeroPropsI> = ({ data }) => {
  const { t } = useTranslation();
  const [toggleIframe, setToggleIframe] = useState(data.is_display);
  const { isMobile } = useWindowSize();
  const linkShareFacebook = process.env.REACT_APP_HOST + window.location.pathname;
  const handleToggleIframe = () => {
    setToggleIframe(!toggleIframe);
  };
  // console.log(data?.is_display, 'aasdadassdasdasd');
  const pasteLink = (str) => {
    const partStr = str.split(',');
    return (
      <>
        {partStr[0]}
        <a href={data.source_link} target="_blank" rel="noreferrer">
          <IconButton className={styles.arrowButton}>
            <CallMadeIcon className={styles.arrowLink} />
          </IconButton>
        </a>
        ,{partStr[1]}
      </>
    );
  };

  const getLink = () => (
    <a href={data.source_link} target="_blank" rel="noreferrer">
      <IconButton className={styles.arrowButton}>
        <CallMadeIcon className={styles.arrowLink} />
      </IconButton>
    </a>
  );
  const getLinkButton = () => (
    <a href={data.source_link} target="_blank" rel="noreferrer">
      <Button className={styles.linkButton}>
        {!isMobile ? `${t('info.clickForWatchButton')}` : `${t('info.clickForWatchButtonMobile')}`}
      </Button>
    </a>
  );

  return (
    <Box className={styles.hero}>
      <Container maxWidth="lg">
        <Grid container className={styles.newsContainer}>
          <Grid item lg={6} md={12} sm={12} className={styles.newsTitle}>
            <Typography className={styles.newsHeading}>{data?.title}</Typography>
            <Box className={styles.newsLinks}>
              <Box className={styles.arrows}>
                <SubdirectoryArrowRightIcon className={styles.arrowGrey} />
                {data?.is_display ? (
                  <IconButton className={styles.arrowButton} onClick={handleToggleIframe}>
                    <CallMadeIcon className={styles.arrowLink} />
                  </IconButton>
                ) : (
                  getLink()
                )}
                <FacebookShare url={linkShareFacebook}>
                  <FacebookIcon fontSize={'large'} className={styles.facebook} />
                </FacebookShare>
              </Box>
              <Box className={styles.hashtags}>
                {data?.hashtags.map((item) => (
                  <Box className={styles.hashtag} key={item.id}>
                    <Typography className={styles.hashtagContain}>{`#${item.title}`}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
          <Grid item lg={6} md={12} className={styles.newsInfo}>
            <Box className={styles.newsAuthor}>
              <Box>
                <Typography>{data?.media?.name}</Typography>
                <Typography>{data?.author?.name}</Typography>
              </Box>
              <Box className={styles.date}>
                <Typography>{data?.publication_date}</Typography>
              </Box>
            </Box>

            <Box className={styles.newsSubject}>
              {data?.newTopics.map((item) => (
                <Typography
                  key={item.id}
                  sx={{
                    marginRight: '15px',
                  }}
                >
                  {item.title}
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
              <iframe src={data?.source_link} title="link" className={styles.iframe} width="80vw" />
            </Box>
            <Box className={styles.warningMessage} sx={{ marginTop: '30px' }}>
              <Typography className={styles.warningMessage__title}>{t('info.clickForWatch')}</Typography>
              {getLinkButton()}
            </Box>
          </>
        ) : (
          <Box className={styles.warningMessage}>
            {!data?.is_display && (
              <>
                <Typography className={styles.warningMessage__title}>{t('info.clickForWatch')}</Typography>
                {getLinkButton()}
              </>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default SingleNewsHero;
