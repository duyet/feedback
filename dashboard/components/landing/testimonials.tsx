import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';

const Testimonial = ({ children }: { children: ReactNode }) => {
  return <Box>{children}</Box>;
};

const TestimonialContent = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'lg'}
      p={8}
      rounded={'xl'}
      align={'center'}
      pos={'relative'}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: 'solid transparent',
        borderLeftWidth: 16,
        borderRight: 'solid transparent',
        borderRightWidth: 16,
        borderTop: 'solid',
        borderTopWidth: 16,
        borderTopColor: useColorModeValue('white', 'gray.800'),
        pos: 'absolute',
        bottom: '-16px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      {children}
    </Stack>
  );
};

const TestimonialHeading = ({ children }: { children: ReactNode }) => {
  return (
    <Heading as={'h3'} fontSize={'xl'}>
      {children}
    </Heading>
  );
};

const TestimonialText = ({ children }: { children: ReactNode }) => {
  return (
    <Text
      textAlign={'center'}
      color={useColorModeValue('gray.600', 'gray.400')}
      fontSize={'sm'}
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
    <Flex align={'center'} mt={8} direction={'column'}>
      <Avatar src={src} alt={name} mb={2} />
      <Stack spacing={-1} align={'center'}>
        <Text fontWeight={600}>{name}</Text>
        <Text fontSize={'sm'} color={useColorModeValue('gray.600', 'gray.400')}>
          {title}
        </Text>
      </Stack>
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
    <Box bg={useColorModeValue('gray.100', 'gray.700')} borderRadius={10}>
      <Container maxW={'7xl'} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={'center'}>
          <Heading>Our Clients Says</Heading>
          <Text>We have been working with clients around the world :))</Text>
        </Stack>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 10, md: 4, lg: 10 }}
        >
          <TestimonialItem
            heading="Efficient Collaborating"
            content={lorem}
            name={'Duyet'}
            title={'Data Engineer'}
            avatar="https://ca.slack-edge.com/T099A8DM3-UDPR7BEFK-3eed1926ad60-512"
          />
          <TestimonialItem
            heading="Mindblowing Service"
            content={lorem}
            name={'Duyet'}
            title={'Data Engineer'}
            avatar="https://ca.slack-edge.com/T099A8DM3-UDPR7BEFK-3eed1926ad60-512"
          />
          <TestimonialItem
            heading="Intuitive Design"
            content={lorem}
            name={'Duyet'}
            title={'Data Engineer'}
            avatar="https://ca.slack-edge.com/T099A8DM3-UDPR7BEFK-3eed1926ad60-512"
          />
        </Stack>
      </Container>
    </Box>
  );
}
