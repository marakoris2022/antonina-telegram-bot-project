import React from 'react';
import Box from '@mui/material/Box';
import { headerHeight, heroHeight } from '@/styles/mixins';

export function Hero() {
  return (
    <Box
      sx={{
        width: '100%',
        height: heroHeight,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <video style={{ width: '100%', height: 'auto', objectFit: 'cover', minHeight: `calc(100vh - ${headerHeight})` }} autoPlay loop muted>
        <source src="/hero_video.mp4" type="video/mp4" />
      </video>
    </Box>
  );
}
