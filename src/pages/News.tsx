import React, { FC, useEffect, useMemo, useState } from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import NewsTab from '../components/News/NewsNav/NewsTab';
import { userSelectors } from '../slices/userSlice';
import { useActions } from '../components/News/hooks/useActions';
import { useSelectorType } from '../components/News/hooks/useSelecterType';
import { useWindowSize } from '../hooks/useWindowSize';
import NewsSideBar from '../components/News/NewsSideBar';
import NewsSlider from '../components/News/NewsSlider';
import NewsBody from '../components/News/NewsBody';
import { setWkNews } from '../slices/newsSlice1';

export enum TypeNavigationMenu {
  ACTUAL = 'actual',
  SUBSCRIPTIONS = 'subscriptions',
  COUNTRY = 'country',
  REGION = 'region',
  CITY = 'city',
}

interface IPropsNews{
  main?: boolean
}
const News:FC<IPropsNews> = ({ main }) => {
  const { t, i18n } = useTranslation();
  const { isMobile } = useWindowSize();
  const dispatch = useDispatch();
  const lang = i18n.language;
  const { fetchNews, fetchAllNews, fetchTopicsNews } = useActions();
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const { country_id: country, region_id: region, city_id: city } = useSelector(userSelectors.getUser());
  const { news, loading, isMorePages, error, newsTopics, allNews, loadingMore, wkNews } = useSelectorType((state) => state.newsPage);
  const objForTab = { country, region, city, actual: true, subscriptions: isAuthenticated };
  const [stateTab, setStateTab] = useState(TypeNavigationMenu.ACTUAL);
  const [stateTheme, setStateTheme] = useState(null);
  const [statePage, setStatePage] = useState(1);
  const [stateWkNews, setStateWkNews] = useState(null);
  useEffect(() => {
    if (main) {
      fetchAllNews(statePage, stateTheme);
    } else {
      fetchTopicsNews(statePage);
      fetchNews(statePage, stateTheme, stateTab);
    }
  }, [statePage, stateTheme, stateTab, main]);
  useEffect(() => {
    if (!main) {
      const obj = {};
      if (news && news.length && !wkNews) {
        news.forEach((el) => {
          if (el.news.length > 3) {
            obj[el.weekdayfrom] = 3;
          }
        });
        setStateWkNews(obj);
      } else {
        setStateWkNews(wkNews);
      }
    }
  }, [news, main]);
  const handlerTheme = (id: number | null) => {
    setStatePage(1);
    setStateTheme(id);
  };

  const titleContent = useMemo(() => {
    let title = t('news.actualNews');
    if (stateTab === TypeNavigationMenu.SUBSCRIPTIONS) {
      title = t('news.actualNewsSubscriptions');
    } else if (stateTab !== TypeNavigationMenu.ACTUAL) {
      title = objForTab[stateTab]?.title[lang];
    }
    return title;
  }, [stateTab, lang]);
  const showMoreNews = () => {
    setStatePage((prevState) => prevState + 1);
  };
  const viewMore = (key) => {
    const copyWk = { ...stateWkNews };
    setStateWkNews((prevState) => {
      return { ...prevState, [key]: prevState[key] + 3 };
    });
    copyWk[key] += 3;
    dispatch(setWkNews(copyWk));
  };
  return (
    <Container maxWidth="lg">
      <Grid container direction="column" spacing={isMobile ? 0 : 3} marginBottom={10}>
        {isAuthenticated && !main && (
          <Grid item xs sx={{ width: '100%' }}>
            <NewsTab objForTab={objForTab} handlerTab={setStateTab} valTab={stateTab} />
          </Grid>
        )}
        {isMobile && (
          <Box
            sx={{
              maxWidth: '100%',
              width: '100%',
              minWidth: '160px',
              margin: '35px auto',
            }}
          >
            <NewsSlider mainTitle={t('news.mainTitleList')} items={newsTopics} checkedItem={stateTheme} handlerItem={handlerTheme} />
          </Box>
        )}
        <Grid item xs>
          <Grid container direction={isMobile ? 'column' : 'row'} spacing={isMobile ? 0 : 3}>
            {!isMobile && (
              <Grid item xs={3}>
                <NewsSideBar
                  title={t('news.titleList')}
                  checkedTheme={stateTheme}
                  items={newsTopics || []}
                  handlerTheme={handlerTheme}
                  mainTitle={t('news.mainTitleList')}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={isMobile ? 12 : 9}>
              <NewsBody
                news={main ? allNews : news || []}
                main={main}
                titleContent={titleContent}
                isMorePages={isMorePages}
                loading={loading}
                loadingMore={loadingMore}
                showMoreNews={showMoreNews}
                viewMore={viewMore}
                viewWk={stateWkNews || {}}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default News;
