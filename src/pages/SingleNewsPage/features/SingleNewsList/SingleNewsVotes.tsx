import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Container, Typography, Grid, Button } from '@material-ui/core';
import { NewsI } from 'src/slices/SingleNewsSlice';
import VoteCard from 'src/components/VoteCard/VoteCard';
import styles from './SingleNewsList.module.scss';

interface NewsListI {
  news?: NewsI[];
  isMorePages?: boolean;
  elections?: any;
}

const SingleNewsVotes: FC<NewsListI> = ({ elections, news, isMorePages }) => {
  const { t } = useTranslation();
  return (
    <Box className={styles.list}>
      <Container maxWidth="lg">
        <Box className={styles.headingContainer}>
          <Typography className={styles.heading}>{t('footer.menu.votes')}</Typography>
        </Box>
        <Box className={styles.newsListContainer}>
          <Grid container spacing={2}>
            {elections?.map((item) => (
              <Grid item lg={3} md={3} sm={12} key={item.id}>
                <VoteCard props={item} bool={true} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default SingleNewsVotes;
