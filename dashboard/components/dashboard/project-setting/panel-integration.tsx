import useSWR, { useSWRConfig } from 'swr';
import React, { useEffect, useState } from 'react';
import {
  Text,
  Button,
  Input,
  FormControl,
  Switch,
  FormLabel,
  useToast,
  FormHelperText,
} from '@chakra-ui/react';

import fetcher from '../../../lib/fetcher';
import Loading from '../../common/loading';
import Error from '../../common/error';

export type Props = {
  projectId: string;
};

const emailSettingStyle = {};
const slackSettingStyle = {
  background: '#f8fcff',
  p: 5,
};

export const IntegrationPanel: React.FC<Props> = ({ projectId }) => {
  const url = `/api/project/${projectId}`;
  const { data, error } = useSWR(url, fetcher);

  const toast = useToast();
  const { mutate } = useSWRConfig();
  const [emailEnabled, setEmailEnabled] = useState<boolean>(
    data?.setting.emailEnabled || false
  );
  const [slackEnabled, setSlackEnabled] = useState<boolean>(
    data?.setting.slackEnabled || false
  );
  const [setting, setSetting] = useState<Record<string, string>>(
    data?.setting || {}
  );
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setEmailEnabled(data?.setting.emailEnabled);
      setSlackEnabled(data?.setting.slackEnabled);
      setSetting(data?.setting);
    }
  });

  if (error) return <Error />;
  if (!data) return <Loading />;

  const handleChangeEmailEnabled = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailEnabled(e.currentTarget.checked);
  };

  const handleChangeSlackEnabled = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlackEnabled(e.currentTarget.checked);
  };

  const handleChangeText = (fieldName: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newVal = { ...setting, [fieldName]: e.currentTarget.value };
    setSetting(newVal);
  };

  const handleSaveSetting = async () => {
    // removed projectId from default object
    const { projectId, ...rest } = setting;

    const data = {
      setting: {
        ...rest,
        slackEnabled,
        emailEnabled,
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
      <Text color="gray" mb={5}>
        Integrations to get notify to your tools.
      </Text>

      <FormControl mb={5}>
        <FormLabel htmlFor="emailEnabled">
          Enable Email notify for new feedbacks
        </FormLabel>
        <Switch
          id="emailEnabled"
          isChecked={emailEnabled}
          onChange={handleChangeEmailEnabled}
        />
      </FormControl>

      {emailEnabled && (
        <>
          <FormControl {...emailSettingStyle}>
            <FormLabel>Email Title</FormLabel>
            <Input
              value={setting?.['emailTitle']}
              onChange={handleChangeText('emailTitle')}
            />
            <FormHelperText></FormHelperText>
          </FormControl>
        </>
      )}

      <FormControl mb={5} mt={5}>
        <FormLabel htmlFor="slackEnabled">Enable Slack</FormLabel>
        <Switch
          id="slackEnabled"
          isChecked={slackEnabled}
          onChange={handleChangeSlackEnabled}
        />
      </FormControl>

      {slackEnabled && (
        <>
          <FormControl {...slackSettingStyle}>
            <FormLabel>Slack Webhook</FormLabel>
            <Input
              value={setting?.['slackWebhook']}
              onChange={handleChangeText('slackWebhook')}
            />
            <FormHelperText>
              https://hooks.slack.com/services/...
            </FormHelperText>
          </FormControl>

          <FormControl {...slackSettingStyle}>
            <FormLabel>Slack Channel</FormLabel>
            <Input
              value={setting?.['slackChannel']}
              onChange={handleChangeText('slackChannel')}
            />
            <FormHelperText>#customer-feedbacks</FormHelperText>
          </FormControl>
          <FormControl {...slackSettingStyle}>
            <FormLabel>Slack Name</FormLabel>
            <Input
              value={setting?.['slackUserName']}
              onChange={handleChangeText('slackUserName')}
            />
            <FormHelperText>e.g. Feedback Robot</FormHelperText>
          </FormControl>
          <FormControl {...slackSettingStyle}>
            <FormLabel>Slack Icon</FormLabel>
            <Input
              value={setting?.['slackIcon']}
              onChange={handleChangeText('slackIcon')}
            />
            <FormHelperText>e.g. :pray:</FormHelperText>
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
