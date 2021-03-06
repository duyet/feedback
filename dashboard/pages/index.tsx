import Head from 'next/head';
import type { NextPage } from 'next';
import { ChakraProvider } from '@chakra-ui/react';

import Heros from '../components/landing/hero';
import Widget from '../components/widget';
import Features from '../components/landing/features';
import Pricing from '../components/landing/pricing';

const Home: NextPage = () => {
  return (
    <ChakraProvider>
      <Head>
        <title>Feedback</title>
      </Head>
      <Heros />
      <Features />
      <Pricing />
      <Widget />
    </ChakraProvider>
  );
};

export default Home;
