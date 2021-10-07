import React from 'react';
import { Heading } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

import GeneralSetting from './panel-general-setting';
import TeamSetting from './panel-team-setting';
import IntegrationPanel from './panel-integration';

export type Props = {
  projectId: string;
  isOpen: boolean;
  onOpen: any;
  onClose: any;
};

export const ProjectSettingPanel: React.FC<Props> = ({
  projectId,
  isOpen,
  onOpen,
  onClose,
}) => {
  return (
    <Modal
      size="3xl"
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Heading size="md" mb={5} mt={5}>
            Project Settings
          </Heading>

          <Tabs>
            <TabList>
              <Tab>General</Tab>
              <Tab>Team</Tab>
              <Tab>Integrations</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <GeneralSetting projectId={projectId} />
              </TabPanel>
              <TabPanel>
                <TeamSetting projectId={projectId} />
              </TabPanel>
              <TabPanel>
                <IntegrationPanel projectId={projectId} /> 
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProjectSettingPanel;
