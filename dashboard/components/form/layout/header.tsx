import React from 'react';
import {
  Box,
  Flex,
  HStack,
  Container,
  useColorModeValue,
} from '@chakra-ui/react';

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Container maxW="container.lg">
        <Flex
          h={16}
          w={'100%'}
          maxW={'1000px'}
          alignItems={'center'}
          justifyContent={'space-around'}
        >
          <HStack spacing={8} alignItems={'center'}>
            <Box fontWeight="700" textAlign="center">
              {title}
            </Box>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
