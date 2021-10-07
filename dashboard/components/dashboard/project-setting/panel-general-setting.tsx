import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';

import Error from '../../common/error';
import DomainList from './domain-list';
import useSWR, { useSWRConfig } from 'swr';
import fetcher from '../../../lib/fetcher';
import Loading from '../../common/loading';

export type Props = {
  projectId: string;
};

export const GeneralSetting: React.FC<Props> = ({ projectId }) => {
  const [name, setProjectName] = useState<string>();
  const [domains, setDomains] = useState<string[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const toast = useToast();
  const { mutate } = useSWRConfig();

  // Fetch project settings
  const url = `/api/project/${projectId}`;
  const { data, error } = useSWR(url, fetcher);

  const onChangeProjectName = (e: React.FormEvent<HTMLInputElement>) => {
    setProjectName(e.currentTarget.value);
  };

  const onChangeDomains = (domains: string[]) => {
    setDomains(domains);
  };

  const handleSaveSetting = async () => {
    const data = {
      ...{ name },
      ...{ domains },
    };

    try {
      setLoading(true);
      const res = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res?.ok) {
        throw json.err || res?.statusText || 'Something went wrong';
      }

      // Tell SWRs with these key to revalidate
      mutate(url);
      mutate('/api/project');
      mutate(`/api/domain?projectId=${projectId}`);

      return toast({
        description: 'Successfully',
        status: 'success',
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      return toast({
        title: 'Error',
        description: `${err}`,
        status: 'error',
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  if (error) return <Error />;
  if (!data) return <Loading />;

  return (
    <>
      <FormControl id="projectId" mb={5}>
        <FormLabel>Project ID</FormLabel>
        <Input
          type="text"
          defaultValue={data.id}
          disabled
          variant="filled"
          cursor="pointer"
        />
      </FormControl>

      <FormControl id="name" mb={5}>
        <FormLabel>Project Name</FormLabel>
        <Input
          type="text"
          defaultValue={data.name}
          onChange={onChangeProjectName}
        />
      </FormControl>

      <FormControl id="name" mb={5}>
        <FormLabel>Domain</FormLabel>
        <DomainList defaultValue={data.domains} onChange={onChangeDomains} />
      </FormControl>

      <FormControl textAlign="right">
        <Button
          colorScheme="messenger"
          onClick={handleSaveSetting}
          disabled={isLoading}
        >
          Save Settings
        </Button>
      </FormControl>
    </>
  );
};

export default GeneralSetting;
