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
      <Box>
        <Head>
          <title>Feedback</title>
        </Head>

        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Flex
            align="center"
            justify={{
              base: "center",
              md: "space-around",
              xl: "space-between",
            }}
            direction={{ base: "column-reverse", md: "row" }}
            px={8}
            mb={16}
          >
            <Stack w={{ base: "80%", md: "40%" }} textAlign="center">
              <Heading size={"2xl"}>
                okie.one
                <Text as={"span"} color="#0070f3">
                  /feedback
                </Text>
              </Heading>
              <Text>
                Collect issues, ideas and compliments with a simple widget.
              </Text>

              <Box p={10}>
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
            <Box
              w={{ base: "80%", sm: "60%", md: "50%" }}
              mb={{ base: 12, md: 0 }}
            >
              <Image src="/landing.svg" size="100%" rounded="1rem" />
            </Box>
          </Flex>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default Home;
