import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { useColorModeValue } from '../ui/color-mode';
import { motion } from 'framer-motion';
import {
  FiInbox,
  FiPlus,
  FiSearch,
  FiAlertCircle,
  FiCheckCircle,
} from 'react-icons/fi';

const MotionBox = motion(Box);

interface EnhancedEmptyStateProps {
  icon?: React.ElementType;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: React.ElementType;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  type?: 'empty' | 'error' | 'success' | 'search';
}

/**
 * Enhanced Empty State Component
 * Beautiful empty states with animations and call-to-action
 */
export const EnhancedEmptyState: React.FC<EnhancedEmptyStateProps> = ({
  icon: CustomIcon,
  title,
  description,
  action,
  secondaryAction,
  type = 'empty',
}) => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const iconColor = useColorModeValue('gray.400', 'gray.600');

  const defaultIcons = {
    empty: FiInbox,
    error: FiAlertCircle,
    success: FiCheckCircle,
    search: FiSearch,
  };

  const iconColorMap = {
    empty: 'gray',
    error: 'red',
    success: 'green',
    search: 'blue',
  };

  const IconComponent = CustomIcon || defaultIcons[type];
  const colorPalette = iconColorMap[type];

  return (
    <Flex
      minH="400px"
      align="center"
      justify="center"
      p={8}
      bg={bgColor}
      borderRadius="xl"
    >
      <VStack gap={6} maxW="md" textAlign="center">
        <MotionBox
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            duration: 0.6,
          }}
        >
          <Flex
            w="120px"
            h="120px"
            borderRadius="full"
            bg={`${colorPalette}.50`}
            align="center"
            justify="center"
            boxShadow="xl"
          >
            <Icon
              as={IconComponent}
              boxSize={16}
              color={`${colorPalette}.500`}
            />
          </Flex>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <Heading size="lg" mb={2}>
            {title}
          </Heading>
          <Text color="gray.600" fontSize="md" lineHeight="tall">
            {description}
          </Text>
        </MotionBox>

        {(action || secondaryAction) && (
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <VStack gap={3}>
              {action && (
                <Button
                  colorPalette={colorPalette}
                  size="lg"
                  onClick={action.onClick}
                  boxShadow="md"
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}
                  transition="all 0.2s"
                >
                  {action.icon && <Icon as={action.icon} />}
                  {action.label}
                </Button>
              )}
              {secondaryAction && (
                <Button
                  variant="ghost"
                  colorPalette={colorPalette}
                  onClick={secondaryAction.onClick}
                  _hover={{
                    transform: 'translateY(-2px)',
                  }}
                  transition="all 0.2s"
                >
                  {secondaryAction.label}
                </Button>
              )}
            </VStack>
          </MotionBox>
        )}
      </VStack>
    </Flex>
  );
};

// Preset empty states
export const NoFeedbackState: React.FC<{
  onCreateProject?: () => void;
}> = ({ onCreateProject }) => (
  <EnhancedEmptyState
    type="empty"
    title="No feedback yet"
    description="Get started by collecting feedback from your users. Create your first project to begin."
    action={
      onCreateProject
        ? {
            label: 'Create First Project',
            onClick: onCreateProject,
            icon: FiPlus,
          }
        : undefined
    }
  />
);

export const NoProjectsState: React.FC<{
  onCreate: () => void;
}> = ({ onCreate }) => (
  <EnhancedEmptyState
    type="empty"
    title="No projects yet"
    description="Projects help you organize feedback by domain or application. Create your first project to get started."
    action={{
      label: 'Create Project',
      onClick: onCreate,
      icon: FiPlus,
    }}
  />
);

export const NoSearchResultsState: React.FC<{
  onClearSearch: () => void;
}> = ({ onClearSearch }) => (
  <EnhancedEmptyState
    type="search"
    title="No results found"
    description="We couldn't find any feedback matching your search. Try adjusting your filters or search terms."
    action={{
      label: 'Clear Search',
      onClick: onClearSearch,
    }}
  />
);

export const ErrorState: React.FC<{
  onRetry: () => void;
}> = ({ onRetry }) => (
  <EnhancedEmptyState
    type="error"
    title="Something went wrong"
    description="We encountered an error while loading your data. Please try again or contact support if the problem persists."
    action={{
      label: 'Try Again',
      onClick: onRetry,
    }}
  />
);

export default EnhancedEmptyState;
