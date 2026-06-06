import html2canvas from 'html2canvas';
import React, { ReactNode, useState } from 'react';
import {
  Box,
  Flex,
  Image,
  Button,
  IconButton,
  PopoverRoot,
  PopoverTrigger,
  PopoverPositioner,
  PopoverContent,
  PopoverArrow,
  PopoverCloseTrigger,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Text,
  Textarea,
} from '@chakra-ui/react';
import {
  osVersion,
  osName,
  deviceType,
  fullBrowserVersion,
  browserName,
} from 'react-device-detect';
import { Icon } from '@chakra-ui/react';
import { LuCircleCheck, LuX } from 'react-icons/lu';

import ScreenshotIcon from './screenshot-icon';
import Loading from '../common/loading';

export type WidgetProps = {
  projectId?: string;
  url?: string;
  title?: string;
  email?: string;
  name?: string;
  placeholder?: string;
  triggerButtonText?: string;
  sendFeedbackText?: string;
  disableScreenshot?: boolean;
  api?: string;
  children?: ReactNode;
};

const API = '/api/feedback';

type WidgetState = 'submit' | 'submitting' | 'success' | 'error';

export const Widget: React.FC<WidgetProps> = ({
  projectId,
  url,
  title = 'Give us feedback',
  email = 'anonymous',
  name,
  placeholder = 'I noticed that ...',
  triggerButtonText = 'Feedback',
  sendFeedbackText = 'Send Feedback',
  disableScreenshot = false,
  api = API,
  children,
}) => {
  const [message, setMessage] = useState<string>();
  const [screenshot, setScrenshot] = useState<string>();
  const [state, setState] = useState<WidgetState>('submit');

  const trigger = children ?? (
    <Button position="fixed" right={0} bottom={0}>
      {triggerButtonText}
    </Button>
  );

  // Handle input message
  const handleInputChange = (e: React.FormEvent<HTMLTextAreaElement>) =>
    setMessage(e.currentTarget.value);

  // TODO: using another screenshot library
  const handleCaptureScreenshot = () => {
    html2canvas(document.body).then((canvas) => {
      const base64image = canvas.toDataURL('image/png');
      setScrenshot(base64image);
    });
  };

  const handleClickOnCapturedScreenshot = () => {
    setScrenshot('');
  };

  const handleResetState = () => {
    setScrenshot('');
    setState('submit');
  };

  // Handle submit
  const handleSubmitFeedback = async () => {
    if (!message) {
      return alert('Hmm, please input your feedback!');
    }

    const data = {
      ...{ projectId },
      url: url ?? window.location.href,
      email,
      name,
      message,
      screenshot,
      metadata: JSON.stringify({
        osName,
        osVersion,
        deviceType,
        browserName,
        fullBrowserVersion,
      }),
    };

    try {
      setState('submitting');

      const res = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Something went wrong!');
      }

      setState('success');
    } catch (err) {
      // Log error for debugging but don't expose to console in production
      if (process.env.NODE_ENV === 'development') {
        console.error('Feedback submission error:', err);
      }

      setState('error');
    }
  };

  const submitContent = (
    <>
      <PopoverHeader pt={4} fontWeight="bold" border="0">
        {title}
      </PopoverHeader>
      <PopoverArrow />
      <PopoverCloseTrigger />

      <PopoverBody>
        <Textarea placeholder={placeholder} onChange={handleInputChange} />
      </PopoverBody>
      <PopoverFooter
        border={0}
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex>
          {''}
          <Box>
            <IconButton
              aria-label="Capture Screenshot"
              disabled={disableScreenshot}
              onClick={handleCaptureScreenshot}
            >
              <ScreenshotIcon />
            </IconButton>
            {screenshot ? (
              <IconButton
                ml={3}
                aria-label="Capture Screenshot"
                onClick={handleClickOnCapturedScreenshot}
              >
                <Image
                  src={screenshot}
                  alt="Screenshot"
                  htmlWidth={40}
                  htmlHeight={40}
                />
              </IconButton>
            ) : null}
          </Box>
          <Button onClick={handleSubmitFeedback}>
            {state == 'submitting' ? 'Loading ...' : sendFeedbackText}
          </Button>
        </Flex>
      </PopoverFooter>
    </>
  );

  const submittingContent = (
    <PopoverBody>
      <Loading />
    </PopoverBody>
  );

  const successContent = (
    <>
      <PopoverCloseTrigger onClick={handleResetState} />
      <PopoverBody textAlign="center">
        <Box p={5}>
          <Icon as={LuCircleCheck} color="green" w={10} h={10} />
        </Box>
        <Text pb={5}>Thanks! We received your feedback.</Text>
      </PopoverBody>
    </>
  );

  const errorContent = (
    <>
      <PopoverCloseTrigger onClick={handleResetState} />
      <PopoverBody textAlign="center">
        <Box p={5}>
          <Icon as={LuX} color="red" w={10} h={10} />
        </Box>
        <Text pb={2}>Sorry! We can&apos;t received your feedback.</Text>
        <Text cursor="pointer" color="gray" onClick={handleSubmitFeedback}>
          Retry?
        </Text>
      </PopoverBody>
    </>
  );

  return (
    <PopoverRoot>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverPositioner>
        <PopoverContent>
          {state === 'submit' ? submitContent : null}
          {state === 'submitting' ? submittingContent : null}
          {state === 'success' ? successContent : null}
          {state === 'error' ? errorContent : null}
        </PopoverContent>
      </PopoverPositioner>
    </PopoverRoot>
  );
};

export default Widget;
