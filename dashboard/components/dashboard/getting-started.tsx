import React from 'react';

import {
  chakra,
  Box,
  Button,
  VStack,
  Text,
  Grid,
  GridItem,
  useColorModeValue,
} from '@chakra-ui/react';

import CodeHighLight from '../common/code-highlight';
import { ExternalLinkIcon } from '@chakra-ui/icons';

export type GettingStartedProps = {
  projectId?: string;
};

export const GettingStarted: React.FC<GettingStartedProps> = ({
  projectId,
}) => {
  const codeString = String.raw`
import { Feedback } from '@okie/feedback';

const App = () => {
  return (
      <Feedback
        user={currentUser.email} 
        project="${projectId || '...'}" />
  );
}
  `.trim();

  return (
    <Box
      shadow="xl"
      bg={useColorModeValue('white', 'gray.800')}
      p={8}
      borderRadius={5}
      mx="auto"
    >
      <Grid
        alignItems="center"
        templateColumns="repeat(5, 1fr)"
      >
        <GridItem colSpan={2}>
          <Box>
            <chakra.h2
              mb={3}
              fontSize={{ base: '3xl', md: '4xl' }}
              fontWeight="extrabold"
              textAlign={{ base: 'center', sm: 'left' }}
              color={useColorModeValue('black', 'black')}
              lineHeight="shorter"
              letterSpacing="tight"
            >
              Get started
            </chakra.h2>
            <chakra.p
              mb={6}
              fontSize={{ base: 'lg', md: 'xl' }}
              textAlign={{ base: 'center', sm: 'left' }}
              color={useColorModeValue('gray.600', 'gray.500')}
            >
              Integrate the widget into your website to start collecting
              customer feedback.
            </chakra.p>
            <Button
              as="a"
              variant="solid"
              w={{ base: 'full', sm: 'auto' }}
              href="/docs"
              target="_blank"
            >
              <Text mr={1}>Documentation</Text>
              <ExternalLinkIcon />
            </Button>
          </Box>
        </GridItem>
        <GridItem colSpan={3}>
          <VStack
            direction="column"
            flexGrow={1}
            spacing={5}
            alignItems="start"
          >
            <CodeHighLight
              style={{ width: '100%' }}
              codeString={codeString}
              language="tsx"
              showLines={true}
            />
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default GettingStarted;
