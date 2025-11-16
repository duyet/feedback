import { Flex, Image, Text } from '@chakra-ui/react';

export const EmptyFeedback = () => {
  return (
    <Flex textAlign="center" p={20} flexDirection="column">
      <Flex justifyContent="center">
      <Image src="/empty.svg" width="50%" alt="Empty state illustration - no feedback available yet" />
      </Flex>
      <Text mt={5} color="gray">Can&apos;t wait to see the feedback goes here</Text>
    </Flex>
  );
};

export default EmptyFeedback;
