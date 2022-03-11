import React, { FC, useEffect } from 'react';
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  AppBar,
  Box,
  Button,
  Link,
  Toolbar,
  Typography,
  Container,
  Select,
  MenuItem,
  FormControl,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
// import Search from '../icons/Search';
// import InputTextField from './widgets/inputs/InputTextField';
import Brand from '../icons/Brand';
import { useWindowSize } from '../hooks/useWindowSize';
import { NewPerson } from '../icons/Person';
import { ModalParams } from '../types/routing';
import { useSearchParams } from '../hooks/useSearchParams';
import Logo from './Logo';
import { userActionCreators, userSelectors } from '../slices/userSlice';
import { langSelectors } from '../slices/langSlice';
import { useLangData } from '../hooks/useLangData';
import { getItem } from '../lib/localStorageManager';
import HeaderMobile from './Header/HeaderMobile';
import './MainNavbar.scss';

const linksData = (t) => [
  {
    to: '/rating/politicians',
    title: t('tabs.rating'),
    mr: 4,
  },
  {
    to: '/news',
    title: t('tabs.news'),
    mr: 4,
  },
  {
    to: '/votes',
    title: t('footer.menu.votes'),
    mr: 4,
  },

  {
    to: '/about',
    title: t('tabs.about'),
    mr: 4,
  },
  {
    to: '/suggestion',
    title: t('buttons.suggestion'),
    mr: 3,
    showIsAuth: true,
  },
];

const linksToLink =
  (isAuth, pathname, isFuture) =>
  ({ title, mr, to, showIsAuth = false }, index) => {
    const activeLink = pathname.split('/')[1] === to.split('/')[1];
    if (showIsAuth) {
      if (isAuth) {
        return (
          <Link
            key={index.toString()}
            to={to}
            color="textSecondary"
            component={RouterLink}
            underline="none"
            // variant="body1"
            sx={{
              whiteSpace: 'nowrap',
              marginRight: mr,
              fontFamily: 'HelveticaNeueCyr, sans-serif',
              fontSize: 18,
              sm: {
                fontSize: 12,
              },
              color: activeLink ? '#363557' : '',
              // fontWeight: activeLink ? 'bold' : 'normal',
            }}
          >
            {title}
          </Link>
        );
      }
      return null;
    }

    return (
      <Link
        key={index.toString()}
        to={to}
        color="textSecondary"
        component={RouterLink}
        underline="none"
        // variant="body1"
        sx={{
          whiteSpace: 'nowrap',
          marginRight: mr,
          fontFamily: 'HelveticaNeueCyr, sans-serif',
          fontSize: 18,
          position: 'relative',
          sm: {
            fontSize: 12,
          },
          color: activeLink ? '#363557' : '',
          // fontWeight: activeLink ? 'bold' : 'normal',
        }}
      >
        {title}
        {to === '/votes' && isFuture && <div className="activeVotes"> </div>}
      </Link>
    );
  };

const MainNavbar: FC = () => {
  const { t, i18n } = useTranslation();
  const langData = useSelector(langSelectors.getLang());
  const links = linksData(t);
  const { fetch: fetchLang } = useLangData();
  const { push, length } = useHistory() as any;
  const { pathname } = useLocation();
  const { isMobile } = useWindowSize();
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const { setRout } = userActionCreators();
  const isFuture = useSelector(userSelectors.getUser()).is_have_future_elections;
  const {
    [ModalParams.Auth]: { setValue: setAuthValue },
  } = useSearchParams(ModalParams.Auth);

  useEffect(() => {
    fetchLang();
  }, []);

  const handleClick = (to: string) => {
    if (isAuthenticated) {
      push(to);
    } else {
      setAuthValue(to);
    }
  };

  useEffect(() => {
    setRout({ path: pathname, length });
  }, [pathname]);
  return (
    <AppBar
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.secondary',
        maxHeight: '88px',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            minHeight: 64,
            justifyContent: 'space-between',
            alignItems: 'center',
            display: 'flex',
            position: 'relative',
            padding: isMobile && '0!important',
          }}
        >
          {isMobile ? (
            <HeaderMobile />
          ) : (
            <>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  height: 40,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 40,
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    push('/');
                    window.scrollTo(0, 0);
                  }}
                >
                  <div className="logo">
                    <Logo />
                  </div>
                  <Typography
                    sx={{ ml: 1.5, fontSize: '14px' }}
                    color="textSecondary"
                    // variant="caption"
                  >
                    Digital
                    <br />
                    Democracy
                  </Typography>
                </Box>
                {/*
                  <Box
                    sx={{
                      margin: '0 16px',
                    }}
                  >
                    {!isMobile && (
                      <Box style={{ width: '100%' }}>
                        {<InputTextField icon={<Search />} />}
                        <TextField
                          onKeyPress={handleSearchEnter}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment sx={{ marginRight: 0 }} position="start">
                                <Search />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Box>
                    )}
                  </Box>
                */}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {!isMobile && <Box>{links.map(linksToLink(isAuthenticated, pathname, isFuture))}</Box>}
                <Box
                  sx={{
                    backgroundColor: 'background.paper',
                    p: '5px',
                    display: 'flex',
                    mr: 3,
                  }}
                >
                  {!isAuthenticated && (
                    <Button
                      className={classNames(['comeIn'])}
                      sx={{
                        p: 1,
                        paddingRight: 2,
                        paddingLeft: 2,
                        borderRadius: 100,
                        mr: 2,
                        textDecoration: 'none',
                      }}
                      size="small"
                      variant="outlined"
                      onClick={() => handleClick('login')}
                    >
                      {t('buttons.signInButtons')}
                    </Button>
                  )}
                  <Button
                    className={
                      !isAuthenticated
                        ? classNames(['buttonsStyle', { register: true }])
                        : classNames(['buttonsStyleProfile'])
                    }
                    sx={{
                      backgroundColor: 'white',
                      p: isAuthenticated ? 0 : 1,
                      paddingRight: isAuthenticated ? 0 : 2,
                      paddingLeft: isAuthenticated ? 0 : 2,
                      borderRadius: 100,
                      mr: 0,
                    }}
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      if (!pathname.includes('profile')) {
                        handleClick(isAuthenticated ? '/profile' : 'register');
                      }
                    }}
                  >
                    {isAuthenticated ? <NewPerson /> : t('buttons.registrationButtons') || 'Регистрация'}
                  </Button>
                </Box>
                <Box>
                  <FormControl sx={{ minWidth: '60px' }}>
                    <Select
                      variant="outlined"
                      defaultValue={getItem('i18nextLng').slice(0, 2) || 'ru'}
                      sx={{ height: '30px' }}
                      onChange={(event: React.ChangeEvent<{ value: string }>) => {
                        i18n.changeLanguage(event.target.value);
                      }}
                    >
                      {langData.map((item) => (
                        <MenuItem key={item.id} value={item.key_lang} className={classNames(['language__item'])}>
                          {item.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MainNavbar;
