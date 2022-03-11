import type { FC } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { Box, Container, Typography, IconButton, Grid, Button } from '@material-ui/core';
import { CurrentElection } from '../../../../slices/electionsSlice';
import styles from './ElectionsHero.module.scss';

interface HeroPropsI {
  data?: CurrentElection;
}

const ElectionsHero: FC<HeroPropsI> = ({ data }) => {
  const { t, i18n } = useTranslation();
  const { isMobile } = useWindowSize();

  return (
    <Box className={styles.hero}>
      <Container maxWidth="lg">
        <Grid container className={styles.newsContainer}>
          <Grid item lg={6} md={12} sm={12} className={styles.newsTitle}>
            <Typography className={styles.newsHeading}>{data?.title}</Typography>
          </Grid>
          <Grid item lg={6} md={12} className={styles.newsInfo}>
            <Box>
              <Typography>{data?.start_date}{data?.end_date ? ` - ${data?.end_date}` : null}</Typography>
            </Box>
            <Box>
              <Typography>{data?.country?.title?.[i18n.language]}</Typography>
              <Typography>{data?.region?.title?.[i18n.language]}</Typography>
              <Typography>{data?.city?.title?.[i18n.language]}</Typography>
            </Box>
          </Grid>
        </Grid>
        <Typography className={styles.hero__description}>{data?.description}</Typography>
      </Container>
    </Box>
  );
};

export default ElectionsHero;
