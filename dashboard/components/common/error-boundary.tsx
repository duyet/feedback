import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Button, Heading, Text, VStack, Code } from '@chakra-ui/react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Global Error Boundary Component
 * Catches React errors and displays a user-friendly error UI
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // In production, you could send this to an error reporting service
    // Example: Sentry.captureException(error, { extra: errorInfo });

    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <Box
          minH="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={8}
          bg="gray.50"
        >
          <VStack
            gap={6}
            maxW="600px"
            bg="white"
            p={8}
            borderRadius="lg"
            boxShadow="lg"
          >
            <Heading size="lg" color="red.500">
              Oops! Something went wrong
            </Heading>

            <Text color="gray.600" textAlign="center">
              We're sorry for the inconvenience. The application encountered an
              unexpected error.
            </Text>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <Box w="full" bg="gray.100" p={4} borderRadius="md" overflow="auto">
                <Text fontWeight="bold" mb={2}>
                  Error Details:
                </Text>
                <Code colorScheme="red" p={2} fontSize="sm" display="block">
                  {this.state.error.toString()}
                </Code>
                {this.state.errorInfo && (
                  <Code
                    mt={2}
                    p={2}
                    fontSize="xs"
                    display="block"
                    whiteSpace="pre-wrap"
                  >
                    {this.state.errorInfo.componentStack}
                  </Code>
                )}
              </Box>
            )}

            <VStack gap={3} w="full">
              <Button
                colorScheme="blue"
                onClick={this.handleReset}
                w="full"
                aria-label="Try again"
              >
                Try Again
              </Button>
              <Button
                variant="outline"
                onClick={() => (window.location.href = '/')}
                w="full"
                aria-label="Go to homepage"
              >
                Go to Homepage
              </Button>
            </VStack>

            {process.env.NODE_ENV === 'production' && (
              <Text fontSize="sm" color="gray.500">
                If this problem persists, please contact support.
              </Text>
            )}
          </VStack>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
