import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  AvatarRoot,
  AvatarImage,
  VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useColorModeValue } from '../ui/color-mode';

const MotionBox = motion.create(Box);
const MotionStack = motion.create(Stack);

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const Testimonial = ({ children }: { children: ReactNode }) => {
  return <Box>{children}</Box>;
};

const TestimonialContent = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={useColorModeValue('md', 'lg')}
      p={8}
      rounded="xl"
      align="center"
      pos="relative"
      gap={2}
      border="1px solid"
      borderColor={useColorModeValue('gray.100', 'gray.700')}
      _hover={{
        boxShadow: useColorModeValue('xl', '2xl'),
        transform: 'translateY(-2px)',
      }}
      transition="all 0.2s"
    >
      {children}
    </Stack>
  );
};

const TestimonialHeading = ({ children }: { children: ReactNode }) => {
  return (
    <Heading as="h3" fontSize="lg" fontWeight="semibold">
      {children}
    </Heading>
  );
};

const TestimonialText = ({ children }: { children: ReactNode }) => {
  return (
    <Text
      textAlign="center"
      color={useColorModeValue('gray.600', 'gray.400')}
      fontSize="sm"
      lineHeight="tall"
    >
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({
  src,
  name,
  title,
}: {
  src: string;
  name: string;
  title: string;
}) => {
  return (
    <Flex align="center" mt={8} direction="column">
      <AvatarRoot mb={2} ring="2px" ringColor={useColorModeValue('teal.200', 'teal.700')}>
        <AvatarImage src={src} />
      </AvatarRoot>
      <VStack gap={0} align="center">
        <Text fontWeight={600} fontSize="sm">
          {name}
        </Text>
        <Text fontSize="xs" color={useColorModeValue('gray.500', 'gray.400')}>
          {title}
        </Text>
      </VStack>
    </Flex>
  );
};

const TestimonialItem = ({
  heading,
  content,
  name,
  title,
  avatar,
}: {
  heading: string;
  content: string;
  name: string;
  title: string;
  avatar: string;
}) => (
  <Testimonial>
    <TestimonialContent>
      <TestimonialHeading>{heading}</TestimonialHeading>
      <TestimonialText>{content}</TestimonialText>
    </TestimonialContent>
    <TestimonialAvatar src={avatar} name={name} title={title} />
  </Testimonial>
);

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Auctor neque sed imperdiet nibh lectus feugiat nunc sem.`;

export default function WithSpeechBubbles() {
  return (
    <Box
      py={{ base: 16, md: 24 }}
      px={{ base: 4, md: 8 }}
      position="relative"
    >
      {/* Top gradient divider */}
      <Box
        position="absolute"
        top={0}
        left="10%"
        right="10%"
        height="1px"
        bgGradient="linear(to-r, transparent, gray.300, transparent)"
        opacity={useColorModeValue(0.6, 0.2)}
      />

      <VStack maxW="7xl" gap={{ base: 8, md: 12 }} mx="auto">
        <MotionBox
          textAlign="center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <Heading
            fontSize={{ base: '2xl', md: '3xl' }}
            fontWeight="extrabold"
            letterSpacing="tight"
          >
            Our Clients Say
          </Heading>
          <Text
            mt={2}
            color={useColorModeValue('gray.500', 'gray.400')}
            fontSize="lg"
          >
            We have been working with clients around the world :))
          </Text>
        </MotionBox>

        <MotionStack
          direction={{ base: 'column', md: 'row' }}
          gap={{ base: 10, md: 4, lg: 10 }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {[
            {
              heading: 'Efficient Collaborating',
              name: 'Duyet',
              title: 'Data Engineer',
            },
            {
              heading: 'Mindblowing Service',
              name: 'Duyet',
              title: 'Data Engineer',
            },
            {
              heading: 'Intuitive Design',
              name: 'Duyet',
              title: 'Data Engineer',
            },
          ].map((item) => (
            <MotionBox key={item.heading} variants={cardVariants} flex={1}>
              <TestimonialItem
                heading={item.heading}
                content={lorem}
                name={item.name}
                title={item.title}
                avatar="https://ca.slack-edge.com/T099A8DM3-UDPR7BEFK-3eed1926ad60-512"
              />
            </MotionBox>
          ))}
        </MotionStack>
      </VStack>
    </Box>
  );
}
