import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid, GridColumns } from '@material-ui/data-grid';
import { ThemeProvider } from '@material-ui/core/styles';
// import { Tooltip } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from 'src/store';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { massmediaActionCreators } from 'src/slices/massMediaSlice';
import styles from './styles.module.scss';
// import { useFetchHistory } from './hooks/useFetchHistory';
import { WrapperAsyncRequest } from '../../../../components/Loading/WrapperAsyncRequest';
import { useFetchInfluenceStatistic } from '../../hooks/useFetchInfluenceStatistic';
import { useLocalesThemeMaterial } from '../../../../hooks/useLocalesThemeMaterial';

interface ILink {
  to?: string;
}

const columns = (t): GridColumns => {
  return [
    {
      field: 'name',
      headerName: t('info.politicianFIO') || 'ФИО политика',
      width: 400,
      // eslint-disable-next-line react/destructuring-assignment
      renderCell: ({ row }: any) => (
        <Link<ILink> to={`/politician/${row?.politician?.short_link}`}>{row?.politician?.name || '-'}</Link>
      ),
    },
    // eslint-disable-next-line react/destructuring-assignment
    {
      field: 'influence',
      headerName: `% ${t('info.influences')}` || '% Влияния',
      width: 200,
      renderCell: (params: any) => params.value || '-',
    },
    {
      field: 'number_of_news',
      headerName: t('info.references') || 'Упоминаний',
      width: 200,
      renderCell: (params: any) => params.value || '-',
    },
  ];
};

const mobileColumns = (t): GridColumns => {
  return [
    {
      field: 'name',
      headerName: t('info.politicianFIO') || 'ФИО политика',
      width: 300,
      // eslint-disable-next-line react/destructuring-assignment
      renderCell: ({ row }: any) => (
        <Link<ILink> to={`/politician/${row?.politician?.short_link}`}>{row?.politician?.name || '-'}</Link>
      ),
    },
    // eslint-disable-next-line react/destructuring-assignment
    {
      field: 'influence',
      headerName: `% ${t('info.influences')}` || '% Влияния',
      width: 180,
      renderCell: (params: any) => params.value || '-',
    },
    {
      field: 'number_of_news',
      headerName: t('info.references') || 'Упоминаний',
      width: 180,
      renderCell: (params: any) => params.value || '-',
    },
  ];
};

/*
const mobileSEColumns = (t): GridColumns => {
  return [
    {
      field: 'name',
      headerName: t('info.politicianFIO') || 'ФИО политика',
      width: 300,
      // eslint-disable-next-line react/destructuring-assignment
      renderCell: ({ row }: any) => (
        <Link<ILink> to={`/politician/${row?.politician?.short_link}`}>{row?.politician?.name || '-'}</Link>
      ),
    },
    // eslint-disable-next-line react/destructuring-assignment
    {
      field: 'influence',
      headerName: `% ${t('info.influences')}` || '% Влияния',
      width: 180,
      renderCell: (params: any) => params.value || '-',
    },
    {
      field: 'number_of_news',
      headerName: t('info.references') || 'Упоминаний',
      width: 180,
      renderCell: (params: any) => params.value || '-',
    },
  ];
};
*/

export const MassMediaInfluenceStatistic = () => {
  const { t } = useTranslation();
  const theme = useLocalesThemeMaterial();
  const { statisticStatus } = useSelector((s: RootState) => s.massmedia);
  const { fetchStatistic } = useFetchInfluenceStatistic();
  const { resetStatistic } = massmediaActionCreators();
  const data = useSelector((s: RootState) => s.massmedia.statistic);
  const { isMobile, isMobileSE } = useWindowSize();
  useEffect(() => {
    fetchStatistic();
    return (): any => resetStatistic();
  }, []);
  // columns={isMobile ? (isMobileSE ? mobileSEColumns(t) : mobileColumns(t)) : columns(t)}
  return (
    <div className={styles.container}>
      <WrapperAsyncRequest status={statisticStatus}>
        <ThemeProvider theme={theme}>
          <DataGrid
            rows={data || []}
            columns={isMobile ? mobileColumns(t) : columns(t)}
            // pageSize={5}
            // checkboxSelection={false}
            // pageSize={0}
            hideFooterPagination={true}
            rowsPerPageOptions={[]}
            className={styles.dataGrid}
          />
        </ThemeProvider>
      </WrapperAsyncRequest>
    </div>
  );
};

export default MassMediaInfluenceStatistic;
