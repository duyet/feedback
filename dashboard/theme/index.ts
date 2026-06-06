import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
  defineSlotRecipe,
} from '@chakra-ui/react';

/**
 * Custom Chakra UI Theme (v3)
 * Uses createSystem + defineConfig with token-based design tokens
 */
const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: '#e6f2ff' },
          100: { value: '#bbd9ff' },
          200: { value: '#90c1ff' },
          300: { value: '#65a9ff' },
          400: { value: '#3a91ff' },
          500: { value: '#0f79ff' },
          600: { value: '#0c61cc' },
          700: { value: '#094999' },
          800: { value: '#063166' },
          900: { value: '#031933' },
        },
      },
      fonts: {
        heading: {
          value: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
        },
        body: {
          value: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
        },
      },
      fontSizes: {
        xs: { value: '0.75rem' },
        sm: { value: '0.875rem' },
        md: { value: '1rem' },
        lg: { value: '1.125rem' },
        xl: { value: '1.25rem' },
        '2xl': { value: '1.5rem' },
        '3xl': { value: '1.875rem' },
        '4xl': { value: '2.25rem' },
        '5xl': { value: '3rem' },
      },
      shadows: {
        outline: { value: '0 0 0 3px rgba(15, 121, 255, 0.6)' },
      },
    },
    recipes: {
      button: defineRecipe({
        base: {
          fontWeight: '600',
          borderRadius: 'lg',
        },
        variants: {
          size: {
            lg: {
              h: '12',
              fontSize: 'lg',
              px: '6',
            },
          },
          variant: {
            solid: {
              _hover: {
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              },
              transition: 'all 0.2s',
            },
          },
        },
      }),
      input: defineRecipe({
        variants: {
          variant: {
            filled: {
              borderRadius: 'lg',
              _focus: {
                borderColor: 'brand.500',
              },
            },
          },
        },
      }),
      textarea: defineRecipe({
        variants: {
          variant: {
            filled: {
              borderRadius: 'lg',
              _focus: {
                borderColor: 'brand.500',
              },
            },
          },
        },
      }),
      badge: defineRecipe({
        base: {
          borderRadius: 'full',
          px: '3',
          py: '1',
          fontWeight: '600',
        },
      }),
    },
    slotRecipes: {
      card: defineSlotRecipe({
        slots: ['root'],
        base: {
          root: {
            borderRadius: 'xl',
            boxShadow: 'md',
            transition: 'all 0.2s',
            _hover: {
              boxShadow: 'xl',
            },
          },
        },
      }),
    },
  },
  globalCss: {
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
});

export const system = createSystem(defaultConfig, config);

export default system;
