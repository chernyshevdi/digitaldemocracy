import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Container, Typography } from '@material-ui/core';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { searchSelectors, SliceState as ISearchState } from '../../slices/searchSlice';
import { SearchBlockTypes, SearchBlock } from './SearchBlock/SearchBlock';

const SearchPage = () => {
  const { isMobile } = useWindowSize();
  const { t } = useTranslation();
  const searchData: ISearchState = useSelector(searchSelectors.getSearchData());

  const checkSearchData = Object.values(searchData).some((item) => item.data?.length);

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        minHeight: '550px',
        flexDirection: 'column',
        // p: 4,
      }}
    >
      {
        !checkSearchData
        && (
          <Typography
            sx={{
              alignSelf: 'center'
            }}
          >
            {t('info.searchNotFound')}
          </Typography>
        )
      }
      {
        searchData.news.data.length
          ? <SearchBlock headerText={t('tabs.news')} type={SearchBlockTypes.NEWS} />
          : null
      }
      {
        searchData.politician.data.length
          ? <SearchBlock headerText={t('tabs.politicians')} type={SearchBlockTypes.POLITICIAN} />
          : null
      }
      {
        searchData.author.data.length
          ? <SearchBlock headerText={t('tabs.authors')} type={SearchBlockTypes.AUTHOR} />
          : null
      }
      {
        searchData.media.data.length
          ? <SearchBlock headerText={t('tabs.massMedia')} type={SearchBlockTypes.MEDIA} />
          : null
      }
      {
        searchData.party.data.length
          ? <SearchBlock headerText={t('tabs.parties')} type={SearchBlockTypes.PARTY} />
          : null
      }
    </Container>
  );
};

export default SearchPage;
