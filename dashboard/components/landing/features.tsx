import React from 'react';
import {
  Box,
  chakra,
  Flex,
  Icon,
  Link,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';

const REPO = process.env.repo;

type Props = {
  icon: React.ReactElement;
  color: string;
  title: string;
};

export const Feature: React.FC<Props> = (props) => (
  <Box>
    <Flex
      alignItems="center"
      justifyContent="center"
      w={8}
      h={8}
      mb={4}
      rounded="full"
      color={useColorModeValue(`${props.color}.600`, `${props.color}.100`)}
      bg={useColorModeValue(`${props.color}.100`, `${props.color}.600`)}
    >
      <Icon
        boxSize={5}
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        {props.icon}
      </Icon>
    </Flex>
    <chakra.h3
      mb={2}
      fontWeight="semibold"
      lineHeight="shorter"
      color={useColorModeValue('gray.900', 'gray.900')}
    >
      {props.title}
    </chakra.h3>
    <chakra.p fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
      {props.children}
    </chakra.p>
  </Box>
);

export const Features = () => (
  <Flex p={8} px={8} w="auto" justifyContent="center" alignItems="center">
    <Box
      w={{ base: 'full', md: 11 / 12, xl: 9 / 12 }}
      mx="auto"
      px={8}
      py={20}
      bg={useColorModeValue('white', 'gray.800')}
    >
      <Box textAlign={{ lg: 'center' }}>
        <chakra.p
          mt={2}
          fontSize={{ base: '3xl', sm: '4xl' }}
          lineHeight="8"
          fontWeight="extrabold"
          letterSpacing="tight"
          color={useColorModeValue('gray.900', 'gray.900')}
        >
          Why use the Feedback?
        </chakra.p>
        <chakra.p
          mt={4}
          maxW="2xl"
          fontSize="xl"
          mx={{ lg: 'auto' }}
          color={useColorModeValue('gray.500', 'gray.400')}
        >
          Get insights to dig down into what&apos;s powering your growth the
          most.
        </chakra.p>
      </Box>

      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3 }}
        spacingX={{ base: 8, lg: 24 }}
        spacingY={16}
        mt={6}
      >
        <Feature
          color="yellow"
          title="Quick and easy to integrate"
          icon={
            <path
              fillRule="evenodd"
              d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z"
              clipRule="evenodd"
            />
          }
        >
          Simple to set up and integrate with your website.
        </Feature>

        <Feature
          color="red"
          title="Email and Slack reports"
          icon={
            <path
              fillRule="evenodd"
              d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
              clipRule="evenodd"
            />
          }
        >
          Keep an eye on your customer feedbacks. Get the 1 star notifications
          so you don&apos;t miss any negative feedback, for example.
        </Feature>

        <Feature
          color="green"
          title="Support"
          icon={
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
              clipRule="evenodd"
            />
          }
        >
          Just hit the Feedback button, we will help you in quickly.
        </Feature>

        <Feature
          color="red"
          title="Stars"
          icon={
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          }
        >
          Want your metrics in other services? Extend and integrate to our every
          part of your business.
        </Feature>

        <Feature
          color="pink"
          title="Own and control your data"
          icon={
            <path
              fillRule="evenodd"
              d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z"
              clipRule="evenodd"
            />
          }
        >
          Your central hub that helps you see, and react to, absolutely
          everything that’s happening.
        </Feature>

        <Feature
          color="green"
          title="Open Source"
          icon={
            <>
              <path
                fillRule="evenodd"
                d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M5 11a5 5 0 1110 0 1 1 0 11-2 0 3 3 0 10-6 0c0 1.677-.345 3.276-.968 4.729a1 1 0 11-1.838-.789A9.964 9.964 0 005 11zm8.921 2.012a1 1 0 01.831 1.145 19.86 19.86 0 01-.545 2.436 1 1 0 11-1.92-.558c.207-.713.371-1.445.49-2.192a1 1 0 011.144-.83z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M10 10a1 1 0 011 1c0 2.236-.46 4.368-1.29 6.304a1 1 0 01-1.838-.789A13.952 13.952 0 009 11a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </>
          }
        >
          Feedback is open source. If you’re interested in contributing visit
          the{' '}
          <Link href={REPO} isExternal>
            GitHub repository
          </Link>
          .
        </Feature>
      </SimpleGrid>
    </Box>
  </Flex>
);

export default Features;
