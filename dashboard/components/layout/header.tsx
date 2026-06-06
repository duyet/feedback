import React, { ReactNode } from 'react';
import {
  Box,
  Flex,
  HStack,
  Container,
  Link,
  IconButton,
  useDisclosure,
  Stack,
} from '@chakra-ui/react';
import { useColorModeValue } from '../ui/color-mode';
import { Icon } from '@chakra-ui/react';
import { LuMenu, LuX } from 'react-icons/lu';
import { default as NextLink } from 'next/link';
import { useRouter } from 'next/router';

import Profile from './profile';
import { INavLinkItem } from '../../types/nav-link-item';

const links: INavLinkItem[] = JSON.parse(process.env.navLink || '');
const logo = process.env.logo;

type NavLinkProps = {
  isActive?: boolean;
  href: string;
  children: ReactNode;
};

const NavLink: React.FC<NavLinkProps> = ({ href, isActive, children }) => {
  const bg = useColorModeValue('gray.200', 'gray.700');

  return (
    <NextLink href={href}>
      <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
          textDecoration: 'none',
          bg,
        }}
        bg={isActive ? bg : undefined}
      >
        {children}
      </Link>
    </NextLink>
  );
};

const Header: React.FC = () => {
  const { open, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Container maxW="container.lg">
        <Flex
          h={16}
          w={'100%'}
          maxW={'1000px'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <IconButton
            size={'md'}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={open ? onClose : onOpen}
          >
            {open ? <Icon as={LuX} /> : <Icon as={LuMenu} />}
          </IconButton>
          <HStack gap={8} alignItems={'center'}>
            <Box fontWeight="700">
              <Link href="/">{logo}</Link>
            </Box>
            <HStack
              gap={4}
              display={{ base: 'none', md: 'flex' }}
              role="navigation"
            >
              {links.map(({ label, url }: INavLinkItem) => (
                <NavLink
                  key={url}
                  href={url}
                  isActive={router.asPath.startsWith(url)}
                >
                  {label}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Profile />
          </Flex>
        </Flex>
      </Container>

      {open ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack gap={4} role="navigation">
            {links.map(({ label, url }: INavLinkItem) => (
              <NavLink
                key={url}
                href={url}
                isActive={router.asPath.startsWith(url)}
              >
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
