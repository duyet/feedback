import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Text,
} from '@chakra-ui/react';

import Loading from '../common/loading';

export const InitProject: React.FC = () => {
  const router = useRouter();
  const [creating, setCreating] = useState<boolean>(false);

  useEffect(() => {
    async function initProject() {
      if (!router.query.project) {
        setCreating(true);
        const res = await fetch('/api/project/create');
        const json = await res.json();
        router.push(`/dashboard?project=${json.projectId}`);
        setCreating(false);
      }
    }

    initProject();
  }, [router]);

  if (creating) {
    return (
      <Box mb={10} mt={10} textAlign="center">
        <Loading />
        <Text>Initial ...</Text>
      </Box>
    );
  }

  return (
    <Alert
      status="success"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        You're all set!
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        Please reload this page to see your project!
      </AlertDescription>
    </Alert>
  );
};

export default InitProject;
