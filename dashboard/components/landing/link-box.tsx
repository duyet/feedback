import React from 'react';
import { Box, Heading, Link, Text } from '@chakra-ui/react';

export type LinkBoxProps = {
  href: string;
  text: string;
  desc: string;
};

const LinkBox: React.FC<LinkBoxProps> = ({ href, text, desc }) => (
  <Link href={href} textDecoration="none">
    <Box
      border={'1px solid #eaeaea'}
      p={5}
      m="1rem"
      borderRadius={5}
      cursor="pointer"
      _hover={{ borderColor: '#0070f3', color: '#0070f3' }}
    >
      <Heading size="md">{text}</Heading>
      <Text>{desc}</Text>
    </Box>
  </Link>
);

export default LinkBox;
