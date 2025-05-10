import type { Metadata } from 'next';
import { Box, CssBaseline, InitColorSchemeScript } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './globals.css';
import Header from '@/front/components/Header';
import Footer from '@/front/components/Footer';

export const metadata: Metadata = {
  title: 'Antonina Fitness Instructor',
  description:
    "Welcome to Antonina's Fitness web-site! Here you can find all the information about my fitness classes, personal training, and nutrition consulting services.",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute='class' />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <CssBaseline />
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Box component='main' sx={{ flex: 1 }}>
              {props.children}
            </Box>
            <Footer />
          </Box>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
