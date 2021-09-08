import html2canvas from "html2canvas";
import React, { ReactNode, useState } from "react";
import {
  Box,
  Image,
  Button,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
  Textarea,
} from "@chakra-ui/react";
import {
  osVersion,
  osName,
  deviceType,
  fullBrowserVersion,
  browserName,
} from "react-device-detect";
import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";

import ScreenshotIcon from "./screenshot-icon";

export type WidgetProps = {
  url?: string;
  title?: string;
  email?: string;
  name?: string;
  placeholder?: string;
  triggerButtonText?: string;
  sendFeedbackText?: string;
  disableScreenshot?: boolean;
  children?: ReactNode;
};

type WidgetState = "submit" | "submitting" | "success" | "error";

export const Widget: React.FC<WidgetProps> = ({
  url,
  title = "Give us feedback",
  email = "me@duyet.net",
  name,
  placeholder = "I noticed that ...",
  triggerButtonText = "Feedback",
  sendFeedbackText = "Send Feedback",
  disableScreenshot = false,
  children,
}) => {
  const [message, setMessage] = useState<string>();
  const [screenshot, setScrenshot] = useState<string>();
  const [state, setState] = useState<WidgetState>("submit");

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
      const base64image = canvas.toDataURL("image/png");
      console.log(base64image);
      setScrenshot(base64image);
    });
  };

  const handleClickOnCapturedScreenshot = () => {
    setScrenshot("");
  };

  const handleResetState = () => {
    setScrenshot("");
    setState("submit");
  };

  // Handle submit
  const handleSubmitFeedback = async () => {
    const data = {
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

    console.log(JSON.stringify(data));

    try {
      const res = await fetch("/api/feedback/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }

      console.log(res);
      setState("success");
    } catch (err) {
      console.error(err);

      setState("error");
    }
  };

  const submitContent = (
    <>
      <PopoverHeader pt={4} fontWeight="bold" border="0">
        {title}
      </PopoverHeader>
      <PopoverArrow />
      <PopoverCloseButton />

      <PopoverBody>
        <Textarea placeholder={placeholder} onChange={handleInputChange} />
      </PopoverBody>
      <PopoverFooter
        border={0}
        d="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        {""}
        <Box>
          <IconButton
            aria-label="Capture Screenshot"
            icon={<ScreenshotIcon />}
            isDisabled={disableScreenshot}
            onClick={handleCaptureScreenshot}
          />
          {screenshot ? (
            <IconButton
              ml={3}
              aria-label="Capture Screenshot"
              icon={
                <Image
                  src={screenshot}
                  alt="Screenshot"
                  htmlWidth={40}
                  htmlHeight={40}
                />
              }
              onClick={handleClickOnCapturedScreenshot}
            />
          ) : null}
        </Box>
        <Button onClick={handleSubmitFeedback}>
          {state == "submitting" ? "Loading ..." : sendFeedbackText}
        </Button>
      </PopoverFooter>
    </>
  );

  const successContent = (
    <>
      <PopoverCloseButton onClick={handleResetState} />
      <PopoverBody textAlign="center">
        <Box p={5}>
          <CheckCircleIcon color="green" w={10} h={10} />
        </Box>
        <Text pb={5}>Thanks! We received your feedback.</Text>
      </PopoverBody>
    </>
  );

  const errorContent = (
    <>
      <PopoverCloseButton onClick={handleResetState} />
      <PopoverBody textAlign="center">
        <Box p={5}>
          <CloseIcon color="red" w={10} h={10} />
        </Box>
        <Text pb={5}>Sorry! We can&apos;t received your feedback.</Text>
      </PopoverBody>
    </>
  );

  return (
    <Popover closeOnBlur={true} autoFocus={true} closeOnEsc={true}>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent>
        {state === "submit" ? submitContent : null}
        {state === "success" ? successContent : null}
        {state === "error" ? errorContent : null}
      </PopoverContent>
    </Popover>
  );
};

export default Widget;
