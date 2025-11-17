import { Box, Skeleton, SkeletonText, VStack, HStack } from '@chakra-ui/react';

/**
 * Feedback List Skeleton Loader
 * Shows while feedback list is loading
 */
export const FeedbackListSkeleton = () => {
  return (
    <VStack spacing={4} w="full" align="stretch">
      {[1, 2, 3, 4, 5].map((i) => (
        <Box
          key={i}
          p={5}
          borderWidth={1}
          borderRadius="lg"
          bg="white"
          boxShadow="sm"
        >
          <HStack spacing={4} mb={3}>
            <Skeleton height="40px" width="40px" borderRadius="full" />
            <Box flex={1}>
              <Skeleton height="16px" width="30%" mb={2} />
              <Skeleton height="12px" width="50%" />
            </Box>
          </HStack>
          <SkeletonText mt={4} noOfLines={3} spacing={2} />
        </Box>
      ))}
    </VStack>
  );
};

/**
 * Project Card Skeleton Loader
 */
export const ProjectCardSkeleton = () => {
  return (
    <Box
      p={6}
      borderWidth={1}
      borderRadius="lg"
      bg="white"
      boxShadow="sm"
    >
      <Skeleton height="24px" width="60%" mb={4} />
      <SkeletonText noOfLines={2} spacing={2} mb={4} />
      <HStack spacing={3}>
        <Skeleton height="32px" width="80px" borderRadius="md" />
        <Skeleton height="32px" width="80px" borderRadius="md" />
      </HStack>
    </Box>
  );
};

/**
 * Dashboard Skeleton Loader
 */
export const DashboardSkeleton = () => {
  return (
    <Box p={8}>
      <Skeleton height="40px" width="300px" mb={8} />
      <VStack spacing={6} align="stretch">
        <HStack spacing={6}>
          {[1, 2, 3].map((i) => (
            <Box key={i} flex={1} p={6} borderWidth={1} borderRadius="lg" bg="white">
              <Skeleton height="20px" width="40%" mb={3} />
              <Skeleton height="48px" width="80%" />
            </Box>
          ))}
        </HStack>
        <ProjectCardSkeleton />
        <FeedbackListSkeleton />
      </VStack>
    </Box>
  );
};

/**
 * Form Skeleton Loader
 */
export const FormSkeleton = () => {
  return (
    <VStack spacing={4} align="stretch">
      {[1, 2, 3].map((i) => (
        <Box key={i}>
          <Skeleton height="14px" width="100px" mb={2} />
          <Skeleton height="40px" width="100%" borderRadius="md" />
        </Box>
      ))}
      <Skeleton height="44px" width="120px" borderRadius="md" mt={4} />
    </VStack>
  );
};

export default FeedbackListSkeleton;
