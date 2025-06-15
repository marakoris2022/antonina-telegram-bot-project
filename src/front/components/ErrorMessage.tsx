import { Box, Typography } from '@mui/material';
import React from 'react';


export interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        backgroundColor: 'transparent',
        border: '1px solid #ffa4a4',
        borderRadius: 2,
        padding: 3,
        margin: 2,
        boxShadow: 1,
      }}
    >
      <Typography variant="h6" color="error" gutterBottom>
        {message}
      </Typography>
    </Box>
  );
};
