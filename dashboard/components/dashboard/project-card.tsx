import {
  CardRoot,
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
  StatRoot,
  StatLabel,
  StatValueText,
  StatHelpText,
  Flex,
  IconButton,
  MenuRoot,
  MenuTrigger,
  MenuPositioner,
  MenuContent,
  MenuItem,
  MenuSeparator,
} from '@chakra-ui/react';
import { useColorModeValue } from '../ui/color-mode';
import {
  FiMessageSquare,
  FiUsers,
  FiGlobe,
  FiSettings,
  FiMoreVertical,
  FiTrash2,
  FiExternalLink,
} from 'react-icons/fi';
import Link from 'next/link';

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
    <CardRoot
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
      transition="all 0.2s"
    >
      <CardHeader pb={2}>
        <Flex justify="space-between" align="start">
          <VStack align="start" gap={1} flex={1}>
            <Heading size="md" mb={1}>
              {name}
            </Heading>
            {domains.length > 0 && (
              <HStack gap={2} flexWrap="wrap">
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

          <MenuRoot>
            <MenuTrigger asChild>
              <IconButton
                aria-label="Project options"
                size="sm"
                variant="ghost"
                _hover={{ bg: hoverBg }}
              >
                <FiMoreVertical />
              </IconButton>
            </MenuTrigger>
            <MenuPositioner>
              <MenuContent>
                <Link href={`/dashboard?project=${id}`} passHref>
                  <MenuItem asChild value="open-dashboard">
                    <a><FiExternalLink /> Open Dashboard</a>
                  </MenuItem>
                </Link>
                <Link href={`/project/${id}/settings`} passHref>
                  <MenuItem asChild value="settings">
                    <a><FiSettings /> Settings</a>
                  </MenuItem>
                </Link>
                <MenuSeparator />
                <MenuItem
                  value="delete"
                  color="red.500"
                  onClick={() => onDelete?.(id)}
                  disabled={isDeleting}
                >
                  <FiTrash2 /> Delete Project
                </MenuItem>
              </MenuContent>
            </MenuPositioner>
          </MenuRoot>
        </Flex>
      </CardHeader>

      <CardBody py={4}>
        <HStack gap={4} justify="space-around">
          <StatRoot
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
            <StatValueText fontSize="2xl" fontWeight="bold" color="blue.600">
              {feedbackCount}
            </StatValueText>
            <StatHelpText fontSize="xs" m={0}>
              {feedbackCount === 1 ? 'item' : 'items'}
            </StatHelpText>
          </StatRoot>

          <StatRoot
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
            <StatValueText fontSize="2xl" fontWeight="bold" color="blue.600">
              {memberCount}
            </StatValueText>
            <StatHelpText fontSize="xs" m={0}>
              {memberCount === 1 ? 'member' : 'members'}
            </StatHelpText>
          </StatRoot>
        </HStack>
      </CardBody>

      <CardFooter pt={0} pb={4}>
        <HStack w="full" gap={3}>
          <Link href={`/dashboard?project=${id}`} passHref style={{ flex: 1 }}>
            <Button
              colorScheme="blue"
              size="md"
              w="full"
              _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
              transition="all 0.2s"
            >
              <FiMessageSquare /> View Feedback
            </Button>
          </Link>
          <Link href={`/project/${id}/settings`} passHref>
            <IconButton
              aria-label="Project settings"
              colorScheme="gray"
              variant="outline"
              _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
              transition="all 0.2s"
            >
              <FiSettings />
            </IconButton>
          </Link>
        </HStack>
      </CardFooter>
    </CardRoot>
  );
};

export default ProjectCard;
