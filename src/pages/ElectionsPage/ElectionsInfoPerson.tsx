import { useEffect, useState, FC } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { ModalParams } from 'src/types/routing';
import { userSelectors } from 'src/slices/userSlice';
import { avatarColorChanger } from 'src/utils/avatarColorChanger';
import { politicianActionCreators, politicianSelectors } from 'src/slices/politicianSlice';
import classNames from 'classnames';
import { Container, Checkbox } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { useSearchParams } from 'src/hooks/useSearchParams';
import { electionsSelector } from 'src/slices/electionsSlice';
import { PercentsLinearGraphic } from './blocks/PercentsLinearGraphic/PercentsLinearGraphic';
import { PoliticianInfoI } from '../../slices/politicianSlice';
import { LineChartVoters } from './blocks/LineChartVoters';
import hish from '../../icons/pictures/hish.png';
import styles from './ElectionsInfoBlock.module.scss';
import { useFetchVoiceAdd } from './hooks/useFetchVoiceAdd';
import { useFetchVoiceDelete } from './hooks/useFetchVoiceDelete';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

interface IProps {
  politician?: PoliticianInfoI;
  voteStatisticsInOtherRegion?: any;
  election?: any;
  isBefore?: boolean;
  isNow?: boolean;
  isAfter?: boolean;
  canVotes?: boolean;
}
const ElectionsInfoPerson: FC<IProps> = ({
  politician,
  voteStatisticsInOtherRegion,
  election,
  isBefore,
  isAfter,
  isNow,
  canVotes,
}) => {
  const { isMobile } = useWindowSize();
  const [checked, setChecked] = useState(politician.election_vote_statistics.is_user_has_vote);
  const [level, setLevel] = useState(null);
  const { fetch: addVoice } = useFetchVoiceAdd();
  const { fetch: deleteVoice } = useFetchVoiceDelete();
  const data = useSelector(electionsSelector.getData());
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const { t, i18n } = useTranslation();
  const {
    [ModalParams.Auth]: { setValue: setAuthValue },
  } = useSearchParams(ModalParams.Auth);

  const getLevel = () => {
    switch (politician?.level) {
      case 'country_id':
        setLevel(politician?.country?.title?.[i18n.language]);
        break;
      case 'city_id':
        setLevel(politician?.city?.title?.[i18n.language]);
        break;
      case 'region_id':
        setLevel(politician?.region?.title?.[i18n.language]);
        break;
      default:
        setLevel(null);
    }
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (!isAuthenticated) {
      setChecked(false);
      setAuthValue('/login');
    } else if (isAuthenticated) {
      if (checked) {
        deleteVoice(politician?.type, politician.id, data?.election.id);
      } else if (!checked) {
        addVoice(politician?.type, politician.id, data?.election.id);
      }
    }
  };
  useEffect((): any => {
    getLevel();
  }, [data]);
  return (
    <Container maxWidth="lg" className={styles.cont}>
      <div className={isMobile ? styles['profileInfoContainer-mobile'] : styles.profileInfoContainer}>
        {!isMobile ? (
          <>
            <div className={!checked ? styles.topItems : classNames(styles.topItems, styles.topItems_green)}>
              <div
                className={
                  politician?.rating
                    ? styles.avatarBlock
                    : classNames(styles.avatarBlock, styles.avatarBlock__nonRaiting)
                }
                style={
                  politician?.rating
                    ? { backgroundImage: `url(${avatarColorChanger(politician?.rating)})`, backgroundSize: 'cover' }
                    : {}
                }
              >
                <div
                  className={politician?.rating ? styles.avatar : classNames(styles.avatar, styles.avatar__nonRaiting)}
                >
                  {!politician?.photo ? (
                    <PersonIcon className={styles.noAvatarIcon} />
                  ) : (
                    <img src={politician?.photo} alt="" />
                  )}
                </div>
              </div>

              <div className={styles.personBlock}>
                <div className={styles.fioBlock}>
                  <div className={styles.fio}>
                    <Link
                      to={`/politician/${politician?.short_link}`}
                    >
                      <p>{politician?.name}</p>
                    </Link>
                    <div className={styles.description__info}>{politician?.english_name}</div>
                    {level && (
                      <div className={styles.description}>
                        <div className={styles.rating}>
                          {t('elections.rating')}: {level} {politician?.rating && `- ${politician?.rating}%`}
                        </div>
                      </div>
                    )}

                    {politician?.place && politician?.rating && level && (
                      <PercentsLinearGraphic vote_groups={politician?.vote_groups} />
                    )}
                    {level && <LineChartVoters data={politician} />}
                    {voteStatisticsInOtherRegion && (
                      <div className={styles.aboutRatingsOther}>
                        <div className={styles.description}>
                          <div className={styles.rating}>
                            {t('elections.rating')}:{' '}
                            {voteStatisticsInOtherRegion?.regionElection?.title?.[i18n.language]}
                            {voteStatisticsInOtherRegion?.rating !== 0 && `- ${voteStatisticsInOtherRegion?.rating}%`}
                          </div>
                        </div>
                        {voteStatisticsInOtherRegion?.rating ? (
                          <PercentsLinearGraphic vote_groups={voteStatisticsInOtherRegion?.vote_groups} />
                        ) : (
                          <div className={styles.noRiting}>
                            <div className={styles.noRiting__btn}>{t('info.withoutRating')}</div>
                          </div>
                        )}
                        <LineChartVoters data={voteStatisticsInOtherRegion} />
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.aboutRatings}>
                  <div className={styles.percentBlock}>
                    <div>
                      {isNow && !election.is_silence && (
                        <Checkbox
                          className={styles.сheckbox}
                          checked={checked}
                          onChange={handleChange}
                          disabled={!canVotes}
                          {...label}
                          sx={{
                            color: '#248232 !important',
                            '&.Mui-checked': { color: '#248232 !important' },
                            '& .MuiSvgIcon-root': { fontSize: 60 },
                          }}
                        />
                      )}
                      <div className={styles.description}>
                        {isNow && !canVotes && (
                          <div className={styles.noVoice}>
                            <div>{t('elections.noVoite')}</div>
                          </div>
                        )}
                        {checked && !election.is_silence && isNow ? (
                          <div className={styles.voice}>
                            <div>{t('elections.yourVoteIsTaken')}</div>
                          </div>
                        ) : (
                          <div className={styles.voice_empty_politic}>
                            <div> </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {(isNow || isAfter) && !election.is_silence && (
                      <div>
                        <div className={styles.percentOther}>{t('elections.votedCandidate')}</div>
                        <div className={styles.percentNumber}>
                          {politician?.election_vote_statistics?.percent_rating_election}%
                        </div>
                        <div className={styles.percentOther_green}>
                          {politician?.election_vote_statistics?.count_voted_users_on_election} {t('info.people')}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {election.is_silence && (
                  <div className={styles.hish}>
                    <img className={styles.imgSize} src={hish} alt="hish" />
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className={styles.mobileRoot}>
            <div
              className={
                !checked
                  ? styles.mobileRoot__border
                  : classNames(styles.mobileRoot__border, styles.mobileRoot__border_green)
              }
            >
              {/* {data?.position && <div className={styles.age}>{data?.position}</div>} */}
              <div className={styles.mobInfoBlock}>
                <div
                  className={
                    politician?.rating
                      ? styles.mobAvatarBlock
                      : classNames(styles.mobAvatarBlock, styles.mobAvatarBlock__nonRaiting)
                  }
                  style={
                    politician?.rating
                      ? { backgroundImage: `url(${avatarColorChanger(politician?.rating)})`, backgroundSize: 'cover' }
                      : {}
                  }
                >
                  <div
                    className={
                      politician?.rating ? styles.mobAvatar : classNames(styles.mobAvatar, styles.mobAvatar__nonRaiting)
                    }
                  >
                    {!politician?.photo ? (
                      <PersonIcon className={styles.mobNoAvatarIcon} />
                    ) : (
                      <img src={politician?.photo} alt="" />
                    )}
                  </div>
                </div>
                <div className={styles.mobRightBlock}>
                  <Link
                    to={`/politician/${politician?.short_link}`}
                  >
                    <p>{politician?.name}</p>
                  </Link>
                  <div className={styles.mobEnglishName}>{politician?.english_name}</div>
                </div>
              </div>
              {level && (
                <div className={styles.mobRightBlock}>
                  <div className={styles.percent_black}>
                    {t('elections.rating')}: {level} {politician?.rating && `- ${politician?.rating}%`}
                  </div>
                </div>
              )}
              {politician?.place && politician?.rating && level && (
                <PercentsLinearGraphic vote_groups={politician?.vote_groups} />
              )}
              {level && <LineChartVoters data={politician} />}
              {voteStatisticsInOtherRegion && (
                <div className={styles.mobRightBlock}>
                  <div className={styles.percent_black}>
                    {voteStatisticsInOtherRegion?.regionElection?.title && 'Рейтинг:'}{' '}
                    {voteStatisticsInOtherRegion?.regionElection?.title?.[i18n.language]}{' '}
                    {voteStatisticsInOtherRegion?.rating !== 0 && `- ${voteStatisticsInOtherRegion?.rating}%`}
                  </div>
                  {voteStatisticsInOtherRegion?.rating ? (
                    <PercentsLinearGraphic vote_groups={voteStatisticsInOtherRegion?.vote_groups} />
                  ) : (
                    <div className={styles.noRiting}>
                      <div className={styles.noRiting__btnMob}>{t('info.withoutRating')}</div>
                    </div>
                  )}
                  <LineChartVoters data={voteStatisticsInOtherRegion} />
                </div>
              )}
              <LineChartVoters />
              {(isNow || isAfter) && !election.is_silence && (
                <div className={styles.mobRightBlock}>
                  <div className={styles.percent_grey}>
                    {t('elections.voted')}: {politician?.election_vote_statistics?.count_voted_users_on_election}{' '}
                    {t('info.people')}
                  </div>
                  <div className={styles.percent_grey}>
                    {t('elections.rating')}:{' '}
                    <span className={styles.percent_span}>
                      {politician?.election_vote_statistics?.percent_rating_election}%
                    </span>
                  </div>
                </div>
              )}
              <div className={styles.mobCheckBlock}>
                {isNow && !election.is_silence && (
                  <Checkbox
                    className={styles.mobCheckBlock__box}
                    checked={checked}
                    onChange={handleChange}
                    disabled={!canVotes}
                    {...label}
                    sx={{
                      color: '#248232 !important',
                      '&.Mui-checked': { color: '#248232 !important' },
                      '& .MuiSvgIcon-root': { fontSize: 30 },
                    }}
                  />
                )}
                {isNow && !canVotes && (
                  <div className={styles.mobCheckBlock__noVoice}>
                    <div>{t('elections.noVoite')}</div>
                  </div>
                )}
                {checked && !election.is_silence && isNow && (
                  <div className={styles.mobCheckBlock__voice}>
                    <div>{t('elections.yourVoteIsTaken')}</div>
                  </div>
                )}
              </div>
              {election.is_silence && (
                <div className={styles.blockHish}>
                  <div className={styles.blockHish__img}>
                    <img className={styles.blockHish__imgSize} src={hish} alt="hish" />
                  </div>
                  <div className={styles.blockHish__text}>{t('elections.electionSilence')}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default ElectionsInfoPerson;
