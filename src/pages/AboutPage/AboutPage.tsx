import { useEffect, useMemo } from 'react';
import { Container, Button } from '@material-ui/core';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { useTranslation } from 'react-i18next';
import { Loading } from 'src/components/Loading/Loading';
import { useSelector } from 'react-redux';
import { aboutPageSelectors } from 'src/slices/aboutPageSlice';
import { useFetchAboutPage } from './hooks/useAboutThePage';
// import Pdf from '../../theme/DD.pdf';
import styles from './AboutPage.module.scss';

const AboutPage = () => {
  const { isMobile } = useWindowSize();
  const { t, i18n: { language } } = useTranslation();
  const data = useSelector(aboutPageSelectors.getAboutPage());
  const { fetch, status } = useFetchAboutPage();

  const textare2Normilize = useMemo(() => {
    if (!data?.textarea2) {
      return '';
    }
    const text = data.textarea2[language]
      .split(' ')
      .filter((elem) => elem !== 'info@digitaldemocracy.ru');
    return text.join(' ');
  }, [data, language]);

  useEffect(() => {
    fetch();
  }, []);

  if (!status) {
    return <Loading />;
  }

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <div className={styles.text}>
          <h1>{data.title1[language]}</h1>
          <p>{data.textarea1[language]}</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.text}>
          <h1>{data.title2[language]}</h1>
          <p>
            {textare2Normilize} <a href="mailto:info@digitaldemocracy.ru">info@digitaldemocracy.ru</a>
          </p>
          {
            data?.file[language]?.file
              ? (
                <a
                  className={`${styles.btnLink} ${styles.btnLink_mrTop}`}
                  target="_blank"
                  rel="noreferrer"
                  href={data?.file[language]?.file ?? ''}
                  download
                >
                  <Button className={`${styles.button}`}>
                    {t('info.learnMore')}
                  </Button>
                </a>
              )
              : (
                <Button className={`${styles.button} ${styles.button_mrTop}`}>
                  {t('info.learnMore')}
                </Button>
              )
          }
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
