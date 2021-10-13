import Head from 'next/head';
import React, { ReactNode } from 'react';
import { ChakraProvider, Container } from '@chakra-ui/react';

import Header from './header';

type Props = {
  title?: string;
  maxW?: string;
  children: ReactNode;
};

const DEFAULT_FORM_TITLE = 'Feedback Form';

const Layout: React.FC<Props> = ({ title, maxW, children }) => (
  <ChakraProvider>
    <Head>
      <title>{title || DEFAULT_FORM_TITLE}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header title={title || DEFAULT_FORM_TITLE} />
    <Container maxW={maxW || 'container.md'} marginTop={10} paddingLeft={20} paddingRight={20}>
      {children}
    </Container>
  </ChakraProvider>
);

export default Layout;
