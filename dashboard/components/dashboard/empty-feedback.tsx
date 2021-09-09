import { Flex, Image, Text } from '@chakra-ui/react';

export const EmptyFeedback = () => {
  return (
    <Flex textAlign="center" p={20} flexDirection="column" justifyItems="center">
      <Image src="/empty.svg" width="50%" alt="" />
      <Text mt={5} color="gray">Your customer feedbacks will be here ...</Text>
    </Flex>
  );
};

export default EmptyFeedback;
