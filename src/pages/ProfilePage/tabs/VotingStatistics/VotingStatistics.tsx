import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userSelectors } from 'src/slices/userSlice';
import { DataGrid, GridColumns, GridSortModel } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@material-ui/core/styles';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { Grid, TextField, InputAdornment, IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { useFetchDossierTable } from './hooks/useFetchDossierTable';
import { WrapperAsyncRequest } from '../../../SingleNewsPage/features/Loading/WrapperAsyncRequest';
import { useLocalesThemeMaterial } from '../../../../hooks/useLocalesThemeMaterial';
import styles from './styles.module.scss';
import PoliticianDossierChart from './components/PoliticianDossierChart';
import { useFetchPoliticianDossierGraph } from './hooks/useFetchPoliticianDossierGraph';
import { useActions } from '../../../../components/News/hooks/useActions';
import ProfileNews from '../../components/ProfileNews';
import { useSelectorType } from '../../../../components/News/hooks/useSelecterType';
import { APIStatus } from '../../../../lib/axiosAPI';

const columns = (t, onClick): GridColumns => {
  return [
    {
      field: 'name',
      width: 400,
      headerName: t('info.politicianFIO'),
      renderCell: ({ row }: any) => (
        <span
          onClick={() => onClick(row)}
          onKeyDown={() => onClick()}
          role={'button'}
          tabIndex={0}
          className={styles.link}
        >
          {row?.name || '-'}
        </span>
      ),
    },
    {
      field: 'rating',
      headerName: `${t('info.ratingUser')}`,
      width: 400,
      type: 'number',
      renderCell: ({ row }: any) => row?.rating || '-',
    },
  ];
};

const mobileColumns = (t, onClick): GridColumns => {
  return [
    {
      field: 'name',
      headerName: t('info.politicianFIO'),
      width: 300,
      renderCell: ({ row }: any) => (
        <span
          onClick={() => onClick(row)}
          onKeyDown={() => onClick()}
          role={'button'}
          tabIndex={0}
          className={styles.link}
        >
          {row?.name || '-'}
        </span>
      ),
    },
    {
      field: 'rating',
      headerName: `${t('info.ratingUser')}`,
      width: 300,
      type: 'number',
      renderCell: ({ row }: any) => row?.rating || '-',
    },
  ];
};

export const VotingStatistics = () => {
  const { t } = useTranslation();
  const theme = useLocalesThemeMaterial();
  const [isGraphShown, setIsGraphShown] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageNews, setPageNews] = useState(1);
  const { fetch: fetchDossierTable, status } = useFetchDossierTable();
  const { fetch: fetchDossierChartData, status: statusGraph } = useFetchPoliticianDossierGraph();
  const [politician, setPolitician] = useState({ id: null });
  const { politicians, isMorePages } = useSelector(userSelectors.getDossier());
  const { graph } = useSelector(userSelectors.getDossier());
  const { reset } = useActions();
  const { newsProfile, loading, isMorePages: isMorePagesNews } = useSelectorType((state) => state.newsPage);
  const { isMobile } = useWindowSize();
  const { fetchNewsPolitician } = useActions();
  const changedChartData = graph.map((subArr) => [subArr[1], subArr[0]]);
  const [date, setDate] = useState({
    min: null,
    max: null,
  });
  const [searchText, setSearchText] = useState('');
  const [listPoliticians, setListPoliticians] = useState(politicians);
  useEffect(() => {
    fetchDossierTable(pageNumber);
    return () => {
      setPolitician({ id: null });
    };
  }, [pageNumber]);

  useEffect(() => {
    setListPoliticians(politicians);
  }, [politicians]);

  useEffect(() => {
    if (politician.id) {
      fetchDossierChartData(politician.id);
    }
    return () => {
      reset();
    };
  }, [politician]);

  useEffect(() => {
    if (date.min && date.max && politician.id) {
      fetchNewsPolitician(politician.id, date.min, date.max, pageNews);
    }
  }, [date.max, date.min, politician, pageNews]);
  const showPoliticianChartData = (politic): void => {
    setPolitician(politic);
    setDate({ max: null, min: null });
    setIsGraphShown(true);
  };
  const [sortModel, setSortModel] = React.useState<GridSortModel>([
    {
      field: 'rating',
      sort: 'desc',
    },
  ]);
  const showMoreNews = () => {
    setPageNews((prev) => prev + 1);
  };
  const requestSearch = (value) => {
    setSearchText(value);
    const newList = politicians.filter((n) => n.name.toUpperCase().indexOf(value.toUpperCase()) > -1);
    setListPoliticians(newList);
  };
  return (
    <WrapperAsyncRequest status={status}>
      <ThemeProvider theme={theme}>
        {isGraphShown ? (
          <Grid container direction="column" spacing={4}>
            <Grid item xs={12}>
              <PoliticianDossierChart
                politician={politician}
                setIsGraphShown={setIsGraphShown}
                changedChartData={changedChartData}
                status={statusGraph}
                setDate={setDate}
              />
            </Grid>
            <Grid item xs>
              <WrapperAsyncRequest status={loading ? APIStatus.Loading : APIStatus.Success}>
                <ProfileNews items={newsProfile} isMorePagesNews={isMorePagesNews} showMoreNews={showMoreNews} />
              </WrapperAsyncRequest>
            </Grid>
          </Grid>
        ) : (
          <div>
            <TextField
              type="text"
              id="search"
              variant="outlined"
              placeholder={t('footer.menu.search')}
              onChange={(e) => requestSearch(e.target.value)}
              value={searchText}
              className={styles.searchInput}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => requestSearch('')}>
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <DataGrid
              sortModel={sortModel}
              onSortModelChange={(model) => setSortModel(model.sortModel)}
              rows={listPoliticians}
              columns={isMobile ? mobileColumns(t, showPoliticianChartData) : columns(t, showPoliticianChartData)}
              hideFooterPagination={true}
              className={styles.dataGrid}
            />
            {isMorePages && (
              <button className={styles.showMoreBtn} onClick={() => setPageNumber((prev) => prev + 1)} type={'button'}>
                {t('buttons.showMore')}
              </button>
            )}
          </div>
        )}
      </ThemeProvider>
    </WrapperAsyncRequest>
  );
};
