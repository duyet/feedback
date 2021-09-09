import React from 'react';
import { Box, BoxProps, Link, Text } from '@chakra-ui/react';

export type MetaProps = BoxProps & {
  name: string;
  value?: string;
  isLink?: boolean;
};

export const Meta: React.FC<MetaProps> = ({
  name,
  value,
  isLink,
  ...props
}) => {
  if (!value) return null;

  return (
    <Box {...props}>
      <Text fontSize="sm">
        {name}{' '}
        {!!isLink ? (
          <Link color="blue.500" fontWeight={500} href={value} isExternal={true}>
            {value}
          </Link>
        ) : (
          <Text color="blue">{value}</Text>
        )}
      </Text>
    </Box>
  );
};
