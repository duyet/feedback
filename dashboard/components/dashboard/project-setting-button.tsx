import React from "react";
import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";

import ProjectSettingPanel from "./project-setting-panel";

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
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ProjectSettingPanel projectId={projectId} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProjectSettingButton;
