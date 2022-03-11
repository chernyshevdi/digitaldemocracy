import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Container, Typography, Grid } from '@material-ui/core';
import { AuthorI, MediaI, PoliticiansI } from 'src/slices/SingleNewsSlice';
import { SingleBillsI } from 'src/slices/SingleBillsSlice';
import StatisticsCard from './StatisticsCard';

import styles from './SingleBillsStatistics.module.scss';

interface StatisticsPropsI {
  title?: string;
  image?: string;
  short_link?: string;
  number_of_likes?: number;
  number_of_dislikes?: number;
  is_user_liked?: boolean;
  is_user_disliked?: boolean;
  number_of_views?: number;
}

export const SingleBillsStatistics: FC<any> = ({
  title,
  image,
  short_link,
  number_of_likes,
  number_of_dislikes,
  is_user_liked,
  is_user_disliked,
  number_of_views,
}) => {
  const { t } = useTranslation();

  return (
    <Box className={styles.statistics}>
      <Container maxWidth="lg">
        <Typography className={styles.heading} sx={{ marginBottom: '15px' }}>
          {t('info.titleOpinionBill')}
        </Typography>
        <Grid container className={styles.statisticsContainer}>
          <Grid item lg={6} md={12} sm={12}>
            <Box>
              <StatisticsCard
                name={title || t('info.titleBill')}
                photo={image}
                short_link={short_link}
                likes={number_of_likes}
                dislikes={number_of_dislikes}
                isLiked={is_user_liked}
                isDisliked={is_user_disliked}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SingleBillsStatistics;
