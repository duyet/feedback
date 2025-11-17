import { Container, Box, ContainerProps } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface ResponsiveContainerProps extends ContainerProps {
  animate?: boolean;
}

/**
 * Responsive Container Component
 * Mobile-first responsive container with optional animations
 */
export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  animate = false,
  ...props
}) => {
  if (animate) {
    return (
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Container
          maxW={{
            base: '100%',
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
          }}
          px={{ base: 4, sm: 6, md: 8 }}
          {...props}
        >
          {children}
        </Container>
      </MotionBox>
    );
  }

  return (
    <Container
      maxW={{
        base: '100%',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      }}
      px={{ base: 4, sm: 6, md: 8 }}
      {...props}
    >
      {children}
    </Container>
  );
};

/**
 * Responsive Grid
 * Responsive grid with mobile-first breakpoints
 */
export const ResponsiveGrid: React.FC<{
  children: React.ReactNode;
  columns?: { base?: number; sm?: number; md?: number; lg?: number; xl?: number };
  spacing?: number | { base?: number; sm?: number; md?: number; lg?: number };
}> = ({ children, columns = { base: 1, sm: 2, md: 3, lg: 4 }, spacing = 6 }) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns={{
        base: `repeat(${columns.base || 1}, 1fr)`,
        sm: `repeat(${columns.sm || 2}, 1fr)`,
        md: `repeat(${columns.md || 3}, 1fr)`,
        lg: `repeat(${columns.lg || 4}, 1fr)`,
        xl: `repeat(${columns.xl || columns.lg || 4}, 1fr)`,
      }}
      gap={spacing}
    >
      {children}
    </Box>
  );
};

export default ResponsiveContainer;
