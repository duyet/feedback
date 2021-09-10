import React, { useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';

import fetcher from '../../../lib/fetcher';
import Loading from '../../common/loading';

export type CreateProjectState = 'init' | 'creating' | 'success' | 'error';

export type NewProjectFormProps = {
  onSuccess?: (projectId: string) => void;
};

export const NewProjectForm: React.FC<NewProjectFormProps> = ({
  onSuccess,
}) => {
  const { mutate } = useSWRConfig();
  const toast = useToast();

  const [state, setState] = useState<CreateProjectState>('init');

  const [projectName, setProjectName] = useState<string>();
  const [domain, setDomain] = useState<string>();

  const { data: suggestedName } = useSWR('/api/project/generate-name', fetcher);

  if (suggestedName && !projectName) {
    setProjectName(suggestedName.name);
  }

  const handleChangeProjectName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.currentTarget.value);
  };

  const handleChangeDomain = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDomain(e.currentTarget.value);
  };

  const handleSubmit = async () => {
    setState('creating');

    try {
      const res = await fetch(
        `/api/project/create?name=${projectName}&domain=${domain || ''}`
      );
      const json = await res.json();

      if (!res.ok) {
        throw Error(json.err || 'Something went wrong');
      }

      setState('success');

      // tell SWRs with this key to revalidate
      mutate('/api/project');

      // Toast message
      toast({
        status: 'success',
        description: `🤘 Successfully`,
        isClosable: true,
      });

      if (onSuccess) onSuccess(json.projectId);
    } catch (err) {
      setState('error');
      toast({
        status: 'error',
        description: `${err}`,
        isClosable: true,
      });
    }
  };

  if (state === 'creating') {
    return (
      <Box mb={10} mt={10} textAlign="center">
        <Loading />
        <Text>Initial ...</Text>
      </Box>
    );
  }

  if (state === 'success') {
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
          You&apos;re all set!
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          Please reload this page to see your project!
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl mb={5}>
        <FormLabel>Project Name</FormLabel>
        <Input
          defaultValue={suggestedName?.name}
          value={projectName}
          onChange={handleChangeProjectName}
        />
      </FormControl>
      <FormControl mb={5}>
        <FormLabel>Domain Name</FormLabel>
        <Input
          placeholder="Domain Name"
          value={domain}
          onChange={handleChangeDomain}
        />
      </FormControl>
      <FormControl>
        <Button type="submit" w="100%" colorScheme="telegram">
          Submit
        </Button>
      </FormControl>
    </form>
  );
};

export default NewProjectForm;
