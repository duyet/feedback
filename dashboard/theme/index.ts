import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

/**
 * Custom Chakra UI Theme
 * Extends the default theme with custom colors, fonts, and component styles
 */
const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#e6f2ff',
      100: '#bbd9ff',
      200: '#90c1ff',
      300: '#65a9ff',
      400: '#3a91ff',
      500: '#0f79ff',
      600: '#0c61cc',
      700: '#094999',
      800: '#063166',
      900: '#031933',
    },
  },
  fonts: {
    heading: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '600',
        borderRadius: 'lg',
      },
      sizes: {
        lg: {
          h: '12',
          fontSize: 'lg',
          px: '6',
        },
      },
      variants: {
        solid: {
          _hover: {
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          },
          transition: 'all 0.2s',
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: 'xl',
          boxShadow: 'md',
          transition: 'all 0.2s',
          _hover: {
            boxShadow: 'xl',
          },
        },
      },
    },
    Input: {
      variants: {
        filled: {
          field: {
            borderRadius: 'lg',
            _focus: {
              borderColor: 'brand.500',
            },
          },
        },
      },
      defaultProps: {
        focusBorderColor: 'brand.500',
      },
    },
    Textarea: {
      variants: {
        filled: {
          borderRadius: 'lg',
          _focus: {
            borderColor: 'brand.500',
          },
        },
      },
      defaultProps: {
        focusBorderColor: 'brand.500',
      },
    },
    Badge: {
      baseStyle: {
        borderRadius: 'full',
        px: 3,
        py: 1,
        fontWeight: '600',
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.900',
      },
      '::-webkit-scrollbar': {
        width: '8px',
      },
      '::-webkit-scrollbar-track': {
        background: 'gray.100',
      },
      '::-webkit-scrollbar-thumb': {
        background: 'gray.400',
        borderRadius: '4px',
        _hover: {
          background: 'gray.500',
        },
      },
    },
  },
  shadows: {
    outline: '0 0 0 3px rgba(15, 121, 255, 0.6)',
  },
});

export default theme;
