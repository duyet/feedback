import React from 'react';
import { Icon, Button, useDisclosure } from '@chakra-ui/react';
import { LuSettings } from 'react-icons/lu';

import ProjectSettingModal from './modal';

export type Props = {
  projectId: string;
};

export const ProjectSettingButton: React.FC<Props> = ({ projectId }) => {
  const { open, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} mr={3}>
        <Icon as={LuSettings} />
      </Button>
      <ProjectSettingModal
        projectId={projectId}
        isOpen={open}
        onOpen={onOpen}
        onClose={onClose}
      />
    </>
  );
};

export default ProjectSettingButton;
