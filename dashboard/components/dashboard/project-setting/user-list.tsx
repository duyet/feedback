import useSWR, { useSWRConfig } from 'swr';
import React, { useState } from 'react';
import {
  ListItem,
  Input,
  FieldHelperText,
  Text,
  HStack,
  ListRoot,
  AvatarRoot,
  AvatarImage,
  AvatarFallback,
  Badge,
  Kbd,
  Link,
} from '@chakra-ui/react';

import { toaster } from '../../../hooks/useToast';
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
  const { mutate } = useSWRConfig();

  const invitationListUrl = `${API_INVITATION_LIST}?project=${projectId}`;
  const { data: invitationList, error: invitationListError } = useSWR(invitationListUrl, fetcher);

  const [list] = useState<ProjectUserPopulated[]>(defaultValue);
  const [inviteEmail, setInviteEmail] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInviteEmail(e.currentTarget.value);
  };

  const handleOnEnterKey = async (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter' || !inviteEmail) return;

    if (!inviteEmail.includes('@')) {
      return toaster.create({
        type: 'error',
        description: 'Invalid email',
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

      toaster.create({
        type: 'success',
        description: `Invited ${inviteEmail}`,
      });

      mutate(invitationListUrl);
      setInviteEmail('');
    } catch (err) {
      toaster.create({
        type: 'error',
        description: `${err || 'Something went wrong'}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRevokeInvitation = () => alert('Not implemented yet');
  const handleResendInvitation = () => alert('Not implemented yet');

  return (
    <>
      <ListRoot mb={5}>
        {list.map((item: ProjectUserPopulated) => (
          <ListItem key={item.userId} mb={3}>
            <HStack>
              <AvatarRoot>
                {item.user.image ? (
                  <AvatarImage src={item.user.image} />
                ) : (
                  <AvatarFallback>{item.user.name || 'U'}</AvatarFallback>
                )}
              </AvatarRoot>
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
          </ListItem>
        ))}

        {!invitationListError && invitationList?.map((item: Invitation) => (
          <ListItem key={item.email} mb={3} opacity={0.5}>
            <HStack>
              <AvatarRoot>
                <AvatarFallback>{item.email}</AvatarFallback>
              </AvatarRoot>
              <Text>{item.email} </Text>
              <Badge>{item.status}</Badge>
              <Link onClick={handleRevokeInvitation}>(revoke)</Link>
              <Link onClick={handleResendInvitation}>(resend)</Link>
            </HStack>
          </ListItem>
        ))}
      </ListRoot>

      <Input
        type="url"
        placeholder="someone@gmail.com"
        value={inviteEmail}
        onChange={handleOnChange}
        onKeyPress={handleOnEnterKey}
        disabled={isLoading}
      />
      <FieldHelperText>
        {isLoading ? (
          <>Loading ...</>
        ) : (
          <>
            Press <Kbd>Enter</Kbd> to invite via email.
          </>
        )}
      </FieldHelperText>
    </>
  );
};

export default UserList;
