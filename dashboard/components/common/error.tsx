import { AlertRoot, AlertIndicator } from '@chakra-ui/react';

export const Error = ({ msg = 'Something went wrong' }: { msg?: string }) => (
  <AlertRoot status="error">
    <AlertIndicator /> {msg}
  </AlertRoot>
);

export default Error;
