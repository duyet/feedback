import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  ModalBody,
  ModalFooter,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import useSWR, { useSWRConfig } from "swr";
import fetcher from "../../lib/fetcher";
import Loading from "../common/loading";

export type Props = {
  projectId: string;
};

export const ProjectSettingPanel: React.FC<Props> = ({ projectId }) => {
  const [name, setProjectName] = useState<string>();
  const toast = useToast();
  const { mutate } = useSWRConfig();

  const url = `/api/project/${projectId}`;
  const { data, error } = useSWR(url, fetcher);

  const onChangeProjectName = (e: React.FormEvent<HTMLInputElement>) => {
    setProjectName(e.currentTarget.value);
  };

  const handleSaveSettingGeneral = async () => {
    const data = {
      name,
    };

    try {
      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res?.ok) {
        throw Error(res?.statusText || "Something went wrong");
      }

      // Tell SWRs with these key to revalidate
      mutate(url);
      mutate("/api/project");

      return toast({
        description: "Successfully",
        status: "success",
        isClosable: true,
      });
    } catch (err) {
      return toast({
        title: "Error",
        description: err,
        status: "error",
        isClosable: true,
      });
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
        <Heading size="lg" mb={5}>
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

              <FormControl textAlign="right">
                <Button
                  colorScheme="messenger"
                  onClick={handleSaveSettingGeneral}
                >
                  Save Settings
                </Button>
              </FormControl>
            </TabPanel>

            <TabPanel>TODO</TabPanel>
          </TabPanels>
        </Tabs>
      </ModalBody>
      <ModalFooter></ModalFooter>
    </>
  );
};

export default ProjectSettingPanel;
