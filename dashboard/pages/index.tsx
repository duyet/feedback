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
        <title>Feedback - Collect User Feedback, Issues, and Ideas</title>
        <meta name="description" content="A modern feedback platform built with Next.js, TypeScript & Prisma. Collect issues, ideas, and compliments from your users with ease." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* OpenGraph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Feedback - Collect User Feedback, Issues, and Ideas" />
        <meta property="og:description" content="A modern feedback platform built with Next.js, TypeScript & Prisma. Collect issues, ideas, and compliments from your users with ease." />
        <meta property="og:image" content="/landing.png" />
        <meta property="og:url" content="https://feedback.okie.one" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Feedback - Collect User Feedback, Issues, and Ideas" />
        <meta name="twitter:description" content="A modern feedback platform built with Next.js, TypeScript & Prisma. Collect issues, ideas, and compliments from your users with ease." />
        <meta name="twitter:image" content="/landing.png" />

        {/* Additional SEO */}
        <meta name="keywords" content="feedback, user feedback, issue tracking, feature requests, customer feedback, next.js, typescript, prisma" />
        <meta name="author" content="Feedback Team" />
        <link rel="canonical" href="https://feedback.okie.one" />
      </Head>
      <Heros />
      <Features />
      <Pricing />
      <Widget />
    </ChakraProvider>
  );
};

export default Home;
