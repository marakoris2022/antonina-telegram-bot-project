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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap'
        />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
        />
      </head>
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
                {children}
              </Box>
              <FooterWebApp />
            </Box>
          </AppRouterCacheProvider>
        </TelegramProvider>
      </body>
    </html>
  );
}
