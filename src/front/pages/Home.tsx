'use client';

import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import Hero from '../widgets/Hero';

export default function Home() {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Hero />
      <Container maxWidth='lg'>
        <Box
          sx={{
            my: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant='h4' component='h1' sx={{ mb: 2 }}>
            Material UI - Next.js App Router example in TypeScript
          </Typography>
          <Link href='/about' color='secondary' component={NextLink}>
            Go to the about page
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
