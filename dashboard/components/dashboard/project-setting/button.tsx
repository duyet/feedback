import React from 'react';
import { SettingsIcon } from '@chakra-ui/icons';
import { Button, useDisclosure } from '@chakra-ui/react';

import ProjectSettingModal from './modal';

export type Props = {
  projectId: string;
};

export const ProjectSettingButton: React.FC<Props> = ({ projectId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} mr={3}>
        <SettingsIcon />
      </Button>
      <ProjectSettingModal
        projectId={projectId}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </>
  );
};

export default ProjectSettingButton;
