import { Typography } from '@material-ui/core';
import React, { useState, useEffect, FC } from 'react';
import { useSelector } from 'react-redux';
import VoteCard from 'src/components/VoteCard/VoteCard';
import { votesSelectors } from 'src/slices/votesPageSlice';
import { useTranslation } from 'react-i18next';
import styles from './MyVoteCard.module.scss';

interface userElectionsI {
  props?: any;
}

const MyVoteCard: FC<userElectionsI> = ({ props }) => {
  const { t, i18n } = useTranslation();

  const [isMoreLoaded, setIsMoreLoaded] = useState(false);
  const [cards, setCards] = useState([]);

  const handleIsMoreLoaded = () => {
    setIsMoreLoaded(true);
  };

  useEffect(() => {
    setCards(props);
  }, [props]);

  return (
    <div className={styles.Container}>
      <div className={styles.CoutryContainer}>
        <Typography className={styles.CountryName}>
          <p>{t('votes.myVotes')}</p>
        </Typography>
      </div>
      <div className={styles.VotingCards}>
        {cards &&
          cards !== null &&
          cards.length > 0 &&
          cards?.slice(0, 4).map((card) => <VoteCard key={card.id} props={card} />)}
      </div>
      <div className={styles.VotingCards}>
        {cards?.length > 4 && isMoreLoaded && props.slice(4).map((card) => <VoteCard key={card.id} props={card} />)}
      </div>
      {cards?.length > 4 && !isMoreLoaded && (
        <button type="button" className={styles.ShowOtherSelections} onClick={handleIsMoreLoaded}>
          {t('votes.others')}
        </button>
      )}
    </div>
  );
};
export default MyVoteCard;
