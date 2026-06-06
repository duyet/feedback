import { Box, Spinner } from '@chakra-ui/react';

export const Loading = () => (
  <Box textAlign="center" p={5}>
    <Spinner
      color="blue.500"
      size="xl"
    />
  </Box>
);

export default Loading;
