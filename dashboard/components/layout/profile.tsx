import React from "react";
import {
  Text,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { default as NextLink } from "next/link";

export type Props = {};

const Profile: React.FC<Props> = () => {
  const { data: session, status } = useSession({ required: true });

  if (!session && status === "loading") return <Text>Loading ...</Text>;
  if (!session) return <NextLink href="/api/auth/signin">Sign in</NextLink>;

  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"link"}
        cursor={"pointer"}
        minW={0}
      >
        <Avatar src={session.user.image} size="sm" />
      </MenuButton>
      <MenuList>
        <MenuItem>{session.user.email || session.user.name}</MenuItem>
        <MenuDivider />
        <MenuItem>
          <NextLink href="/api/auth/signout">Sign out</NextLink>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Profile;
