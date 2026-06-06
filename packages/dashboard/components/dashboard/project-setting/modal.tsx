import React from 'react';
import { Heading, DialogRoot, DialogBackdrop, DialogPositioner, DialogContent, DialogBody, DialogCloseTrigger, TabsRoot, TabsList, TabsTrigger, TabsContent } from '@chakra-ui/react';

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
    <DialogRoot
      open={isOpen}
      onOpenChange={(e: { open: boolean }) => { if (!e.open) onClose(); }}
    >
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent maxW="3xl">
          <DialogCloseTrigger />
          <DialogBody>
            <Heading size="md" mb={5} mt={5}>
              Project Settings
            </Heading>

            <TabsRoot>
              <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
              </TabsList>

              <TabsContent value="general">
                <GeneralSetting projectId={projectId} />
              </TabsContent>
              <TabsContent value="team">
                <TeamSetting projectId={projectId} />
              </TabsContent>
              <TabsContent value="integrations">
                <IntegrationPanel projectId={projectId} />
              </TabsContent>
            </TabsRoot>
          </DialogBody>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
};

export default ProjectSettingPanel;
