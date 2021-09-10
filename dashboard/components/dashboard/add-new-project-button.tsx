import React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { SmallAddIcon } from '@chakra-ui/icons';
import { useSWRConfig } from 'swr';

import NewProjectForm from './new-project';

export const AddProject: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate } = useSWRConfig();

  const handleOnCreatedNewProject = () => {
    mutate('/api/project');
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen}>
        <SmallAddIcon />
      </Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <NewProjectForm onSuccess={handleOnCreatedNewProject} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddProject;
