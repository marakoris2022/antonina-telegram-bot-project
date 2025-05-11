'use client';

import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import {
  About,
  Benefits,
  Contacts,
  CTA,
  FAQ,
  Gallery,
  Hero,
  Pricing,
  Services,
  Testimonials,
} from '../widgets';
import { palette } from '@/styles/mixins';

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
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: palette.primary[900],
            color: palette.primary[100],
          }}
        >
          <About />
          <Services />
          <Benefits />
          <Testimonials />
          <Pricing />
          <Gallery />
          <FAQ />
          <Contacts />
          <CTA />
        </Box>
      </Container>
    </Box>
  );
}
