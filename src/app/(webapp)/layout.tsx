import { TelegramProvider } from '@/providers/TelegramProvider';

import type { Metadata } from 'next';
import { Box, CssBaseline, InitColorSchemeScript } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Antonina Fitness Instructor',
  description:
    "Welcome to Antonina's Fitness web-site! Here you can find all the information about my fitness classes, personal training, and nutrition consulting services.",
};

import { HeaderWebApp } from '@/front/webapp/HeaderWebApp';
import { FooterWebApp } from '@/front/webapp/FooterWebApp';

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute='class' />
        <TelegramProvider>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <CssBaseline />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
              }}
            >
              <HeaderWebApp />
              <Box
                component='main'
                sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}
              >
                {props.children}
              </Box>
              <FooterWebApp />
            </Box>
          </AppRouterCacheProvider>
        </TelegramProvider>
      </body>
    </html>
  );
}
