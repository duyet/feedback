import Head from "next/head";
import type { NextPage } from "next";
import {
  ChakraProvider,
  Heading,
  Box,
  Flex,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

import LinkBox from "../components/landing/link-box";

const Home: NextPage = () => {
  return (
    <ChakraProvider>
      <Box width="100%">
        <Head>
          <title>Feedback</title>
        </Head>

        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          <Flex
            align="center"
            justify={{
              base: "center",
              md: "space-around",
              xl: "space-between",
            }}
            direction={{ base: "column-reverse", md: "row" }}
            alignItems="center"
            px={8}
            mb={16}
          >
            <Stack
              textAlign="center"
              pt={20}
            >
              <Heading size={"2xl"}>
                okie.one
                <Text as={"span"} color="#0070f3">
                  /feedback
                </Text>
              </Heading>
              <Text>
                Collect issues, ideas and compliments with a simple widget.
              </Text>

              <Box d="flex"  p={10} flexDirection={{ lg: "row", sm: "column" }} justifyContent="center">
                <LinkBox
                  href="/docs"
                  text="Documentation &rarr;"
                  desc="Learn how to add feedback to your project."
                />
                <LinkBox
                  href="/dashboard"
                  text="Dashboard &rarr;"
                  desc="Dive deep with the dashboard to see the feedbacks."
                />
              </Box>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default Home;
