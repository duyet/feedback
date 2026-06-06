import React from 'react';
import {
  Image,
  DialogRoot,
  DialogBackdrop,
  DialogPositioner,
  DialogContent,
  DialogCloseTrigger,
  useDisclosure,
} from '@chakra-ui/react';

export type ScreenshotProps = {
  screenshot: string;
};

export const Screenshot: React.FC<ScreenshotProps> = ({ screenshot }) => {
  const { open, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Image
        src={screenshot}
        onClick={onOpen}
        height={100}
        borderRadius={5}
        cursor="pointer"
        alt="Screenshot"
      />

      <DialogRoot open={open} onOpenChange={(e: { open: boolean }) => { if (!e.open) onClose(); }} size="full">
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent>
            <DialogCloseTrigger />
            <Image src={screenshot} alt="Screenshot" />
          </DialogContent>
        </DialogPositioner>
      </DialogRoot>
    </>
  );
};

export default Screenshot;
