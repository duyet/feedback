import {
  Box,
  Button,
  CardRoot,
  CardBody,
  CardHeader,
  CardFooter,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
  Badge,
  TooltipRoot,
  TooltipTrigger,
  TooltipPositioner,
  TooltipContent,
  Image,
} from '@chakra-ui/react';
import { useColorModeValue } from '../ui/color-mode';
import { useState } from 'react';
import {
  FiMail,
  FiUser,
  FiGlobe,
  FiTrash2,
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiImage,
} from 'react-icons/fi';

interface FeedbackCardProps {
  id: number;
  message?: string;
  email?: string;
  name?: string;
  url?: string;
  screenshot?: string;
  device?: string;
  createdAt: string;
  onDelete?: (id: number) => void;
  isDeleting?: boolean;
}

/**
 * Enhanced Feedback Card Component
 * Beautiful card with animations, expandable details, and better UX
 */
export const FeedbackCard: React.FC<FeedbackCardProps> = ({
  id,
  message,
  email,
  name,
  url,
  screenshot,
  device,
  createdAt,
  onDelete,
  isDeleting = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const deviceInfo = device ? JSON.parse(device) : null;

  return (
    <CardRoot
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      overflow="hidden"
      boxShadow="sm"
      _hover={{
        boxShadow: 'md',
        borderColor: 'blue.400',
      }}
    >
      <CardHeader pb={2}>
        <Flex justify="space-between" align="start">
          <VStack align="start" gap={1} flex={1}>
            <HStack gap={2}>
              {name ? (
                <HStack gap={2}>
                  <Icon as={FiUser} color="blue.500" />
                  <Text fontWeight="semibold" fontSize="md">
                    {name}
                  </Text>
                </HStack>
              ) : (
                <Badge colorScheme="gray">Anonymous</Badge>
              )}
              {email && (
                <TooltipRoot>
                  <TooltipTrigger asChild>
                    <HStack gap={1} fontSize="sm" color={textColor}>
                      <Icon as={FiMail} boxSize={3} />
                      <Text truncate maxW="200px">
                        {email}
                      </Text>
                    </HStack>
                  </TooltipTrigger>
                  <TooltipPositioner>
                    <TooltipContent>{email}</TooltipContent>
                  </TooltipPositioner>
                </TooltipRoot>
              )}
            </HStack>
            <HStack gap={2} fontSize="xs" color={textColor}>
              <Icon as={FiClock} />
              <Text>{formattedDate}</Text>
            </HStack>
          </VStack>

          <HStack gap={2}>
            {screenshot && !imageError && (
              <TooltipRoot>
                <TooltipTrigger asChild>
                  <Badge colorScheme="green" variant="subtle">
                    <HStack gap={1}>
                      <Icon as={FiImage} boxSize={3} />
                      <Text>Screenshot</Text>
                    </HStack>
                  </Badge>
                </TooltipTrigger>
                <TooltipPositioner>
                  <TooltipContent>Has screenshot</TooltipContent>
                </TooltipPositioner>
              </TooltipRoot>
            )}
            <IconButton
              aria-label="Delete feedback"
              size="sm"
              variant="ghost"
              colorScheme="red"
              onClick={() => onDelete?.(id)}
              loading={isDeleting}
              _hover={{ bg: 'red.50' }}
            >
              <FiTrash2 />
            </IconButton>
          </HStack>
        </Flex>
      </CardHeader>

      <CardBody py={3}>
        <Box
          bg={hoverBg}
          p={4}
          borderRadius="md"
          borderLeft="4px solid"
          borderLeftColor="blue.400"
        >
          <Text fontSize="md" lineHeight="tall" whiteSpace="pre-wrap">
            {message || (
              <Text as="i" color="gray.400">
                No message provided
              </Text>
            )}
          </Text>
        </Box>

        {url && (
          <HStack mt={3} gap={2} fontSize="sm" color={textColor}>
            <Icon as={FiGlobe} />
            <TooltipRoot>
              <TooltipTrigger asChild>
                <Text truncate maxW="400px" cursor="pointer">
                  {url}
                </Text>
              </TooltipTrigger>
              <TooltipPositioner>
                <TooltipContent>{url}</TooltipContent>
              </TooltipPositioner>
            </TooltipRoot>
          </HStack>
        )}
      </CardBody>

      <CardFooter pt={0}>
        <VStack w="full" gap={2} align="stretch">
          {(screenshot || deviceInfo) && (
            <>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsExpanded(!isExpanded)}
                w="full"
                justifyContent="space-between"
              >
                <Text>Additional Details</Text>
                {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
              </Button>

              {isExpanded && (
                <VStack gap={3} align="stretch">
                  {deviceInfo && (
                    <Box
                      p={3}
                      bg={hoverBg}
                      borderRadius="md"
                      fontSize="sm"
                    >
                      <Text fontWeight="semibold" mb={2}>
                        Device Information:
                      </Text>
                      <VStack align="start" gap={1}>
                        {deviceInfo.osName && (
                          <Text>
                            <strong>OS:</strong> {deviceInfo.osName}{' '}
                            {deviceInfo.osVersion}
                          </Text>
                        )}
                        {deviceInfo.browserName && (
                          <Text>
                            <strong>Browser:</strong> {deviceInfo.browserName}{' '}
                            {deviceInfo.fullBrowserVersion}
                          </Text>
                        )}
                        {deviceInfo.deviceType && (
                          <Text>
                            <strong>Device:</strong> {deviceInfo.deviceType}
                          </Text>
                        )}
                      </VStack>
                    </Box>
                  )}

                  {screenshot && !imageError && (
                    <Box>
                      <Text fontWeight="semibold" mb={2} fontSize="sm">
                        Screenshot:
                      </Text>
                      <Image
                        src={screenshot}
                        alt="User screenshot"
                        borderRadius="md"
                        maxH="300px"
                        objectFit="contain"
                        cursor="pointer"
                        onClick={() => window.open(screenshot, '_blank')}
                        onError={() => setImageError(true)}
                        _hover={{ opacity: 0.8 }}
                        transition="opacity 0.2s"
                      />
                    </Box>
                  )}
                </VStack>
              )}
            </>
          )}
        </VStack>
      </CardFooter>
    </CardRoot>
  );
};

export default FeedbackCard;
