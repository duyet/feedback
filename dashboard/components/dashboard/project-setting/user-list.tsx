import React, { useState } from 'react';
import {
  ListItem,
  Input,
  FormHelperText,
  Text,
  WrapItem,
  Avatar,
  HStack,
  List,
  Badge,
} from '@chakra-ui/react';

import { ProjectUserPopulated } from '../../../types/prisma';

export type Props = {
  defaultValue: ProjectUserPopulated[];
  onChange?: (users: ProjectUserPopulated[]) => void;
};

export const UserList: React.FC<Props> = ({ defaultValue = [] }) => {
  const [list] = useState<ProjectUserPopulated[]>(defaultValue);

  return (
    <>
      <List mb={5}>
        {list.map((item: ProjectUserPopulated) => {
          return (
            <ListItem key={item.userId}>
              <WrapItem>
                <HStack>
                  {item.user.image ? (
                    <Avatar src={item.user.image} />
                  ) : (
                    <Avatar name="User" />
                  )}
                  {JSON.stringify(item.user)}
                  <Text>
                    {item.user.name}{' '}
                    {item.user.email ? `(${item.user.email})` : null}
                  </Text>
                  <Badge
                    colorScheme={item.role === 'owner' ? 'green' : undefined}
                  >
                    {item.role}
                  </Badge>
                </HStack>
              </WrapItem>
            </ListItem>
          );
        })}
      </List>

      <Input type="url" placeholder="someone@gmail.com" disabled />
      <FormHelperText>Adding new team member is WIP</FormHelperText>
    </>
  );
};

export default UserList;
