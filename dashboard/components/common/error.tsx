import { Alert, AlertIcon } from '@chakra-ui/react';

export const Error = ({ msg = 'Something went wrong' }: { msg?: string }) => (
  <Alert status="error">
    <AlertIcon /> {msg}
  </Alert>
);

export default Error;
