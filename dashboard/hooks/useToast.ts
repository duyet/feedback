import { createToaster } from '@chakra-ui/react';

/**
 * Chakra v3 toaster instance.
 * Usage:
 *   import { toaster } from '@/hooks/useToast';
 *   toaster.create({ title: 'Saved', type: 'success' })
 *   toaster.create({ title: 'Error', description: '...', type: 'error' })
 */
export const toaster = createToaster({
  placement: 'bottom-end',
});
