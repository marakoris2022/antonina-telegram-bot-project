import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import {
  textColorAccent,
  textColorError,
  textColorPrimary,
} from '@/styles/mixins';

const CustomTextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    return (
      <TextField
        ref={ref}
        {...props}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: textColorAccent,
            },
            '&:hover fieldset': {
              borderColor: textColorAccent,
            },
            '&.Mui-focused fieldset': {
              borderColor: textColorAccent,
            },
            '&.Mui-error fieldset': {
              borderColor: textColorError,
            },
          },
          input: {
            color: textColorPrimary,
          },
          ...(props.sx || {}),
        }}
        label={props.label ? <span style={{ color: textColorPrimary }}>{props.label}</span> : undefined}
      />
    );
  }
);

CustomTextField.displayName = 'CustomTextField';

export default CustomTextField;
