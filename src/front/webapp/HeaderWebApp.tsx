'use client';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Link,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { mainBackgroundColor, textColorPrimary } from '@/styles/mixins';
import { Sidebar } from './Sidebar';
import { useState } from 'react';

export const HeaderWebApp = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <AppBar sx={{ backgroundColor: mainBackgroundColor }} position='static'>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Link href='/telegram-page' underline='none'>
            <Typography
              color={textColorPrimary}
              variant='h6'
              component='div'
              sx={{ flexGrow: 1 }}
            >
              Antonina Fitness
            </Typography>
          </Link>
        </Box>
        <Link href='/telegram-page' underline='none'>
          <IconButton size='large' edge='end' color='inherit' aria-label='home'>
            <HomeIcon />
          </IconButton>
        </Link>
        <Sidebar open={open} onClose={handleDrawerToggle} />
      </Toolbar>
    </AppBar>
  );
};
