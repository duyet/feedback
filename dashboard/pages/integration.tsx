import React from 'react';
import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Select,
  Text,
  Stack,
  Checkbox,
  Input,
  Button,
} from '@chakra-ui/react';

import Layout from '../components/layout';

type Props = {
  domains: string[];
};

const Page: NextPage<Props> = ({ domains }) => {
  return (
    <Layout>
      <Heading mb={5}>Integration</Heading>
      <Box mb={5}>
        <Heading size="sm">Notification</Heading>
        <Text>Please assign the notification to domains to get it.</Text>
      </Box>
      <Box>
        <FormControl mb={5}>
          <FormLabel>Domain</FormLabel>
          <Stack>
            {domains &&
              domains.map((domain: string) => (
                <Checkbox key={domain}>{domain}</Checkbox>
              ))}
          </Stack>
        </FormControl>
        <FormControl mb={5}>
          <FormLabel>Provider</FormLabel>
          <Select>
            <option selected>Slack</option>
          </Select>
        </FormControl>
        <FormControl mb={5}>
          <FormLabel>Slack Webhook</FormLabel>
          <Input />
        </FormControl>
        <FormControl mb={5}>
          <FormLabel>Slack Channel</FormLabel>
          <Input />
        </FormControl>
        <FormControl mb={5}>
          <FormLabel>Slack Name</FormLabel>
          <Input />
        </FormControl>
        <FormControl mb={5}>
          <FormLabel>Slack Icon</FormLabel>
          <Input />
        </FormControl>
        <FormControl mb={5}>
          <Button>Submit</Button>
        </FormControl>
      </Box>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: { domains: [] },
  };
};
export default Page;
