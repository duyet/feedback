import React from "react";
import {
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

export type ScreenshotProps = {
  screenshot: string;
};

export const Screenshot: React.FC<ScreenshotProps> = ({ screenshot }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOnClick = onOpen;

  return (
    <>
      <Image
        src={screenshot}
        onClick={handleOnClick}
        height={100}
        borderRadius={5}
        cursor="pointer"
        alt="Screenshot"
      />

      <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <Image src={screenshot} alt="Screenshot" />
        </ModalContent>
      </Modal>
    </>
  );
};

export default Screenshot;
