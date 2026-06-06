import {
  Box,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useColorModeValue } from '../ui/color-mode';
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Stack
        maxW={'6xl'}
        mx="auto"
        py={4}
        px={4}
        direction={{ base: 'column', md: 'row' }}
        gap={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text>© 2021 Feedback. All rights reserved</Text>
      </Stack>
    </Box>
  );
};

export default Footer;
