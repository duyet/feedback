import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

interface PageTransitionProps {
  children: ReactNode;
  key?: string;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.61, 1, 0.88, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

/**
 * Page Transition Component
 * Smooth page transitions with fade and slide effects
 */
export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  key,
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={key}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

/**
 * Stagger Children Animation
 * Animates children with a stagger effect
 */
export const StaggerChildren: React.FC<{ children: ReactNode; delay?: number }> = ({
  children,
  delay = 0.1,
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Fade In Animation
 */
export const FadeIn: React.FC<{ children: ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Slide In Animation
 */
export const SlideIn: React.FC<{
  children: ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
}> = ({ children, direction = 'up', delay = 0 }) => {
  const directionOffset = {
    left: { x: -50, y: 0 },
    right: { x: 50, y: 0 },
    up: { x: 0, y: 50 },
    down: { x: 0, y: -50 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, ...directionOffset[direction] }}
      transition={{ duration: 0.4, delay }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Scale In Animation
 */
export const ScaleIn: React.FC<{ children: ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, delay, type: 'spring', stiffness: 260, damping: 20 }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
