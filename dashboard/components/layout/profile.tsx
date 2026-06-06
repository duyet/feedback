import React from 'react';
import {
  Text,
  AvatarRoot,
  AvatarImage,
  AvatarFallback,
  MenuRoot,
  MenuTrigger,
  MenuPositioner,
  MenuContent,
  MenuItem,
  MenuSeparator,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { default as NextLink } from 'next/link';

export type Props = {};

const Profile: React.FC<Props> = () => {
  const { data: session, status } = useSession({ required: true });

  if (!session && status === 'loading') return <Text>Loading ...</Text>;
  if (!session) return <NextLink href="/api/auth/signin">Sign in</NextLink>;

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <AvatarRoot size="sm" cursor="pointer">
          {session.user.image ? (
            <AvatarImage src={session.user.image} />
          ) : (
            <AvatarFallback>{session.user.name?.[0] || 'U'}</AvatarFallback>
          )}
        </AvatarRoot>
      </MenuTrigger>
      <MenuPositioner>
        <MenuContent>
          <MenuItem value="user-info">{session.user.email || session.user.name}</MenuItem>
          <MenuSeparator />
          <MenuItem value="signout" asChild>
            <NextLink href="/api/auth/signout">Sign out</NextLink>
          </MenuItem>
        </MenuContent>
      </MenuPositioner>
    </MenuRoot>
  );
};

export default Profile;
