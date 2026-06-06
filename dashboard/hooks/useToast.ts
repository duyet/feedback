import { useToast as useChakraToast, UseToastOptions } from '@chakra-ui/react';

/**
 * Custom toast hook with predefined styles
 * Provides consistent toast notifications across the app
 */
export const useToast = () => {
  const toast = useChakraToast();

  const showToast = (options: UseToastOptions) => {
    return toast({
      position: 'top-right',
      duration: 4000,
      isClosable: true,
      ...options,
    });
  };

  return {
    success: (title: string, description?: string) =>
      showToast({
        title,
        description,
        status: 'success',
        icon: '✅',
      }),

    error: (title: string, description?: string) =>
      showToast({
        title,
        description,
        status: 'error',
        icon: '❌',
      }),

    warning: (title: string, description?: string) =>
      showToast({
        title,
        description,
        status: 'warning',
        icon: '⚠️',
      }),

    info: (title: string, description?: string) =>
      showToast({
        title,
        description,
        status: 'info',
        icon: 'ℹ️',
      }),

    loading: (title: string, description?: string) =>
      showToast({
        title,
        description,
        status: 'loading',
        duration: null, // Don't auto-dismiss loading toasts
      }),

    promise: async <T,>(
      promise: Promise<T>,
      options: {
        loading: string;
        success: string | ((data: T) => string);
        error: string | ((error: Error) => string);
      }
    ) => {
      const toastId = showToast({
        title: options.loading,
        status: 'loading',
        duration: null,
      });

      try {
        const data = await promise;
        toast.update(toastId, {
          title: typeof options.success === 'function' ? options.success(data) : options.success,
          status: 'success',
          duration: 4000,
          icon: '✅',
        });
        return data;
      } catch (error) {
        toast.update(toastId, {
          title: typeof options.error === 'function' ? options.error(error as Error) : options.error,
          status: 'error',
          duration: 5000,
          icon: '❌',
        });
        throw error;
      }
    },
  };
};

export default useToast;
