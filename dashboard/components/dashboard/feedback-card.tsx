import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Tag,
  Text,
  VStack,
  useColorModeValue,
  Collapse,
  Image,
  Badge,
  Tooltip,
} from '@chakra-ui/react';
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
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

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
    <MotionCard
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.01 }}
    >
      <CardHeader pb={2}>
        <Flex justify="space-between" align="start">
          <VStack align="start" spacing={1} flex={1}>
            <HStack spacing={2}>
              {name ? (
                <HStack spacing={2}>
                  <Icon as={FiUser} color="blue.500" />
                  <Text fontWeight="semibold" fontSize="md">
                    {name}
                  </Text>
                </HStack>
              ) : (
                <Badge colorScheme="gray">Anonymous</Badge>
              )}
              {email && (
                <Tooltip label={email} placement="top">
                  <HStack spacing={1} fontSize="sm" color={textColor}>
                    <Icon as={FiMail} boxSize={3} />
                    <Text isTruncated maxW="200px">
                      {email}
                    </Text>
                  </HStack>
                </Tooltip>
              )}
            </HStack>
            <HStack spacing={2} fontSize="xs" color={textColor}>
              <Icon as={FiClock} />
              <Text>{formattedDate}</Text>
            </HStack>
          </VStack>

          <HStack spacing={2}>
            {screenshot && !imageError && (
              <Tooltip label="Has screenshot" placement="top">
                <Badge colorScheme="green" variant="subtle">
                  <HStack spacing={1}>
                    <Icon as={FiImage} boxSize={3} />
                    <Text>Screenshot</Text>
                  </HStack>
                </Badge>
              </Tooltip>
            )}
            <IconButton
              aria-label="Delete feedback"
              icon={<FiTrash2 />}
              size="sm"
              variant="ghost"
              colorScheme="red"
              onClick={() => onDelete?.(id)}
              isLoading={isDeleting}
              _hover={{ bg: 'red.50' }}
            />
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
          <HStack mt={3} spacing={2} fontSize="sm" color={textColor}>
            <Icon as={FiGlobe} />
            <Tooltip label={url} placement="top">
              <Text isTruncated maxW="400px" cursor="pointer">
                {url}
              </Text>
            </Tooltip>
          </HStack>
        )}
      </CardBody>

      <CardFooter pt={0}>
        <VStack w="full" spacing={2} align="stretch">
          {(screenshot || deviceInfo) && (
            <>
              <Button
                size="sm"
                variant="ghost"
                rightIcon={isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                onClick={() => setIsExpanded(!isExpanded)}
                w="full"
                justifyContent="space-between"
              >
                <Text>Additional Details</Text>
              </Button>

              <Collapse in={isExpanded} animateOpacity>
                <VStack spacing={3} align="stretch">
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
                      <VStack align="start" spacing={1}>
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
              </Collapse>
            </>
          )}
        </VStack>
      </CardFooter>
    </MotionCard>
  );
};

export default FeedbackCard;
