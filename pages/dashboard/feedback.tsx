import React, { useState } from "react";
import {
  Box,
  Flex,
  Tag,
  Image,
  Link,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import { FeedbackProps } from "./types";
import { Meta } from "./meta";

type ScreenshotProps = {
  screenshot: string;
  onClick: (screenshot: string) => void;
};

const Screenshot: React.FC<ScreenshotProps> = ({ screenshot, onClick }) => (
  <Image boxSize="50px" src={screenshot} onClick={() => onClick(screenshot)} />
);

const Feedback: React.FC<{ feedback: FeedbackProps }> = ({ feedback }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedScreenshot, setScreenshot] = useState();

  const { name, email, message, url, screenshot, device, createdAt } = feedback;

  const handleClickScreenshot = (screenshot: string) => {
    setScreenshot(screenshot);
    onOpen();
  };

  return (
    <Box border={"1px solid #e2e8f0"} borderRadius={5} p={5} mb={5}>
      <Flex
        justifyContent="space-between"
        mb={5}
        flexDirection={["column", "row"]}
      >
        <Tag>{name ? `${name} (${email})` : email}</Tag>
        <Text color="gray.500" fontWeight={500}>
          {createdAt}
        </Text>
      </Flex>

      <Flex justifyContent="space-between" p={"10px 0"}>
        <Box>{message}</Box>
        {screenshot ? (
          <Screenshot screenshot={screenshot} onClick={handleClickScreenshot} />
        ) : null}
      </Flex>

      <Meta name={"URL"} value={url} isLink />
      <Meta name={"Device"} value={device} />

      <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <Image src={selectedScreenshot} alt="Screenshot" />
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Feedback;
