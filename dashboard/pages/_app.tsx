import splitbee from '@splitbee/web';
import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { Session } from "next-auth";
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';
import ErrorBoundary from '../components/common/error-boundary';
import { Toaster } from '../components/ui/toaster';
import { system } from '../theme';

function MyApp({ Component, pageProps: { session, ...pagePropsRest } }: AppProps<{ session: Session; }>) {
  useEffect(() => {
    splitbee.init({
      scriptUrl: '/bee.js',
      apiUrl: '/_hive',
    });
  }, []);

  return (
    <ErrorBoundary>
      <SessionProvider session={session}>
        <ChakraProvider value={system}>
          <ThemeProvider attribute="class" disableTransitionOnChange>
            <Component {...pagePropsRest} />
            <Toaster />
          </ThemeProvider>
        </ChakraProvider>
      </SessionProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
