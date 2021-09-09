import React from 'react';
import { Box, SimpleGrid, SimpleGridProps, Text } from '@chakra-ui/react';

export type Props = SimpleGridProps & {
  metadata: Record<string, string>;
};

export const Metadata: React.FC<Props> = ({ metadata, ...props }) => {
  if (!metadata) return null;

  return (
    <SimpleGrid columns={3} {...props}>
      {Object.keys(metadata).map((key: string) => {
        const value = metadata[key];

        return (
          <Box mb={5} fontSize="0.9em" opacity={0.8} key={key}>
            <Text color="gray">{key}</Text>{' '}
            <Text fontWeight={700}>{value}</Text>
          </Box>
        );
      })}
    </SimpleGrid>
  );
};

export default Metadata;
