import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Container, Typography, Grid, Button } from '@material-ui/core';
import { NewsI } from 'src/slices/SingleNewsSlice';
import CardSmall from 'src/components/CardSmall/CardSmall';
import styles from './SingleNewsList.module.scss';

interface NewsListI {
  news?: NewsI[],
  isMorePages?: boolean
}

const SingleNewsList: FC<NewsListI> = ({ news, isMorePages }) => {
  const { t } = useTranslation();
  return (
    <Box className={styles.list}>
      <Container maxWidth="lg">
        <Box className={styles.headingContainer}>
          <Typography className={styles.heading}>{t('info.relatedNews')}</Typography>
        </Box>
        <Box className={styles.newsListContainer}>
          <Grid container spacing={2}>
            {news?.map((item) => (
              <Grid item lg={3} md={3} sm={12} key={item.id}>
                <CardSmall {...item} />
              </Grid>
            ))}
          </Grid>
        </Box>
        {isMorePages ? (
          <Box>
            <Button>
              <Typography className={styles.buttonText}>{t('buttons.showMore')}</Typography>
            </Button>
          </Box>
        ) : null}
      </Container>
    </Box>
  );
};

export default SingleNewsList;
