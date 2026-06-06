import React from 'react';
import {
  Button,
  DialogRoot,
  DialogBackdrop,
  DialogPositioner,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogCloseTrigger,
  useDisclosure,
} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { LuPlus } from 'react-icons/lu';
import { useSWRConfig } from 'swr';

import NewProjectForm from './new-project';

export const AddProject: React.FC = () => {
  const { open, onOpen, onClose } = useDisclosure();
  const { mutate } = useSWRConfig();

  const handleOnCreatedNewProject = () => {
    mutate('/api/project');
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen}>
        <Icon as={LuPlus} />
      </Button>

      <DialogRoot open={open} onOpenChange={(e: { open: boolean }) => { if (!e.open) onClose(); }}>
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent>
            <DialogHeader>New Project</DialogHeader>
            <DialogCloseTrigger />
            <DialogBody pb={6}>
              <NewProjectForm onSuccess={handleOnCreatedNewProject} />
            </DialogBody>
          </DialogContent>
        </DialogPositioner>
      </DialogRoot>
    </>
  );
};

export default AddProject;
