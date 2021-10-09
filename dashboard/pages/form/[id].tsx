import useSWR from 'swr';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  Flex,
  Heading,
  Alert,
  AlertIcon,
  Box,
  RadioGroup,
  Stack,
  Radio,
} from '@chakra-ui/react';

import fetcher from '../../lib/fetcher';
import FormLayout from '../../components/form/layout';
import Loading from '../../components/common/loading';

const API_FORM = '/api/form';
const PAGE_TITLE = 'The Form';

const TheFormResponse: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(`${API_FORM}/${id}`, fetcher);

  if (error) {
    return (
      <FormLayout>
        <Alert status="error">
          <AlertIcon />
          Cannot load the data!
        </Alert>
      </FormLayout>
    );
  }

  if (!data) {
    return (
      <FormLayout>
        <Loading />
      </FormLayout>
    );
  }

  if (data.err) {
    return (
      <FormLayout>
        <Alert status="error">
          <AlertIcon />
          {data.err}
        </Alert>
      </FormLayout>
    );
  }

  return (
    <FormLayout title={data.title || PAGE_TITLE} maxW="container.lg">
      <Flex mb={10} justifyContent="space-between">
        <Box>{data.content}</Box>
      </Flex>
      <Flex>
        <RadioGroup defaultValue="1">
          <Stack>
            {data.choices.map((choice: string) => {
              return (
                <Radio key={choice} value={choice}>
                  {choice}
                </Radio>
              );
            })}
          </Stack>
        </RadioGroup>
      </Flex>
    </FormLayout>
  );
};

export default TheFormResponse;
