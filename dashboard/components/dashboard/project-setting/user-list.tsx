import useSWR, { useSWRConfig } from 'swr';
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
  useToast,
  Kbd,
  Link,
} from '@chakra-ui/react';

import { ProjectUserPopulated, Invitation } from '../../../types/prisma';
import fetcher from '../../../lib/fetcher';

const API_INVITATION = '/api/project/invitation';
const API_INVITATION_LIST = '/api/project/invitation-list';

export type Props = {
  defaultValue: ProjectUserPopulated[];
  projectId: string;
  onChange?: (users: ProjectUserPopulated[]) => void;
};

export const UserList: React.FC<Props> = ({ projectId, defaultValue = [] }) => {
  const toast = useToast();
  const { mutate } = useSWRConfig();

  const invitationListUrl = `${API_INVITATION_LIST}?project=${projectId}`;
  const { data: invitationList } = useSWR(invitationListUrl, fetcher);

  const [list] = useState<ProjectUserPopulated[]>(defaultValue);
  const [inviteEmail, setInviteEmail] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInviteEmail(e.currentTarget.value);
  };

  const handleOnEnterKey = async (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter' || !inviteEmail) return;

    if (!inviteEmail.includes('@')) {
      return toast({
        status: 'error',
        description: 'Invalid email',
        isClosable: true,
      });
    }

    try {
      setLoading(true);
      const url = `${API_INVITATION}?project=${projectId}&to=${encodeURIComponent(
        inviteEmail
      )}`;
      const res = await fetch(url);
      const json = await res.json();

      if (!res.ok) {
        throw Error(json.err);
      }

      toast({
        status: 'success',
        description: `Invited ${inviteEmail}`,
        isClosable: true,
      });

      mutate(invitationListUrl);
      setInviteEmail('');
    } catch (err) {
      toast({
        status: 'error',
        description: `${err || 'Something went wrong'}`,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRevokeInvitation = () => alert('Not implemented yet');
  const handleResendInvitation = () => alert('Not implemented yet');

  return (
    <>
      <List mb={5}>
        {list.map((item: ProjectUserPopulated) => (
          <ListItem key={item.userId} mb={3}>
            <WrapItem>
              <HStack>
                {item.user.image ? (
                  <Avatar src={item.user.image} />
                ) : (
                  <Avatar name={item.user.name || 'User'} />
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
        ))}

        {invitationList?.map((item: Invitation) => (
          <ListItem key={item.email} mb={3} opacity={0.5}>
            <WrapItem>
              <HStack>
                <Avatar name={item.email} />
                <Text>{item.email} </Text>
                <Badge>{item.status}</Badge>
                <Link onClick={handleRevokeInvitation}>(revoke)</Link>
                <Link onClick={handleResendInvitation}>(resend)</Link>
              </HStack>
            </WrapItem>
          </ListItem>
        ))}
      </List>

      <Input
        type="url"
        placeholder="someone@gmail.com"
        value={inviteEmail}
        onChange={handleOnChange}
        onKeyPress={handleOnEnterKey}
        isDisabled={isLoading}
      />
      <FormHelperText>
        {isLoading ? (
          <>Loading ...</>
        ) : (
          <>
            Press <Kbd>Enter</Kbd> to invite via email.
          </>
        )}
      </FormHelperText>
    </>
  );
};

export default UserList;
