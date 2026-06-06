import useSWR from 'swr';
import type { NextPage } from 'next';
import { Flex, Heading, AlertRoot, AlertIndicator } from '@chakra-ui/react';

import fetcher from '../../lib/fetcher';
import Layout from '../../components/layout';
import Loading from '../../components/common/loading';
import { FormList } from '../../components/form/form-list';

const API_FORM = '/api/form';
const PAGE_TITLE = 'The Form';

const TheForm: NextPage = () => {
  const { data: forms, error: errForm } = useSWR(API_FORM, fetcher);

  if (errForm) {
    return (
      <Layout>
        <AlertRoot status="error">
          <AlertIndicator />
          Cannot load the list of forms!
        </AlertRoot>
      </Layout>
    );
  }

  if (!forms) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  if (!forms?.length) {
    return <Layout>Add new</Layout>;
  }

  return (
    <Layout title={PAGE_TITLE} maxW="container.lg">
      <Flex mb={10} justifyContent="space-between">
        <Heading mr={5}>The Form</Heading>
      </Flex>
      <Flex>
        <FormList forms={forms} />
      </Flex>
    </Layout>
  );
};

export default TheForm;
