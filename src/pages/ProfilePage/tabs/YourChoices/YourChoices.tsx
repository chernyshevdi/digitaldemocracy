import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelectors } from 'src/slices/userSlice';
import { DataGrid, GridColumns } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@material-ui/core/styles';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { WrapperAsyncRequest } from '../../../SingleNewsPage/features/Loading/WrapperAsyncRequest';
import { useLocalesThemeMaterial } from '../../../../hooks/useLocalesThemeMaterial';
import { useFetchChoices } from './hooks/useFetchChoices';
import styles from './styles.module.scss';

const columns = (isMobile, t): GridColumns => {
  return [
    {
      field: 'choices',
      width: isMobile ? 300 : 400,
      headerName: t('tabs.voice'),
      type: 'string',
      renderCell: ({ row }: any) => (
        <Link role={'button'} className={styles.link} tabIndex={0} to={`/elections/${row.short_link}`}>
          {row.choices || '-'}
        </Link>
      ),
    },
    {
      field: 'candidate',
      headerName: t('tabs.yourCandidate'),
      width: isMobile ? 300 : 400,
      type: 'string',
      renderCell: ({ row }: any) => (
        <Link
          role={'button'}
          className={styles.link}
          tabIndex={0}
          to={
            row.type !== 'party'
              ? `/politician/${row.politic_link}/politician_news/?photo=${
                  row.photo ||
                  'https://ipbmafia.ru/uploads/monthly_2018_07/895242-200.png.e10304d04e80f56d3ebaa863b4ccdd41.png'
                }&name=${row.name || 'name'}&position=${row.position || 'политик'}`
              : `/party/${row.politic_link}`
          }
        >
          {row.candidate || '-'}
        </Link>
      ),
    },
  ];
};

export const YourChoices = () => {
  const { t } = useTranslation();
  const theme = useLocalesThemeMaterial();
  const [rows, setRows] = useState(null);
  const { fetch: fetchChoices, status } = useFetchChoices();
  const date = useSelector(userSelectors.getChoices());
  const { isMobile } = useWindowSize();

  useEffect(() => {
    const row = [];
    date.forEach((data) =>
      row.push({
        id: data.election.id,
        choices: data.election.title,
        candidate: data.participant.name,
        short_link: data.election.short_link,
        politic_link: data.participant.short_link,
        type: data.participant.type,
      })
    );
    setRows(row);
  }, [date]);

  useEffect(() => {
    fetchChoices();
  }, []);

  return (
    <WrapperAsyncRequest status={status}>
      <ThemeProvider theme={theme}>
        <div style={{ height: '100%', width: isMobile ? '400px' : '100%' }}>
          <DataGrid
            className={styles.dataGrid}
            columns={columns(isMobile, t)}
            rows={rows}
            hideFooterPagination={true}
            sortModel={[
              { field: 'choices', sort: 'asc' },
              { field: 'candidate', sort: 'asc' },
            ]}
          />
        </div>
      </ThemeProvider>
    </WrapperAsyncRequest>
  );
};
