import React, { ReactNode } from "react";
import {
  Box,
  Flex,
  HStack,
  Container,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { default as NextLink } from "next/link";
import { useRouter } from "next/router";

import Profile from "./profile";
import { INavLinkItem } from "../../types/nav-link-item";

const links: INavLinkItem[] = JSON.parse(process.env.navLink || "");
const logo = process.env.logo;

type NavLinkProps = {
  isActive?: boolean;
  href: string;
  children: ReactNode;
};

const NavLink: React.FC<NavLinkProps> = ({ href, isActive, children }) => {
  const bg = useColorModeValue("gray.200", "gray.700");

  return (
    <NextLink href={href}>
      <Link
        px={2}
        py={1}
        rounded={"md"}
        _hover={{
          textDecoration: "none",
          bg,
        }}
        bg={isActive ? bg : {}}
      >
        {children}
      </Link>
    </NextLink>
  );
};

const Header: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Container maxW="container.lg">
        <Flex
          h={16}
          w={"100%"}
          maxW={"1000px"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box fontWeight="700">
              <Link href="/">{logo}</Link>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {links.map(({ label, url }: INavLinkItem) => (
                <NavLink key={url} href={url} isActive={router.asPath === url}>
                  {label}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Profile />
          </Flex>
        </Flex>
      </Container>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {links.map(({ label, url }: INavLinkItem) => (
              <NavLink key={url} href={url} isActive={router.asPath === url}>
                {label}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Header;
