import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DataGrid, GridColumns } from '@material-ui/data-grid';
import { ThemeProvider } from '@material-ui/core/styles';
import { Tooltip, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';
import { useFetchHistory } from './hooks/useFetchHistory';
import { WrapperAsyncRequest } from '../../../../components/Loading/WrapperAsyncRequest';
import { politicianSelectors } from '../../../../slices/politicianSlice';
import { useLocalesThemeMaterial } from '../../../../hooks/useLocalesThemeMaterial';

const TableTooltip: React.FC<{ value: string }> = ({ value }) => (
  <Tooltip title={value}>
    <span className={styles.cell}>{value}</span>
  </Tooltip>
);

const columns = (t): GridColumns => [
  {
    field: 'position',
    headerName: t('info.titleTablePosition') || 'Должность',
    width: 600,
    // eslint-disable-next-line react/destructuring-assignment
    renderCell: (params: any) => <TableTooltip value={params.value} />,
  },
  {
    field: 'type',
    headerName: t('info.titleTableType') || 'Тип',
    width: 450,
    // eslint-disable-next-line react/destructuring-assignment
    renderCell: (params: any) => <TableTooltip value={params.value} />,
  },
  {
    field: 'percent',
    headerName: t('info.titleTablePercent') || 'С каким процентом выбран',
    align: 'center',
    width: 250,
    renderCell: (params: any) => params.value || '-',
  },
  { field: 'years', headerName: t('info.titleTableYears') || 'Годы', width: 150 },
];

export const PositionHistory = () => {
  const { t } = useTranslation();
  const { status, fetch } = useFetchHistory();
  const data = useSelector(politicianSelectors.getPoliticianInfo());
  const theme = useLocalesThemeMaterial();

  const tableData = data
    ? [
        ...data.list_position.map(({ position, type, id, percent, years }) => ({
          position,
          type,
          id,
          percent,
          years,
          className: 'list_position',
        })),
        ...data.list_active_position.map(({ position, type, id, percent, years }) => ({
          position,
          type,
          id,
          percent,
          years,
          className: 'list_active_position',
        })),
        ...data.list_other_position.map(({ position, type, id, percent, years }) => ({
          position,
          type,
          id,
          percent,
          years,
        })),
      ]
    : [];

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className={styles.container}>
      <WrapperAsyncRequest status={status}>
        <ThemeProvider theme={theme}>
          <DataGrid
            autoHeight
            rows={tableData}
            columns={columns(t)}
            getRowClassName={(params) => {
              const className = params.getValue(params.id, 'className');
              return styles[String(className)];
            }}
            // pageSize={5}
            // checkboxSelection={false}
            // pageSize={0}
            rowHeight={30}
            hideFooterPagination={true}
            rowsPerPageOptions={[]}
            className={styles.dataGrid}
          />
        </ThemeProvider>
      </WrapperAsyncRequest>
    </div>
  );
};
