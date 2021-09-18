import useSWR, { useSWRConfig } from 'swr';
import React, { useState } from 'react';
import {
  Text,
  Button,
  Input,
  FormControl,
  Switch,
  FormLabel,
  useToast,
} from '@chakra-ui/react';

import fetcher from '../../../lib/fetcher';
import Loading from '../../common/loading';
import Error from '../../common/error';

export type Props = {
  projectId: string;
};

const slackSettingStyle = {
  background: '#f8fcff',
  p: 5,
};

export const IntegrationPanel: React.FC<Props> = ({ projectId }) => {
  const url = `/api/project/${projectId}`;
  const { data, error } = useSWR(url, fetcher);

  const toast = useToast();
  const { mutate } = useSWRConfig();
  const [slackEnabled, setSlackEnabled] = useState<boolean>(
    data?.setting.slackEnabled || false
  );
  const [slackSetting, setSlackSetting] = useState<Record<string, string>>(
    data?.setting || {}
  );
  const [isLoading, setLoading] = useState<boolean>(false);

  if (error) return <Error />;
  if (!data) return <Loading />;

  const { setting = {} } = data;

  const handleChangeSlackEnabled = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.checked);
    setSlackEnabled(e.currentTarget.checked);
  };

  const handleChangeText = (fieldName: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newVal = { ...slackSetting, [fieldName]: e.currentTarget.value };
    setSlackSetting(newVal);
  };

  const handleSaveSetting = async () => {
    // removed projectId from default object
    const { projectId, ...rest } = slackSetting;

    const data = {
      setting: {
        ...rest,
        slackEnabled,
      },
    };
    console.log('Submit', data);

    try {
      setLoading(true);
      const res = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      console.log(json);

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

  const handleTestSlack = () => {
    console.log('ok');
  };

  return (
    <>
      <Text fontWeight={700}>Integrations</Text>
      <Text color="gray" mb={5}>
        Integrations to get notify to your tools.
      </Text>
      <FormControl mb={5}>
        <FormLabel htmlFor="slackEnabled">Enable Slack</FormLabel>
        <Switch
          id="slackEnabled"
          defaultChecked={setting?.slackEnabled}
          isChecked={slackEnabled}
          onChange={handleChangeSlackEnabled}
        />
      </FormControl>

      {slackEnabled && (
        <>
          <FormControl {...slackSettingStyle}>
            <FormLabel>Slack Webhook</FormLabel>
            <Input
              value={slackSetting?.['slackWebhook']}
              onChange={handleChangeText('slackWebhook')}
            />
          </FormControl>

          <FormControl {...slackSettingStyle}>
            <FormLabel>Slack Channel</FormLabel>
            <Input
              value={slackSetting?.['slackChannel']}
              onChange={handleChangeText('slackChannel')}
            />
          </FormControl>
          <FormControl {...slackSettingStyle}>
            <FormLabel>Slack Name</FormLabel>
            <Input
              value={slackSetting?.['slackUserName']}
              onChange={handleChangeText('slackUserName')}
            />
          </FormControl>
          <FormControl {...slackSettingStyle}>
            <FormLabel>Slack Icon</FormLabel>
            <Input
              value={slackSetting?.['slackIcon']}
              onChange={handleChangeText('slackIcon')}
            />
          </FormControl>
          <FormControl {...slackSettingStyle}>
            <Button onClick={handleTestSlack} disabled={isLoading}>
              Test Slack
            </Button>
          </FormControl>
        </>
      )}

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

export default IntegrationPanel;
