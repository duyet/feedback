import React from 'react';
import Link from 'next/link';
import { Box, Heading, Image, SimpleGrid, Text } from '@chakra-ui/react';

import NewProjectForm from './new-project';

export const InitProject: React.FC = () => {
  return (
    <SimpleGrid columns={2} boxShadow="" borderRadius={10}>
      <Box m={20}>
        <NewProjectForm />
      </Box>
      <Box>
        <Heading size="lg" m={5} textAlign="center">
          Getting Started
        </Heading>
        <Text color="gray" mb={5}>
          Create your first project by enter your domain in the{' '}
          <Text as="span" fontWeight={700}>
            Domain Name
          </Text>{' '}
          field. Refer to <Link href="/docs">the document</Link> if you have any
          concerns.
        </Text>
        <Image src="https://source.unsplash.com/daily" alt="" />
      </Box>
    </SimpleGrid>
  );
};

export default InitProject;
