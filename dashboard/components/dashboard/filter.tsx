import React from 'react';
import {
  Box,
  Heading,
  List,
  ListItem,
  Text,
  Flex,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react';

import { DomainPopulated } from '../../types/prisma';

export type FilterProps = {
  domains: DomainPopulated[];
  selected?: string;
  onSelected: (domain: string) => void;
};

export const Filter: React.FC<FilterProps> = ({
  domains,
  selected,
  onSelected,
}) => {
  if (!domains?.length) {
    return (
      <Alert status="success">
        <AlertIcon />{' '}
        <AlertDescription>
          Add your domains to this project via the project setting.
        </AlertDescription>
      </Alert>
    );
  }

  const current = selected || domains[0].domain;

  return (
    <Box>
      <Heading size="sm" color="gray.600" mb={5}>
        Domains
      </Heading>
      <List>
        {domains.map((obj: DomainPopulated) => {
          const { domain } = obj;
          const isSelected = current === domain;
          const count = obj?._count?.feedbacks || 0;

          return (
            <ListItem
              key={domain}
              padding={2}
              fontWeight={isSelected ? 700 : 300}
              borderRadius={5}
              bg={isSelected ? '#ebf8ff' : ''}
              color={isSelected ? '#4187ff' : ''}
              cursor="pointer"
              overflow="hidden"
              mb={3}
              onClick={() => onSelected(domain)}
            >
              <Flex justifyContent="space-between">
                <Text whiteSpace="nowrap">{domain}</Text>
                <Text>{count > -1 ? count : null}</Text>
              </Flex>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default Filter;
