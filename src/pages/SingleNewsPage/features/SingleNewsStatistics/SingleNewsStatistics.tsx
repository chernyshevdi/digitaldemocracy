import type { FC } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Container, Typography, Grid, IconButton } from '@material-ui/core';
import { AuthorI, BillsI, MediaI, PoliticiansI } from 'src/slices/SingleNewsSlice';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import StatisticsCard from './StatisticsCard';
import StatisticsBillCard from './StatisticsBillCard';
import styles from './SingleNewsStatistics.module.scss';

interface StatisticsPropsI {
  author?: AuthorI;
  media?: MediaI;
  politicians?: PoliticiansI[];
  bills?: BillsI[];
}

const SingleNewsStatistics: FC<StatisticsPropsI> = ({ author, media, politicians, bills }) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  const setShowMore = (arg) => {
    return arg === false ? 4 : undefined;
  };

  return (
    <Box className={styles.statistics}>
      <Container maxWidth="lg">
        <Typography className={styles.heading} sx={{ marginBottom: '15px' }}>
          {t('info.titleOpinionNews')}
        </Typography>
        <Grid container className={styles.statisticsContainer}>
          <Grid item lg={12} md={12} sm={12}>
            {politicians && politicians?.length > 0 && (
              <Box sx={{ marginBottom: '20px' }}>
                <Box className={styles.headings}>
                  <Typography className={styles.heading}>
                    {politicians?.length > 1 ? t('info.titleTrustPoliticians') : t('info.titleTrustPolitician')}?
                  </Typography>
                </Box>
                <Box className={styles.wrapperPoliticians}>
                  {politicians.slice(0, setShowMore(show)).map((it, index) => {
                    return (
                      <StatisticsCard
                        name={it?.name}
                        photo={it?.photo}
                        percent={it?.percent}
                        short_link={it?.short_link}
                        field="/politician"
                        likes={it?.number_of_likes}
                        dislikes={it?.number_of_dislikes}
                        isLiked={it?.is_user_liked}
                        isDisliked={it?.is_user_disliked}
                        politicianIndex={index}
                        id={it?.id}
                        rating={it?.rating}
                        position={it?.position}
                      />
                    );
                  })}
                </Box>
                {politicians?.length >= 4 ? (
                  <div>
                    <div style={{ fontSize: '15px', fontFamily: 'Helvetica', color: '#7a7a7a' }}>
                      {show ? t('buttons.collapse') : t('buttons.showMore')}
                      <IconButton
                        onClick={() => setShow(!show)}
                        className={show ? styles.showMoreButtonOpen : styles.showMoreButton}
                      >
                        <ArrowDownwardIcon />
                      </IconButton>
                    </div>
                  </div>
                ) : null}
              </Box>
            )}
            {media && (
              <Box sx={{ marginBottom: '20px' }}>
                <Box className={styles.headings}>
                  <Typography className={styles.heading}>{t('info.titleTrustMassMedia')}</Typography>
                </Box>
                <StatisticsCard
                  name={media?.name}
                  photo={media?.photo}
                  percent={media?.percent}
                  short_link={media?.short_link}
                  rating={media?.rating}
                  field="/mass-media"
                  likes={media?.number_of_likes}
                  dislikes={media?.number_of_dislikes}
                  isLiked={media?.is_user_liked}
                  isDisliked={media?.is_user_disliked}
                  isMasmedia
                />
              </Box>
            )}
            {author && (
              <Box>
                <Box className={styles.headings}>
                  <Typography className={styles.heading}>{t('info.titleTrustAuthor')}</Typography>
                </Box>
                <StatisticsCard
                  name={author?.name ? author?.name : t('info.author')}
                  photo={author?.photo}
                  percent={author?.percent}
                  short_link={author?.short_link}
                  rating={author?.rating}
                  field="/author"
                  likes={author?.number_of_likes}
                  dislikes={author?.number_of_dislikes}
                  isLiked={author?.is_user_liked}
                  isDisliked={author?.is_user_disliked}
                />
              </Box>
            )}
            {bills && bills?.length > 0 && (
              <Box sx={{ marginBottom: '20px' }}>
                <Box className={styles.headings}>
                  <Typography className={styles.heading}> {t('info.titleOpinionBill')}</Typography>
                </Box>
                <Box className={styles.wrapperBills}>
                  {bills.slice(0, setShowMore(show)).map((it, index) => {
                    return (
                      <StatisticsBillCard
                        name={it?.title || t('info.titleBill')}
                        short_link={it?.short_link}
                        field="/bill"
                        likes={it?.number_of_likes}
                        dislikes={it?.number_of_dislikes}
                        isLiked={it?.is_user_liked}
                        isDisliked={it?.is_user_disliked}
                        billIndex={index}
                        id={it?.id}
                      />
                    );
                  })}
                </Box>
                {bills?.length >= 4 ? (
                  <div>
                    <div style={{ fontSize: '15px', fontFamily: 'Helvetica', color: '#7a7a7a' }}>
                      {show ? t('buttons.collapse') : t('buttons.showMore')}
                      <IconButton
                        onClick={() => setShow(!show)}
                        className={show ? styles.showMoreButtonOpen : styles.showMoreButton}
                      >
                        <ArrowDownwardIcon />
                      </IconButton>
                    </div>
                  </div>
                ) : null}
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SingleNewsStatistics;
