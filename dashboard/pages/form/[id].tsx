import useSWR from 'swr';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  Flex,
  Heading,
  AlertRoot,
  AlertIndicator,
  Box,
  RadioGroupRoot,
  RadioGroupItem,
  RadioGroupItemText,
  RadioGroupItemControl,
  Stack,
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
        <AlertRoot status="error">
          <AlertIndicator />
          Cannot load the data!
        </AlertRoot>
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
        <AlertRoot status="error">
          <AlertIndicator />
          {data.err}
        </AlertRoot>
      </FormLayout>
    );
  }

  return (
    <FormLayout title={data.title || PAGE_TITLE} maxW="container.lg">
      <Flex mb={10} justifyContent="space-between">
        <Box>{data.content}</Box>
      </Flex>
      <Flex>
        <RadioGroupRoot name="form-choices" defaultValue="1">
          <Stack gap={2}>
            {data.choices.map((choice: string) => {
              return (
                <RadioGroupItem key={choice} value={choice}>
                  <RadioGroupItemControl />
                  <RadioGroupItemText>{choice}</RadioGroupItemText>
                </RadioGroupItem>
              );
            })}
          </Stack>
        </RadioGroupRoot>
      </Flex>
    </FormLayout>
  );
};

export default TheFormResponse;
