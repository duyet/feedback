import React from "react";
import { Box, Link, Text } from "@chakra-ui/react";

export type MetaProps = {
  name: string;
  value: string;
  isLink?: boolean;
};

export const Meta: React.FC<MetaProps> = ({ name, value, isLink }) => {
  if (!value) return null;

  return (
    <Box>
      <Text fontSize="sm">
        {name}{" "}
        {!!isLink ? (
          <Link color="teal.500" href={value} isExternal={true}>
            {value}
          </Link>
        ) : (
          <Text color="teal.500">{value}</Text>
        )}
      </Text>
    </Box>
  );
};
