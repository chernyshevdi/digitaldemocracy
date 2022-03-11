import type { FC } from 'react';
import { Box, TextField, BoxProps } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

interface InputTextFieldProps extends BoxProps {
  icon?: React.ReactNode;
  label?: string;
}

const InputTextField: FC<InputTextFieldProps> = ({ icon, label }, props) => (
  <Box {...props}>
    <TextField
      InputProps={{
        startAdornment: icon,
      }}
      label={label}
      variant="outlined"
      fullWidth
    />
  </Box>
);

InputTextField.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string,
};

export default InputTextField;
