import splitbee from '@splitbee/web';
import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { Session } from "next-auth";
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';

function MyApp({ Component, pageProps: { session, ...pagePropsRest } }: AppProps<{ session: Session; }>) {
  useEffect(() => {
    splitbee.init({
      scriptUrl: '/bee.js',
      apiUrl: '/_hive',
    });
  });

  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <Component {...pagePropsRest} />
      </ChakraProvider>
    </SessionProvider>
  );
}
export default MyApp;
