import React from 'react';
import {
  chakra,
  Box,
  Flex,
  Button,
  Stack,
  Text,
  ListRoot,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { useColorModeValue } from '../ui/color-mode';
import { LuCheck, LuExternalLink } from 'react-icons/lu';

export const Pricing: React.FC = () => {
  const DONATION_URL = process.env.donationUrl;

  return (
    <Box mb={10}>
      <Flex
        p={8}
        px={8}
        w="auto"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Box textAlign={{ lg: 'center' }} mb={10}>
          <chakra.p
            mt={2}
            fontSize={{ base: '3xl', sm: '4xl' }}
            lineHeight="8"
            fontWeight="extrabold"
            letterSpacing="tight"
            color={useColorModeValue('gray.900', 'gray.900')}
          >
            Pricing
          </chakra.p>
          <chakra.p
            mt={4}
            maxW="2xl"
            fontSize="xl"
            mx={{ lg: 'auto' }}
            color={useColorModeValue('gray.500', 'gray.400')}
          >
            No credit card required!
          </chakra.p>
        </Box>

        <Flex justifyContent="center">
          <Box
            maxW={'430px'}
            w={'full'}
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow={'2xl'}
            rounded={'md'}
            overflow={'hidden'}
          >
            <Stack
              textAlign={'center'}
              p={6}
              color={useColorModeValue('gray.800', 'white')}
              align={'center'}
            >
              <Text
                fontSize={'sm'}
                fontWeight={500}
                bg={useColorModeValue('green.50', 'green.900')}
                p={2}
                px={3}
                color={'green.500'}
                rounded={'full'}
              >
                All Features
              </Text>
              <Stack direction={'row'} align={'center'} justify={'center'}>
                <Text fontSize={'3xl'} mb={0}>
                  $
                </Text>
                <Text fontSize={'8xl'} mt={0} fontWeight={800}>
                  0
                </Text>
              </Stack>
              <Text>
                Free. However, we do appreciate{' '}
                <Link color="teal" href={DONATION_URL} target="_blank" rel="noopener noreferrer">
                  donations <Icon as={LuExternalLink} mx="1px" />
                </Link>
                .
              </Text>
            </Stack>

            <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
              <ListRoot gap={3}>
                <ListItem>
                  <Icon as={LuCheck} color="green.400" mr={2} />
                  Unlimited projects
                </ListItem>
                <ListItem>
                  <Icon as={LuCheck} color="green.400" mr={2} />
                  Unlimited domains
                </ListItem>
                <ListItem>
                  <Icon as={LuCheck} color="green.400" mr={2} />
                  Unlimited feedback submissions
                </ListItem>
                <ListItem>
                  <Icon as={LuCheck} color="green.400" mr={2} />
                  Support via Github Issues
                </ListItem>
                <ListItem>
                  <Icon as={LuCheck} color="green.400" mr={2} />
                  All features
                </ListItem>
              </ListRoot>

              <Link href="/dashboard" variant="plain">
                <Button
                  mt={10}
                  w={'full'}
                  bg={'teal'}
                  color={'white'}
                  rounded={'xl'}
                  _hover={{
                    bg: 'teal',
                  }}
                  _focus={{
                    bg: 'teal',
                  }}
                >
                  Get started
                </Button>
              </Link>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Pricing;
