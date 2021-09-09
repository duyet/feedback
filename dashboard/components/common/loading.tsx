import { Box, Spinner } from '@chakra-ui/react';

export const Loading = () => (
  <Box textAlign="center" p={5}>
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
  </Box>
);

export default Loading;
