import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Container } from '@material-ui/core';
import photo from 'src/icons/pictures/no_photo.svg';
import styles from './HeroPicture.module.scss';
// import heroImage from '../../../icons/pictures/HeroPictureBig.png';

const HomeHero: FC = () => {
  const { t } = useTranslation();

  return (
    <Box className={styles.heroContainer}>
      <Container maxWidth="lg">
        <Box className={styles.heroImage}>
          <Typography className={styles.heroText}>
            { t('home.descriptionHome') }
            {/* Дорогой Друг! Развитие демократии невозможно без системы сдержек и противовесов, не позволяющей всей полноте
            власти концентрироваться в одних руках и равномерно распределенной между государственными ветвями власти. С
            развитием средств связи к этой системе добавились СМИ, которые могли влиять на общественное мнение, но без
            обратной связи от населения. Интернет привнес интерактив в диалог между властью и народом. Осталось лишь
            формализовать и структурировать эти отношения и общество будет готово вступить в следующий этап развития
            политического строя - &quot;Цифровую демократию&quot;. Добро пожаловать! */}
          </Typography>
          <div className={styles.imageContainer}>
            <img src={photo} alt="not found" className={styles.image} />
          </div>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeHero;
