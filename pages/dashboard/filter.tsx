import {
  Box,
  Heading,
  List,
  ListItem,
  Text,
  Tag,
  Flex,
} from "@chakra-ui/react";

import { FilterProps } from "./types";

export const Filter: React.FC<FilterProps> = ({
  domains,
  feedbacks,
  selected,
  onSelected,
}) => {
  const current = selected || domains[0];

  return (
    <Box>
      <Heading size="sm" color="gray.600" mb={5}>
        Domains
      </Heading>
      <List>
        {domains.map((domain: string) => {
          const isSelected = current === domain;
          const count = feedbacks?.[domain]?.length;

          return (
            <ListItem
              key={domain}
              padding={2}
              fontWeight={isSelected ? 700 : 300}
              borderRadius={5}
              bg={isSelected ? "#ebf8ff" : ""}
              color={isSelected ? "#4187ff" : ""}
              cursor="pointer"
              overflow="hidden"
              mb={3}
              onClick={() => onSelected(domain)}
            >
              <Flex justifyContent="space-between">
                <Text whiteSpace="nowrap">{domain}</Text>
                <Tag>{count}</Tag>
              </Flex>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default Filter;
