import Head from 'next/head';
import type { NextPage } from 'next';
import { ChakraProvider } from '@chakra-ui/react';

import Heros from '../components/landing/hero';

const Home: NextPage = () => {
  return (
    <ChakraProvider>
      <Head>
        <title>Feedback</title>
      </Head>
      <Heros />
    </ChakraProvider>
  );
};

export default Home;
