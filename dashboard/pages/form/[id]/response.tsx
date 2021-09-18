
import useSWR from 'swr';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Flex, Heading, Alert, AlertIcon, Box } from '@chakra-ui/react';

import fetcher from '../../../lib/fetcher';
import Layout from '../../../components/layout';
import Loading from '../../../components/common/loading';
import ResponseList from '../../../components/form/response-list';

const API_FORM = '/api/form';
const PAGE_TITLE = 'The Form';

const TheFormResponse: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { data, error} = useSWR(`${API_FORM}/${id}`, fetcher);

  if (error) {
    return (
      <Layout>
        <Alert status="error">
          <AlertIcon />
          Cannot load the data!
        </Alert>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout title={PAGE_TITLE} maxW="container.lg">
      <Flex mb={10} justifyContent="space-between">
        <Heading mr={5}>{data.title}</Heading>
      </Flex>
      <Flex mb={10} justifyContent="space-between">
        <Box>{data.content}</Box>
      </Flex>
      <Flex>
        <ResponseList responses={data.responses} />
      </Flex>
    </Layout>
  );
};

export default TheFormResponse;
