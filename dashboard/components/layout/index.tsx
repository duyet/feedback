import Head from "next/head";
import React, { ReactNode } from "react";
import { ChakraProvider, Container } from "@chakra-ui/react";

import Header from "./header";
import Widget from "../widget";

type Props = {
  title?: string;
  maxW?: string;
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ title, maxW, children }) => (
  <ChakraProvider>
    <Head>
      <title>{title || process.env.title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header />
    <Container maxW={maxW || "container.lg"} marginTop={10}>
      {children}
    </Container>
    <Widget />
  </ChakraProvider>
);

export default Layout;
