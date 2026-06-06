import React from 'react';
import {
  chakra,
  Box,
  Button,
  Stack,
  Image,
  Text,
  Link,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useColorModeValue } from '../ui/color-mode';

const MotionBox = motion.create(Box);
const MotionStack = motion.create(Stack);

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const imageVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number], delay: 0.5 },
  },
};

export const Heros: React.FC = () => {
  const gradientStart = useColorModeValue('#f0fff4', '#1a202c');
  const gradientMid = useColorModeValue('#ebf8ff', '#171923');
  const gradientEnd = useColorModeValue('#faf5ff', '#1a1a2e');

  return (
    <Box
      position="relative"
      overflow="hidden"
      pt={{ base: 12, md: 20 }}
      pb={{ base: 8, md: 12 }}
    >
      {/* Background gradient */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgGradient={`linear(to-br, ${gradientStart}, ${gradientMid}, ${gradientEnd})`}
        zIndex={0}
      />

      {/* Subtle dot pattern overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={useColorModeValue(0.4, 0.15)}
        backgroundImage="radial-gradient(circle, currentColor 1px, transparent 1px)"
        backgroundSize="24px 24px"
        color={useColorModeValue('gray.300', 'gray.600')}
        zIndex={0}
      />

      {/* Decorative blurred circles */}
      <MotionBox
        position="absolute"
        top="-10%"
        right="-5%"
        w={{ base: '300px', md: '500px' }}
        h={{ base: '300px', md: '500px' }}
        borderRadius="full"
        bg={useColorModeValue('teal.200', 'teal.700')}
        opacity={useColorModeValue(0.15, 0.1)}
        filter="blur(80px)"
        zIndex={0}
        animate={{
          scale: [1, 1.05, 1],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <MotionBox
        position="absolute"
        bottom="5%"
        left="-8%"
        w={{ base: '250px', md: '400px' }}
        h={{ base: '250px', md: '400px' }}
        borderRadius="full"
        bg={useColorModeValue('purple.200', 'purple.800')}
        opacity={useColorModeValue(0.12, 0.08)}
        filter="blur(80px)"
        zIndex={0}
        animate={{
          scale: [1, 1.08, 1],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <Box px={8} mx="auto" position="relative" zIndex={1}>
        <Box
          w={{ base: 'full', md: 11 / 12, xl: 9 / 12 }}
          mx="auto"
          textAlign={{ base: 'left', md: 'center' }}
        >
          <MotionBox
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <chakra.h1
              mb={8}
              fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }}
              fontWeight="bold"
              lineHeight={{ base: 'shorter', md: 'none' }}
              letterSpacing={{ base: 'normal', md: 'tight' }}
              color={useColorModeValue('gray.900', 'gray.100')}
            >
              All your{' '}
              <Text
                as="span"
                display={{ base: 'block', lg: 'inline' }}
                w="full"
                bgClip="text"
                bgGradient="linear(to-r, teal.400, green.400, purple.500)"
                fontWeight="extrabold"
              >
                customer feedback
              </Text>{' '}
              in one single place.
            </chakra.h1>
          </MotionBox>

          <MotionBox
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <chakra.p
              px={{ base: 0, lg: 24 }}
              mb={10}
              fontSize={{ base: 'lg', md: 'xl' }}
              lineHeight="tall"
              maxW="3xl"
              mx={{ base: 'none', md: 'auto' }}
              color={useColorModeValue('gray.600', 'gray.300')}
            >
              Feedback allows your users to raise issues, ideas and compliments with
              a simple widget. Learn how to add feedback plugin to your project or
              dive deep with the dashboard to see the feedback.
            </chakra.p>
          </MotionBox>

          <MotionStack
            direction={{ base: 'column', sm: 'row' }}
            mb={{ base: 4, md: 8 }}
            gap={3}
            justifyContent={{ sm: 'left', md: 'center' }}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <Link href="/dashboard" variant="plain">
              <Button
                variant="solid"
                colorPalette="teal"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                w={{ base: 'full', sm: 'auto' }}
                mb={{ base: 2, sm: 0 }}
                size="lg"
                cursor="pointer"
                boxShadow="0 0 20px rgba(56, 178, 172, 0.3)"
                _hover={{
                  boxShadow: '0 0 30px rgba(56, 178, 172, 0.45)',
                  transform: 'translateY(-2px)',
                }}
                transition="all 0.2s"
              >
                Dashboard
              </Button>
            </Link>
            <Link href="/docs" variant="plain">
              <Button
                colorPalette="gray"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                w={{ base: 'full', sm: 'auto' }}
                mb={{ base: 2, sm: 0 }}
                size="lg"
                cursor="pointer"
                borderWidth="1px"
                borderColor={useColorModeValue('gray.200', 'gray.600')}
                _hover={{
                  transform: 'translateY(-2px)',
                }}
                transition="all 0.2s"
              >
                Documentation
              </Button>
            </Link>
          </MotionStack>
        </Box>

        <MotionBox
          w={{ base: 'full', md: 10 / 12 }}
          mx="auto"
          mt={{ base: 12, md: 20 }}
          textAlign="center"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <Box
            position="relative"
            _after={{
              content: '""',
              position: 'absolute',
              bottom: '-20px',
              left: '10%',
              right: '10%',
              height: '40px',
              bg: useColorModeValue('teal.300', 'teal.600'),
              opacity: 0.2,
              filter: 'blur(20px)',
              borderRadius: 'full',
              zIndex: 0,
            }}
          >
            <Image
              w="full"
              rounded="xl"
              src="/landing.png"
              alt="Feedback platform dashboard screenshot showing project overview and feedback management interface"
              boxShadow={useColorModeValue(
                '0 20px 60px rgba(0, 0, 0, 0.12), 0 8px 20px rgba(0, 0, 0, 0.08)',
                '0 20px 60px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.3)'
              )}
              border="1px solid"
              borderColor={useColorModeValue('gray.200', 'gray.700')}
              position="relative"
              zIndex={1}
            />
          </Box>
        </MotionBox>
      </Box>
    </Box>
  );
};

export default Heros;
