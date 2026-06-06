import useSWR, { useSWRConfig } from 'swr';
import React, { useEffect, useState } from 'react';
import {
  Text,
  Button,
  Input,
  FieldRoot,
  FieldLabel,
  FieldHelperText,
  SwitchRoot,
} from '@chakra-ui/react';

import { toaster } from '../../../hooks/useToast';
import Error from '../../common/error';
import fetcher from '../../../lib/fetcher';
import Loading from '../../common/loading';
import { ProjectPopulated } from '../../../types/prisma';

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
  const { data, error } = useSWR<ProjectPopulated>(url, fetcher);

  const { mutate } = useSWRConfig();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [emailEnabled, setEmailEnabled] = useState<boolean>();
  const [slackEnabled, setSlackEnabled] = useState<boolean>();
  const [setting, setSetting] = useState<ProjectPopulated['setting']>();

  useEffect(() => {
    setEmailEnabled(data?.setting?.emailEnabled);
    setSlackEnabled(data?.setting?.slackEnabled);
    setSetting(data?.setting as ProjectPopulated['setting']);
  }, [data]);

  if (error) return <Error />;
  if (!data) return <Loading />;

  const handleEmailToggle = (details: { checked: boolean }) => {
    setEmailEnabled(details.checked);
  };

  const handleSlackToggle = (details: { checked: boolean }) => {
    setSlackEnabled(details.checked);
  };

  const handleChangeText = (fieldName: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newVal = {
      ...setting,
      [fieldName]: e.currentTarget.value,
    } as ProjectPopulated['setting'];

    setSetting(newVal);
  };

  const handleSaveSetting = async () => {
    if (setting === null || setting === undefined) return;

    // removed projectId from default object
    const { projectId, ...rest } = setting;

    const data = {
      setting: {
        ...rest,
        slackEnabled,
        emailEnabled,
      },
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

  const handleTestSlack = async () => {
    try {
      const res = await fetch('/api/project/test-slack', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(setting),
      });
      const json = await res.json();
      if (!res.ok) throw json.err || 'Error';
      return toaster.create({
        description: 'Sent',
        type: 'success',
      });
    } catch (err) {
      return toaster.create({
        title: 'Error',
        description: `${err}`,
        type: 'error',
      });
    }
  };

  return (
    <>
      <Text color="gray" mb={5}>
        Integrations to get notify to your tools.
      </Text>

      <FieldRoot mb={5}>
        <SwitchRoot
          id="emailEnabled"
          checked={emailEnabled}
          onCheckedChange={handleEmailToggle}
          mr={3}
        />
        <FieldLabel htmlFor="emailEnabled">
          Enable Email notify for new feedbacks
        </FieldLabel>
      </FieldRoot>

      {emailEnabled && (
        <>
          <FieldRoot {...emailSettingStyle}>
            <FieldLabel>Custom Email Title</FieldLabel>
            <Input
              value={setting?.['emailTitle'] || ''}
              onChange={handleChangeText('emailTitle')}
              placeholder="[Feedback] New feedback"
            />
            <FieldHelperText>
              Default: [Feedback] You got new feedback
            </FieldHelperText>
          </FieldRoot>
        </>
      )}

      <FieldRoot mb={5} mt={5}>
        <SwitchRoot
          id="slackEnabled"
          checked={slackEnabled}
          onCheckedChange={handleSlackToggle}
          mr={3}
        />
        <FieldLabel htmlFor="slackEnabled">
          Enable Slack
        </FieldLabel>
      </FieldRoot>

      {slackEnabled && (
        <>
          <FieldRoot {...slackSettingStyle}>
            <FieldLabel>Slack Webhook</FieldLabel>
            <Input
              value={setting?.['slackWebhook'] || ''}
              onChange={handleChangeText('slackWebhook')}
            />
            <FieldHelperText>
              https://hooks.slack.com/services/...
            </FieldHelperText>
          </FieldRoot>

          <FieldRoot {...slackSettingStyle}>
            <FieldLabel>Slack Channel</FieldLabel>
            <Input
              value={setting?.['slackChannel'] || ''}
              onChange={handleChangeText('slackChannel')}
            />
            <FieldHelperText>#customer-feedbacks</FieldHelperText>
          </FieldRoot>

          <FieldRoot {...slackSettingStyle}>
            <FieldLabel>Slack Name</FieldLabel>
            <Input
              value={setting?.['slackUserName'] || ''}
              onChange={handleChangeText('slackUserName')}
            />
            <FieldHelperText>e.g. Feedback Robot</FieldHelperText>
          </FieldRoot>

          <FieldRoot {...slackSettingStyle}>
            <FieldLabel>Slack Icon</FieldLabel>
            <Input
              value={setting?.['slackIcon'] || ''}
              onChange={handleChangeText('slackIcon')}
            />
            <FieldHelperText>e.g. :pray:</FieldHelperText>
          </FieldRoot>

          <FieldRoot {...slackSettingStyle}>
            <Button onClick={handleTestSlack} disabled={isLoading}>
              Test Slack
            </Button>
          </FieldRoot>
        </>
      )}

      <FieldRoot textAlign="right">
        <Button
          colorScheme="messenger"
          onClick={handleSaveSetting}
          disabled={isLoading}
        >
          Save Settings
        </Button>
      </FieldRoot>
    </>
  );
};

export default IntegrationPanel;
