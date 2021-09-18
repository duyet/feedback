import React, { useState } from 'react';
import {
  Text,
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  ModalBody,
  ModalFooter,
  useToast,
} from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

import useSWR, { useSWRConfig } from 'swr';
import fetcher from '../../../lib/fetcher';
import Loading from '../../common/loading';
import DomainList from './domain-list';
import { UserList } from './user-list';

export type Props = {
  projectId: string;
};

export const ProjectSettingPanel: React.FC<Props> = ({ projectId }) => {
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

  const handleSaveSettingGeneral = async () => {
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
        throw Error(json.err || res?.statusText || 'Something went wrong');
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

  if (error)
    return (
      <Alert status="error">
        <AlertIcon /> There was an error.
      </Alert>
    );

  if (!data)
    return (
      <ModalBody>
        <Loading />
      </ModalBody>
    );

  return (
    <>
      <ModalBody>
        <Heading size="md" mb={5} mt={5}>
          Project Settings
        </Heading>

        <Tabs>
          <TabList>
            <Tab>General</Tab>
            <Tab>Team</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
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
                <DomainList
                  defaultValue={data.domains}
                  onChange={onChangeDomains}
                />
              </FormControl>

              <FormControl textAlign="right">
                <Button
                  colorScheme="messenger"
                  onClick={handleSaveSettingGeneral}
                  disabled={isLoading}
                >
                  Save Settings
                </Button>
              </FormControl>
            </TabPanel>

            <TabPanel>
              <Text fontWeight={700}>Team</Text>
              <Text color="gray" mb={5}>
                Add or remove users that have access to this project! The user
                should login once before they can be added.
              </Text>
              <FormControl id="email" mb={5}>
                <UserList defaultValue={data.users} projectId={projectId} />
              </FormControl>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ModalBody>
      <ModalFooter></ModalFooter>
    </>
  );
};

export default ProjectSettingPanel;
