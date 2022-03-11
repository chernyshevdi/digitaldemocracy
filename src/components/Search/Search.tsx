import React, { useEffect, useReducer } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import debounce from 'lodash/debounce';
import { Button, TextField, InputAdornment, IconButton, Container } from '@material-ui/core';
import cn from 'classnames';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { BackButton } from '../BackButton/BackButton';
import { useSearch } from './hooks/useSearch';
import { searchActionCreators } from '../../slices/searchSlice';

import styles from './Search.module.scss';

interface filterButtonsI {
  news: ButtonI;
  politician: ButtonI;
  author: ButtonI;
  media: ButtonI;
  parties: ButtonI;
}

interface ButtonI {
  id: number;
  type: string;
  name: string;
  active: boolean;
  keyTranslate: string;
}

const filtersButtons = (t): filterButtonsI => ({
  news: {
    id: 1,
    type: 'isNews',
    name: t('tabs.news'),
    active: false,
    keyTranslate: 'tabs.news',
  },
  politician: {
    id: 2,
    type: 'isPolitician',
    name: t('tabs.politicians'),
    active: false,
    keyTranslate: 'tabs.politicians',
  },
  author: {
    id: 3,
    type: 'isAuthor',
    name: t('tabs.authors'),
    active: false,
    keyTranslate: 'tabs.authors',
  },
  media: {
    id: 4,
    type: 'isMedia',
    name: t('tabs.massMedia'),
    active: false,
    keyTranslate: 'tabs.massMedia',
  },
  parties: {
    id: 5,
    type: 'isParty',
    name: t('tabs.parties'),
    active: false,
    keyTranslate: 'tabs.parties',
  },
});

const reducerFiltersButtons = (state: filterButtonsI, action) => {
  switch (action.type) {
    case 'SET_ACTIVE':
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          active: !state[action.payload.key].active,
        },
      };
    case 'CHANGE_LANG':
      return Object.keys(state).reduce(
        (acc, key) => ({
          ...acc,
          [key]: {
            ...state[key],
            name: action.t(state[key].keyTranslate),
          },
        }),
        state
      );
    case 'RESET':
      return Object.keys(state).reduce(
        (acc, key) => ({
          ...acc,
          [key]: {
            ...state[key],
            active: false,
          },
        }),
        state
      );
    default:
      return state;
  }
};

const setActiveAction = (key) => ({
  type: 'SET_ACTIVE',
  payload: {
    key,
  },
});

export const Search = ({ mobile = false }) => {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const { push } = useHistory();
  const { setSearchQuery, clearSearchData } = searchActionCreators();
  // const { searchQuery: { value: searchQueryParam, setValue: setSearchQueryParam } } = useSearchParams('searchQuery');
  const { fetchSearchCategories } = useSearch();
  const [buttons, dispatchBtn] = useReducer(reducerFiltersButtons, filtersButtons(t));

  useEffect(() => {
    dispatchBtn({ type: 'CHANGE_LANG', t });
  }, [i18n.language]);

  const checkActiveBtn = () => {
    return Object.values(buttons).some((item) => item.active);
  };

  const handleSearchFetch = (query) => {
    if (checkActiveBtn()) {
      fetchSearchCategories({
        search: query,
        isNews: buttons.news.active,
        isPolitician: buttons.politician.active,
        isAuthor: buttons.author.active,
        isMedia: buttons.media.active,
        isParty: buttons.parties.active,
        page: 1,
        perPage: 4,
      });
    } else {
      fetchSearchCategories({
        search: query,
        page: 1,
        perPage: 4,
      });
    }
  };

  const debounceHandleSearchFetch = debounce(handleSearchFetch, 300);

  const handleSearchChange =
    (setValue) =>
    (event): void => {
      setValue('search', event.target.value);
      setSearchQuery({ searchQuery: event.target.value });
      if (pathname === '/search' && event.target.value.length >= 3) {
        debounceHandleSearchFetch(event.target.value);
      }
      if (event.target.value === '') {
        clearSearchData();
      }
    };

  const handleKeyPress = (event) => {
    if (pathname !== '/search' && event.charCode === 13) {
      push('/search');
    }
  };

  const handleResetSearch =
    (handleReset) =>
    (event): void => {
      handleReset(event);
      dispatchBtn({ type: 'RESET' });
      clearSearchData();
    };

  const handleSubmitForm = (values) => {
    if (values.search) {
      handleSearchFetch(values.search);
    }
  };

  return (
    <Container>
      <Container className={styles.container} sx={{ padding: mobile && '0!important' }}>
        {pathname !== '/' && !mobile && <BackButton />}
        <div className={styles.search}>
          <Formik
            initialValues={{
              search: '',
            }}
            onSubmit={(values) => {
              handleSubmitForm(values);
            }}
            validationSchema={Yup.object().shape({
              search: Yup.string().min(3, t('errors.minSymbol')),
            })}
            enableReinitialize={true}
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                dirty,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset,
                setFieldValue,
              } = props;
              return (
                <form onSubmit={handleSubmit} noValidate>
                  <div className={styles.searchContainer}>
                    <div style={{ display: 'flex', flex: 1 }}>
                      <div className={styles.searchInput}>
                        <TextField
                          type="text"
                          id="search"
                          variant="outlined"
                          fullWidth
                          // label="Поиск"
                          placeholder={t('footer.menu.search')}
                          value={values.search}
                          onChange={handleSearchChange(setFieldValue)}
                          onBlur={handleBlur}
                          onKeyPress={handleKeyPress}
                          error={touched.search && Boolean(errors.search)}
                          helperText={touched.search && errors.search}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={handleResetSearch(handleReset)}>
                                  <ClearIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                            sx: {
                              borderRadius: '70px 0 0 70px',
                              background: mobile ? '#fff' : 'auto',
                            },
                            className: styles.searchInput,
                          }}
                        />
                      </div>
                      <Button
                        type="submit"
                        variant="outlined"
                        onClick={() => values.search.length >= 3 && push('/search')}
                        className={styles.searchButton}
                        sx={{
                          backgroundColor: '#363557',
                          borderRadius: '0 70px 70px 0',
                          width: '15%',
                          maxHeight: '40px',
                        }}
                      >
                        {mobile ? (
                          <SearchIcon fill={'#FFFFFF'} style={{ fontSize: '30px' }} />
                        ) : (
                          t('footer.menu.search')
                        )}
                      </Button>
                    </div>
                    {!mobile && pathname === '/search' && (
                      <div className={styles.filterTabs}>
                        {Object.keys(buttons).map((key) => (
                          <Button
                            key={buttons[key].id}
                            type="submit"
                            variant="outlined"
                            sx={{
                              height: '30px',
                              marginRight: '28px',
                              // backgroundColor: buttons[key].active ? '#363557' : 'initial',
                            }}
                            className={cn({
                              [styles.tabs_active]: buttons[key].active,
                            })}
                            onClick={() => dispatchBtn(setActiveAction(key))}
                          >
                            {buttons[key].name}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </form>
              );
            }}
          </Formik>
        </div>
      </Container>
    </Container>
  );
};

export default Search;
