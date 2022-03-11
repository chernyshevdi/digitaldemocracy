import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, TextField, Button } from '@material-ui/core';
import { useFetchSuggestion } from './hooks/useFetchSuggestion';
import { DialogSuggest } from './DialogSuggest/DialogSuggest';
import { Loading } from '../../components/Loading/Loading';
import { SuggestionNav } from './SuggestionNav/SuggestionNav';
// import { WrapperAsyncRequest } from '../../components/Loading/WrapperAsyncRequest';
// import { useWindowSize } from 'src/hooks/useWindowSize';
// import { BackButton } from '../../components/BackButton/BackButton';

import styles from './SuggestionPage.module.scss';

// const NEWS = 'NEWS';
const POLITICIAN = 'POLITICIAN';

const SuggestionPage = () => {
  const { t } = useTranslation();
  // const { isMobile } = useWindowSize();
  const [open, setOpen] = useState(false);
  const [suggest, setSuggest] = useState(POLITICIAN);
  const [infoPolitician, setInfoPolitician] = useState('');
  const [descriptionPoliticain, setDescriptionPolitician] = useState('');
  const [infoNews, setInfoNews] = useState('');
  const [descriptionNews, setDescriptionNews] = useState('');
  const [error, setError] = useState(false);
  const { fetch, status } = useFetchSuggestion();
  const [isRequiredNews, setIsRequiredNews] = useState(false);
  const [isRequiredInfo, setIsRequiredInfo] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (status === 'Success') {
      handleClickOpen();
    } else if (status === 'Failure') {
      setError(true);
    } else if (status === 'Initial') {
      setError(false);
    }
  }, [status]);

  useEffect(() => {
    if (infoPolitician) {
      setIsRequiredInfo(false);
    }
    if (infoNews) {
      setIsRequiredNews(false);
    }
  }, [infoNews, infoPolitician, isRequiredNews, isRequiredInfo]);

  const handeClick = () => {
    if (!infoPolitician || !infoNews) {
      if (!infoPolitician) {
        setIsRequiredInfo(true);
      }
      if (!infoNews) {
        setIsRequiredNews(true);
      }
    }
  };

  return (
    <Container maxWidth="lg" className={styles.container}>
      {/* <WrapperAsyncRequest status={status}> */}
      <SuggestionNav
        setSuggest={setSuggest}
        setError={setError}
        setIsRequiredInfo={setIsRequiredInfo}
        setIsRequiredNews={setIsRequiredNews}
      />
      <DialogSuggest open={open} handleClose={handleClose} />
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          setIsRequiredInfo(false);
          setIsRequiredNews(false);
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          suggest === POLITICIAN
            ? fetch(infoPolitician, descriptionPoliticain, suggest)
            : fetch(infoNews, descriptionNews, suggest);
        }}
        method="POST"
      >
        <div className={styles.fieldWrapper}>
          <TextField
            id="info"
            label={suggest === POLITICIAN ? t('info.linkOnPolitician') : t('info.linkOnNews')}
            className={styles.textField}
            fullWidth
            placeholder={suggest === POLITICIAN ? t('info.linkOnPolitician') : t('info.linkOnNews')}
            required
            value={suggest === POLITICIAN ? infoPolitician : infoNews}
            onChange={
              suggest === POLITICIAN ? (e) => setInfoPolitician(e.target.value) : (e) => setInfoNews(e.target.value)
            }
            // helperText={error ? 'Ссылка неверна' : false}
            helperText={
              isRequiredNews
                ? t('errors.requiredField')
                : isRequiredInfo
                  ? t('errors.requiredField')
                  : error
                    ? t('errors.linkBroken')
                    : false
            }
            error={error || isRequiredNews || isRequiredInfo}
          />
          <TextField
            id="description"
            label={t('info.labelFieldDescription')}
            className={styles.textField}
            fullWidth
            placeholder={t('info.labelFieldDescription')}
            value={suggest === POLITICIAN ? descriptionPoliticain : descriptionNews}
            onChange={
              suggest === POLITICIAN
                ? (e) => setDescriptionPolitician(e.target.value)
                : (e) => setDescriptionNews(e.target.value)
            }
          />
        </div>
        <Button
          variant="outlined"
          color="primary"
          className={styles.submitButton}
          type="submit"
          onSubmit={(e) => {
            e.preventDefault();
          }}
          onClick={handeClick}
        >
          {status === 'Loading' ? <Loading /> : t('buttons.add')}
        </Button>
      </form>
      {/* </WrapperAsyncRequest> */}
    </Container>
  );
};

export default SuggestionPage;
