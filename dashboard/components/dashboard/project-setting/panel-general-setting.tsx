import React, { useState } from 'react';
import {
  Button,
  FieldRoot,
  FieldLabel,
  Input,
} from '@chakra-ui/react';

import { toaster } from '../../../hooks/useToast';
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

      return toaster.create({
        description: 'Successfully',
        type: 'success',
      });
    } catch (err) {
      return toaster.create({
        title: 'Error',
        description: `${err}`,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  if (error) return <Error />;
  if (!data) return <Loading />;

  return (
    <>
      <FieldRoot id="projectId" mb={5}>
        <FieldLabel>Project ID</FieldLabel>
        <Input
          type="text"
          defaultValue={data.id}
          disabled
          variant="subtle"
          cursor="pointer"
        />
      </FieldRoot>

      <FieldRoot id="name" mb={5}>
        <FieldLabel>Project Name</FieldLabel>
        <Input
          type="text"
          defaultValue={data.name}
          onChange={onChangeProjectName}
        />
      </FieldRoot>

      <FieldRoot id="name" mb={5}>
        <FieldLabel>Domain</FieldLabel>
        <DomainList defaultValue={data.domains} onChange={onChangeDomains} />
      </FieldRoot>

      <FieldRoot textAlign="right">
        <Button
          colorPalette="messenger"
          onClick={handleSaveSetting}
          disabled={isLoading}
        >
          Save Settings
        </Button>
      </FieldRoot>
    </>
  );
};

export default GeneralSetting;
