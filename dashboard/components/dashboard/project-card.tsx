import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
  Badge,
  Icon,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
} from '@chakra-ui/react';
import {
  FiMessageSquare,
  FiUsers,
  FiGlobe,
  FiSettings,
  FiMoreVertical,
  FiTrash2,
  FiExternalLink,
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import Link from 'next/link';

const MotionCard = motion(Card);

interface ProjectCardProps {
  id: string;
  name: string;
  domains: string[];
  feedbackCount?: number;
  memberCount?: number;
  createdAt?: string;
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
}

/**
 * Enhanced Project Card Component
 * Beautiful card with stats, hover effects, and quick actions
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  name,
  domains,
  feedbackCount = 0,
  memberCount = 1,
  createdAt,
  onDelete,
  isDeleting = false,
}) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const statBg = useColorModeValue('blue.50', 'blue.900');

  return (
    <MotionCard
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="xl"
      overflow="hidden"
      boxShadow="md"
      _hover={{
        boxShadow: 'xl',
        borderColor: 'blue.400',
        transform: 'translateY(-4px)',
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <CardHeader pb={2}>
        <Flex justify="space-between" align="start">
          <VStack align="start" spacing={1} flex={1}>
            <Heading size="md" mb={1}>
              {name}
            </Heading>
            {domains.length > 0 && (
              <HStack spacing={2} flexWrap="wrap">
                <Icon as={FiGlobe} color="gray.500" boxSize={4} />
                {domains.slice(0, 2).map((domain) => (
                  <Badge
                    key={domain}
                    colorScheme="blue"
                    variant="subtle"
                    borderRadius="full"
                    px={3}
                  >
                    {domain}
                  </Badge>
                ))}
                {domains.length > 2 && (
                  <Badge
                    colorScheme="gray"
                    variant="subtle"
                    borderRadius="full"
                    px={2}
                  >
                    +{domains.length - 2}
                  </Badge>
                )}
              </HStack>
            )}
          </VStack>

          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Project options"
              icon={<FiMoreVertical />}
              size="sm"
              variant="ghost"
              _hover={{ bg: hoverBg }}
            />
            <MenuList>
              <Link href={`/dashboard?project=${id}`} passHref>
                <MenuItem icon={<FiExternalLink />}>
                  Open Dashboard
                </MenuItem>
              </Link>
              <Link href={`/project/${id}/settings`} passHref>
                <MenuItem icon={<FiSettings />}>
                  Settings
                </MenuItem>
              </Link>
              <Divider />
              <MenuItem
                icon={<FiTrash2 />}
                color="red.500"
                onClick={() => onDelete?.(id)}
                isDisabled={isDeleting}
              >
                Delete Project
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </CardHeader>

      <CardBody py={4}>
        <HStack spacing={4} justify="space-around">
          <Stat
            bg={statBg}
            p={3}
            borderRadius="lg"
            textAlign="center"
            flex={1}
            _hover={{ transform: 'scale(1.05)' }}
            transition="transform 0.2s"
          >
            <StatLabel fontSize="xs" color="gray.600">
              <Icon as={FiMessageSquare} mr={1} />
              Feedback
            </StatLabel>
            <StatNumber fontSize="2xl" fontWeight="bold" color="blue.600">
              {feedbackCount}
            </StatNumber>
            <StatHelpText fontSize="xs" m={0}>
              {feedbackCount === 1 ? 'item' : 'items'}
            </StatHelpText>
          </Stat>

          <Stat
            bg={statBg}
            p={3}
            borderRadius="lg"
            textAlign="center"
            flex={1}
            _hover={{ transform: 'scale(1.05)' }}
            transition="transform 0.2s"
          >
            <StatLabel fontSize="xs" color="gray.600">
              <Icon as={FiUsers} mr={1} />
              Members
            </StatLabel>
            <StatNumber fontSize="2xl" fontWeight="bold" color="blue.600">
              {memberCount}
            </StatNumber>
            <StatHelpText fontSize="xs" m={0}>
              {memberCount === 1 ? 'member' : 'members'}
            </StatHelpText>
          </Stat>
        </HStack>
      </CardBody>

      <CardFooter pt={0} pb={4}>
        <HStack w="full" spacing={3}>
          <Link href={`/dashboard?project=${id}`} passHref style={{ flex: 1 }}>
            <Button
              colorScheme="blue"
              size="md"
              w="full"
              leftIcon={<FiMessageSquare />}
              _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
              transition="all 0.2s"
            >
              View Feedback
            </Button>
          </Link>
          <Link href={`/project/${id}/settings`} passHref>
            <IconButton
              aria-label="Project settings"
              icon={<FiSettings />}
              colorScheme="gray"
              variant="outline"
              _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
              transition="all 0.2s"
            />
          </Link>
        </HStack>
      </CardFooter>
    </MotionCard>
  );
};

export default ProjectCard;
