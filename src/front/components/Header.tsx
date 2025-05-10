import React from 'react';
import Box from '@mui/material/Box';
import { headerStyles } from '@/styles/mixins';

export default function Header() {
  return (
    <Box
      sx={headerStyles}
      component='header'
    >
      <p>Header</p>
    </Box>
  );
}
