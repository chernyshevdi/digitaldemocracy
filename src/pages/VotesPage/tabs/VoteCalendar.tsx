import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, Checkbox, InputLabel, TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { userSelectors } from 'src/slices/userSlice';
import { electionsActionCreators } from 'src/slices/votesPageSlice';
import RotateLeft from 'src/icons/RotateLeft';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import DesktopDatePicker from '@material-ui/lab/DatePicker';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';

import { ru } from 'date-fns/locale';
import styles from './VoteCalendar.module.scss';

export const VoteCalendar = ({ page, update, setUpdate }) => {
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const [date, setDate] = useState(null);
  const [isOnlyBefore, setIsOnlyBefore] = useState(false);
  const { setSortDate, setSortOnlyBefore } = electionsActionCreators();
  const { t, i18n } = useTranslation();

  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 1);

  const handleChangeOnlyBefore = () => {
    setIsOnlyBefore(!isOnlyBefore);
    setDate(null);
  };
  const handleClr = (e) => {
    e.stopPropagation();
    setDate(null);
  };

  useEffect(() => {
    setSortDate(date);
    setSortOnlyBefore(isOnlyBefore);
    setUpdate(!update);
  }, [date, isOnlyBefore]);

  return (
    <div className={styles.DateContainer}>
      <form className={styles.form}>
        <>
          <div className={styles.futureCheckbox}>
            <Checkbox
              checked={isOnlyBefore}
              onChange={handleChangeOnlyBefore}
              icon={<CircleUnchecked style={{ color: 'black' }} />}
              checkedIcon={<RadioButtonCheckedIcon style={{ color: 'black' }} />}
            />
            <p>{t('votes.onlyFuture')}</p>
          </div>
          <div className={styles.DatePicker}>
            <InputLabel htmlFor="country" className={styles.inputLabel}>
              {t('votes.date')}
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                minDate={isOnlyBefore && new Date()}
                label="Custom input"
                value={date}
                onChange={setDate}
                renderInput={({ inputRef, inputProps, InputProps }) => (
                  <Box className={styles.InputBox}>
                    <input className={styles.InputCalendar} ref={inputRef} {...inputProps} />

                    {InputProps?.endAdornment}

                    <RotateLeft className={styles.Reset} onClick={handleClr} />
                  </Box>
                )}
              />
            </LocalizationProvider>
          </div>
        </>
      </form>
    </div>
  );
};
