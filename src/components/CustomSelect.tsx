import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  SelectProps,
} from '@mui/material';
import { textColorAccent, textColorError, textColorPrimary } from '@/styles/mixins';


const CustomSelect = React.forwardRef<HTMLDivElement, SelectProps & {
  label?: string;
  error?: boolean;
  helperText?: React.ReactNode;
  items: { value: string; label: string }[];
}>(
  (
    { label, error, helperText, items, sx, ...props },
    ref
  ) => {
    return (
      <FormControl error={error} sx={{ width: '100%' }}>
        {label && (
          <InputLabel sx={{ color: textColorPrimary }}>{label}</InputLabel>
        )}
        <Select
          ref={ref}
          label={label}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: error ? textColorError : textColorAccent,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: textColorAccent,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: textColorAccent,
            },
            color: textColorPrimary,
            ...(sx || {}),
          }}
          error={error}
          {...props}
        >
          {items.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }
);

CustomSelect.displayName = 'CustomSelect';

export default CustomSelect;
