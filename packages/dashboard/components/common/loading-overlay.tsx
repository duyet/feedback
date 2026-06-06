import {
  Box,
  Flex,
  Spinner,
  Text,
  Progress,
  VStack,
} from '@chakra-ui/react';
import { useColorModeValue } from '../ui/color-mode';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
  progress?: number;
  fullScreen?: boolean;
}

/**
 * Loading Overlay Component
 * Beautiful loading overlay with progress indicator
 */
export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  message = 'Loading...',
  progress,
  fullScreen = false,
}) => {
  const bgColor = useColorModeValue('whiteAlpha.900', 'blackAlpha.900');

  return (
    <AnimatePresence>
      {isLoading && (
        <MotionBox
          position={fullScreen ? 'fixed' : 'absolute'}
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={bgColor}
          backdropFilter="blur(8px)"
          zIndex={9999}
          display="flex"
          alignItems="center"
          justifyContent="center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <VStack gap={4}>
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Spinner
                size="xl"
                color="blue.500"
              />
            </motion.div>

            <Text
              fontSize="lg"
              fontWeight="medium"
              color="gray.600"
              textAlign="center"
            >
              {message}
            </Text>

            {typeof progress === 'number' && (
              <Box w="200px">
                <Progress.Root
                  value={progress}
                  size="sm"
                  colorPalette="blue"
                  borderRadius="full"
                >
                  <Progress.Track borderRadius="full">
                    <Progress.Range />
                  </Progress.Track>
                </Progress.Root>
                <Text fontSize="sm" color="gray.500" textAlign="center" mt={2}>
                  {Math.round(progress)}%
                </Text>
              </Box>
            )}
          </VStack>
        </MotionBox>
      )}
    </AnimatePresence>
  );
};

/**
 * Inline Loading Component
 * Small loading indicator for inline use
 */
export const InlineLoading: React.FC<{ message?: string }> = ({
  message = 'Loading...',
}) => {
  return (
    <Flex align="center" justify="center" gap={3} py={8}>
      <Spinner size="md" color="blue.500" />
      <Text color="gray.600">{message}</Text>
    </Flex>
  );
};

/**
 * Button Loading State
 * Loading state for buttons
 */
export const ButtonLoading: React.FC<{ message?: string }> = ({
  message = 'Please wait...',
}) => {
  return (
    <Flex align="center" gap={2}>
      <Spinner size="sm" />
      <Text>{message}</Text>
    </Flex>
  );
};

export default LoadingOverlay;
