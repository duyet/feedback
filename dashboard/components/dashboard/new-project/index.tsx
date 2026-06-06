import React, { useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';

import {
  AlertRoot,
  AlertIndicator,
  AlertTitle,
  AlertDescription,
  FieldRoot,
  FieldLabel,
  Box,
  Button,
  Input,
  Text,
} from '@chakra-ui/react';
import { toaster } from '../../../hooks/useToast';

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
      toaster.create({
        type: 'success',
        description: `🤘 Successfully`,
      });

      if (onSuccess) onSuccess(json.projectId);
    } catch (err) {
      setState('error');
      toaster.create({
        type: 'error',
        description: `${err}`,
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
      <AlertRoot
        status="success"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        <AlertIndicator boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          You&apos;re all set!
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          Please reload this page to see your project!
        </AlertDescription>
      </AlertRoot>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldRoot mb={5}>
        <FieldLabel>Project Name</FieldLabel>
        <Input
          defaultValue={suggestedName?.name}
          value={projectName}
          onChange={handleChangeProjectName}
        />
      </FieldRoot>
      <FieldRoot mb={5}>
        <FieldLabel>Domain Name</FieldLabel>
        <Input
          placeholder="Domain Name"
          value={domain}
          onChange={handleChangeDomain}
        />
      </FieldRoot>
      <FieldRoot>
        <Button type="submit" w="100%" colorScheme="telegram">
          Submit
        </Button>
      </FieldRoot>
    </form>
  );
};

export default NewProjectForm;
