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
  Icon,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useColorModeValue } from '../ui/color-mode';
import { LuCheck, LuExternalLink } from 'react-icons/lu';

const MotionBox = motion.create(Box);

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

export const Pricing: React.FC = () => {
  const DONATION_URL = process.env.donationUrl;

  return (
    <Box
      py={{ base: 16, md: 24 }}
      px={8}
      position="relative"
      bg={useColorModeValue('gray.50', 'gray.900')}
    >
      {/* Top gradient divider */}
      <Box
        position="absolute"
        top={0}
        left="10%"
        right="10%"
        height="1px"
        bgGradient="linear(to-r, transparent, gray.300, transparent)"
        opacity={useColorModeValue(0.6, 0.2)}
      />

      {/* Background decorative blob */}
      <Box
        position="absolute"
        top="20%"
        left="50%"
        transform="translateX(-50%)"
        w="600px"
        h="400px"
        borderRadius="full"
        bg={useColorModeValue('teal.100', 'teal.900')}
        opacity={useColorModeValue(0.12, 0.06)}
        filter="blur(100px)"
        pointerEvents="none"
      />

      <Flex
        w="auto"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        position="relative"
        zIndex={1}
      >
        <Box textAlign={{ lg: 'center' }} mb={{ base: 8, md: 12 }}>
          <chakra.p
            mt={2}
            fontSize={{ base: '3xl', sm: '4xl' }}
            lineHeight="shorter"
            fontWeight="extrabold"
            letterSpacing="tight"
            color={useColorModeValue('gray.900', 'gray.100')}
          >
            Pricing
          </chakra.p>
          <chakra.p
            mt={4}
            maxW="2xl"
            fontSize="lg"
            mx={{ lg: 'auto' }}
            color={useColorModeValue('gray.500', 'gray.400')}
          >
            No credit card required!
          </chakra.p>
        </Box>

        <Flex justifyContent="center">
          <MotionBox
            maxW="430px"
            w="full"
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow={useColorModeValue(
              '0 25px 60px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.06)',
              '0 25px 60px rgba(0, 0, 0, 0.3), 0 8px 20px rgba(0, 0, 0, 0.2)'
            )}
            rounded="2xl"
            overflow="hidden"
            border="1px solid"
            borderColor={useColorModeValue('gray.100', 'gray.700')}
            position="relative"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{
              y: -4,
              transition: { duration: 0.2 },
            }}
          >
            {/* Recommended gradient top bar */}
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              h="3px"
              bgGradient="linear(to-r, teal.400, green.400)"
            />

            <Stack
              textAlign="center"
              p={8}
              color={useColorModeValue('gray.800', 'white')}
              align="center"
              gap={2}
            >
              <Text
                fontSize="sm"
                fontWeight={600}
                bg={useColorModeValue('teal.50', 'teal.900')}
                p={2}
                px={4}
                color="teal.600"
                rounded="full"
                letterSpacing="wide"
              >
                ALL FEATURES
              </Text>
              <Stack direction="row" align="center" justify="center" mt={2}>
                <Text
                  fontSize="2xl"
                  mb={0}
                  color={useColorModeValue('gray.500', 'gray.400')}
                >
                  $
                </Text>
                <Text
                  fontSize="8xl"
                  mt={0}
                  fontWeight={800}
                  lineHeight="none"
                  color={useColorModeValue('gray.900', 'gray.100')}
                >
                  0
                </Text>
              </Stack>
              <Text
                color={useColorModeValue('gray.500', 'gray.400')}
                fontSize="sm"
              >
                Free. However, we do appreciate{' '}
                <Link
                  color="teal.500"
                  href={DONATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  _hover={{ textDecoration: 'underline' }}
                >
                  donations <Icon as={LuExternalLink} mx="1px" />
                </Link>
                .
              </Text>
            </Stack>

            <Box
              bg={useColorModeValue('gray.50', 'gray.900')}
              px={8}
              py={10}
            >
              <ListRoot gap={4}>
                {[
                  'Unlimited projects',
                  'Unlimited domains',
                  'Unlimited feedback submissions',
                  'Support via Github Issues',
                  'All features',
                ].map((item) => (
                  <ListItem
                    key={item}
                    display="flex"
                    alignItems="center"
                    fontSize="sm"
                  >
                    <Flex
                      alignItems="center"
                      justifyContent="center"
                      w={5}
                      h={5}
                      mr={3}
                      rounded="full"
                      bg={useColorModeValue('teal.50', 'teal.900')}
                      color="teal.500"
                      flexShrink={0}
                    >
                      <Icon as={LuCheck} boxSize={3} />
                    </Flex>
                    {item}
                  </ListItem>
                ))}
              </ListRoot>

              <Link href="/dashboard" variant="plain">
                <Button
                  mt={8}
                  w="full"
                  colorPalette="teal"
                  color="white"
                  rounded="xl"
                  size="lg"
                  fontWeight="600"
                  boxShadow="0 0 20px rgba(56, 178, 172, 0.25)"
                  _hover={{
                    boxShadow: '0 0 30px rgba(56, 178, 172, 0.4)',
                    transform: 'translateY(-2px)',
                  }}
                  transition="all 0.2s"
                >
                  Get started
                </Button>
              </Link>
            </Box>
          </MotionBox>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Pricing;
