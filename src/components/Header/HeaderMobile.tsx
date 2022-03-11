import React, { FC, useMemo, useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Link,
  ListItemIcon,
  Dialog,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  DialogContent,
} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Search as SearchBlock } from '../Search/Search';
import Logo from '../Logo';
import Search from '../../icons/Search';
import Menu from '../../icons/Menu';
import { userActionCreators } from '../../slices/userSlice';
import { RootState, useSelector } from '../../store';
import PrivacyPolicyPdf from '../../theme/PrivacyPolicy.pdf';
import TermsOfUse from '../../theme/TermsOfUse.pdf';
import { getItem } from '../../lib/localStorageManager';
import { langSelectors } from '../../slices/langSlice';

const useStyles = makeStyles((theme) => ({
  boxSearch: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    '@media (min-width:900px)': {
      top: 70,
    },
  },
  boxMenu: {
    background: '#fff',
    position: 'absolute',
    top: 67,
    left: 50,
    right: 0,
  },
  active: {
    display: 'block',
  },
  listItem: {
    padding: '0',
  },
  link: {
    display: 'block',
    fontSize: '12px',
    padding: '19px 16px!important',
    color: '#747373',
    fontWeight: 300,
  },
  paper: {
    borderRadius: 0,
  },
  itemLang: {
    padding: '5px 16px',
    borderBottom: '1px solid #ccc',
  },
  itemLangText: {
    '& .MuiTypography-root': {
      fontSize: '12px!important',
    },
  },
}));
const linksData = [
  {
    title: 'aboutMenu',
    url: '/about',
  },
  {
    title: 'donation',
    url: '/donation',
  },
  {
    title: 'userAgreement', // Пользовательское соглашение
    url: null,
    download: true,
    downloadLink: TermsOfUse,
  },
  {
    title: 'personalDataPolicy', // Политика персональных данных
    url: null,
    download: true,
    downloadLink: PrivacyPolicyPdf,
  },
];
const HeaderMobile: FC = () => {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const { push, goBack } = useHistory() as any;
  const { deleteLastRout } = userActionCreators();
  const langData = useSelector(langSelectors.getLang());
  const classes = useStyles();
  const [open, setOpen] = useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const { data } = useSelector((s: RootState) => s?.user?.routes);
  const lastRout = data[data.length - 2]?.path || '/';
  const handleClose = () => {
    setOpenModal(false);
  };
  const pathUrl = pathname.split('/').pop();
  const openDrop = (type: string) => {
    setOpen((prevState) => (prevState === type ? null : type));
  };
  const redirectBack = () => {
    setOpen(null);
    if (pathUrl === 'search') {
      push('/');
    } else {
      push(lastRout);
      deleteLastRout();
    }
  };
  const langTitle = useMemo(() => {
    return langData.find((el) => el.key_lang === getItem('i18nextLng').slice(0, 2))?.title;
  }, [getItem('i18nextLng').slice(0, 2), langData]);
  const urlTitle = useMemo(() => {
    let title = '';
    if (pathUrl === 'subscriptions') {
      title = `${pathUrl}Profile`;
    } else if (pathUrl === 'suggestion') {
      title = `${pathUrl}Add`;
    } else if (pathUrl === 'politicians') {
      title = `${pathUrl}Rating`;
    } else if (pathUrl === 'news') {
      title = 'news';
    } else if (pathUrl === 'donation') {
      title = 'donation';
    } else if (pathname.startsWith('/profile')) {
      title = 'profileMenu';
    } else if (pathname.startsWith('/rating')) {
      title = 'politiciansRating';
    }
    return title;
  }, [pathUrl]);
  return (
    <>
      {pathname !== '/' ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 40,
            cursor: 'pointer',
          }}
        >
          <IconButton onClick={redirectBack}>
            <ArrowBackIcon />
          </IconButton>
          <Typography sx={{ ml: 1.5, fontSize: '14px' }} color="textSecondary">
            {urlTitle ? t(`footer.menu.${urlTitle}`) : ''}
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 40,
            cursor: 'pointer',
          }}
          onClick={() => {
            push('/');
            console.log('redsa');
            window.scrollTo(0, 0);
          }}
        >
          <div className="logo">
            <Logo />
          </div>
          <Typography sx={{ ml: 1.5, fontSize: '14px' }} color="textSecondary">
            Digital
            <br />
            Democracy
          </Typography>
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <IconButton onClick={() => openDrop('search')}>
          <Search />
        </IconButton>
        <IconButton onClick={() => openDrop('menu')}>
          <Menu />
        </IconButton>
      </Box>
      <Box className={classes.boxSearch} style={{ display: open === 'search' ? 'block' : 'none' }}>
        <SearchBlock mobile={true} />
      </Box>
      <Box className={classes.boxMenu} style={{ display: open === 'menu' ? 'block' : 'none' }}>
        <List disablePadding>
          {linksData.map((el) => {
            return (
              <ListItem key={el.title} button className={classes.listItem}>
                <ListItemText
                  primary={
                    <Link
                      sx={{
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        if (!el.url) {
                          return null;
                        }
                        return push(el.url);
                      }}
                      className={classes.link}
                      download={el?.download}
                      href={el?.downloadLink}
                    >
                      {t(`footer.menu.${el.title}`)}
                    </Link>
                  }
                />
              </ListItem>
            );
          })}
          <ListItem button className={classes.listItem} onClick={() => setOpenModal(true)}>
            <ListItemText
              primary={
                <Link
                  sx={{
                    cursor: 'pointer',
                  }}
                  className={classes.link}
                >
                  {langTitle}
                </Link>
              }
            />
            <ListItemIcon>
              <ArrowDropDownIcon />
            </ListItemIcon>
          </ListItem>
        </List>
      </Box>
      <Dialog
        open={openModal}
        onClose={handleClose}
        fullWidth
        classes={{
          paper: classes.paper,
        }}
        // className={classes.modal}
      >
        <List disablePadding>
          {langData.map((el) => {
            return (
              <ListItem
                button
                key={el.key_lang}
                onClick={() => i18n.changeLanguage(el.key_lang)}
                className={classes.itemLang}
              >
                <ListItemText className={classes.itemLangText}>{el.title}</ListItemText>
                <ListItemIcon sx={{ marginRight: '0' }}>
                  <Radio checked={getItem('i18nextLng').slice(0, 2) === el.key_lang} />
                </ListItemIcon>
              </ListItem>
            );
          })}
        </List>
      </Dialog>
    </>
  );
};

export default HeaderMobile;
