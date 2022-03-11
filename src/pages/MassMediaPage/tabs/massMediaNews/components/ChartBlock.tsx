import React from 'react';
import classNames from 'classnames';
import { Box, Button, Tooltip } from '@material-ui/core';
import { Chart } from 'react-google-charts';
import moment from 'moment';
import { useSelector } from 'react-redux';
import DatePicker, { registerLocale } from 'react-datepicker';
import ru from 'date-fns/esm/locale/ru';
import TimelineIcon from '@material-ui/icons/Timeline';
import { WrapperAsyncRequest } from '../../../../../components/Loading/WrapperAsyncRequest';
import styles from '../../../MassMediaPage.module.scss';
import { politicianSelectors } from '../../../../../slices/politicianSlice';
import { APIStatus } from '../../../../../lib/axiosAPI';

registerLocale('ru', ru);

const options = {
  legend: { position: 'none' },
  axes: {
    x: {
      0: { side: 'bottom', label: '' }
    }
  },
  animation: {
    duration: 1000,
    easing: 'out',
    startup: true
  }
};

interface ChartBlockProps {
  startDate: string
  endDate: string
  initStartDate: string
  initEndDate: string
  setStartDatePicker: (value: Date) => void
  setEndDatePicker: (value: Date) => void
  handleApply: () => void
  startDatePicker: Date
  endDatePicker: Date
  status: APIStatus
}

const ChartBlock: React.FC<ChartBlockProps> = ({
  endDate,
  startDate,
  initEndDate,
  initStartDate,
  setEndDatePicker,
  setStartDatePicker,
  startDatePicker,
  endDatePicker,
  handleApply,
  status
}) => {
  const isPristine = initStartDate === startDate && initEndDate === endDate;
  const validValue = moment(startDate).format('x') < moment(endDate).format('x');
  const disabled = status === APIStatus.Loading;
  const buttonDisabled = !validValue || isPristine;

  const chartData = useSelector(politicianSelectors.getChartData());

  // eslint-disable-next-line no-nested-ternary
  const buttonTooltipTitle = isPristine ? 'Измените значение' : !validValue ? 'Дата начала не должна быть больше даты конца' : '';

  return (
    <div className={styles.chartContainer}>
      <div className={styles.pickersContainer}>
        <div className={classNames(styles.picker, [{ [styles.disabled]: disabled }, { [styles.error]: !validValue }])}>
          <span>Выберите период</span>
          <Box sx={{ px: 2 }}>
            <DatePicker
              disabled={disabled}
              locale="ru"
              selected={startDatePicker}
              onChange={(date) => {
                setStartDatePicker(date);
              }}
            />
          </Box>
        </div>
        <div className={classNames(styles.picker, [{ [styles.disabled]: disabled }, { [styles.error]: !validValue }])}>
          <span>—</span>
          <Box sx={{ px: 2 }}>
            <DatePicker
              disabled={disabled}
              locale="ru"
              selected={endDatePicker}
              onChange={(date) => {
                setEndDatePicker(date);
              }}
            />
          </Box>
        </div>
        <Button
          color="primary"
          onClick={!validValue || isPristine ? undefined : handleApply}
          variant="contained"
          className={classNames('MuiButton-containedPrimary', { '-disabled': buttonDisabled })}
        >
          <Tooltip
            placement="top"
            title={buttonTooltipTitle}
          >
            <span>Применить</span>
          </Tooltip>
        </Button>
      </div>
      <div className={styles.chartWrapper}>
        <WrapperAsyncRequest
          status={status}
          height={300}
        >
          {chartData.length !== 0 ? (
            <Chart
              height="100%"
              options={options}
              className={styles.chart}
              chartLanguage="ru"
              chartType="Line"
              data={[
                ['x', ''],
                ...chartData,
              ]}
            />
          ) : (
            <div className={styles.noNewsBlock}>
              <TimelineIcon
                style={{ color: '#747373' }}
                fontSize="large"
              />
              <span>За выбранный период новостей не было</span>
            </div>
          )}
        </WrapperAsyncRequest>
      </div>
    </div>
  );
};

export default ChartBlock;
