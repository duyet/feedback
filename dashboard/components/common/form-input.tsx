import {
  Field,
  Input,
  InputGroup,
  Textarea,
  IconButton,
  Icon,
} from '@chakra-ui/react';
import { useColorModeValue } from '../ui/color-mode';
import { useState } from 'react';
import { FiEye, FiEyeOff, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

const MotionFieldRoot = motion(Field.Root);

interface FormInputProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'url' | 'number' | 'textarea';
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  helperText?: string;
  placeholder?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  leftIcon?: React.ReactElement;
  isValidating?: boolean;
  isValid?: boolean;
  maxLength?: number;
  rows?: number;
}

/**
 * Enhanced Form Input Component
 * Beautiful form inputs with validation feedback, animations, and better UX
 */
export const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  helperText,
  placeholder,
  isRequired = false,
  isDisabled = false,
  leftIcon,
  isValidating = false,
  isValid = false,
  maxLength,
  rows = 4,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = useColorModeValue('gray.300', 'gray.600');
  const focusBorderColor = error ? 'red.500' : 'blue.500';
  const bgColor = useColorModeValue('white', 'gray.800');

  const inputType =
    type === 'password' ? (showPassword ? 'text' : 'password') : type;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value;
    if (maxLength && newValue.length > maxLength) return;
    onChange(newValue);
  };

  const renderInput = () => {
    const commonProps = {
      id: name,
      name,
      value,
      onChange: handleChange,
      onBlur: () => {
        setIsFocused(false);
        onBlur?.();
      },
      onFocus: () => setIsFocused(true),
      placeholder,
      disabled: isDisabled,
      borderColor: isFocused ? focusBorderColor : borderColor,
      _hover: { borderColor: focusBorderColor },
      _focus: {
        borderColor: focusBorderColor,
        boxShadow: `0 0 0 1px ${focusBorderColor}`,
      },
      bg: bgColor,
      transition: 'all 0.2s',
    };

    if (type === 'textarea') {
      return <Textarea {...commonProps} rows={rows} resize="vertical" />;
    }

    return (
      <InputGroup
        startElement={leftIcon}
        endElement={
          type === 'password' ? (
            <IconButton
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              size="sm"
              variant="ghost"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </IconButton>
          ) : isValidating ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <Icon as={FiAlertCircle} color="blue.500" />
            </motion.div>
          ) : !isValidating && isValid && !error && value ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              <Icon as={FiCheck} color="green.500" />
            </motion.div>
          ) : undefined
        }
      >
        <Input {...commonProps} type={inputType} />
      </InputGroup>
    );
  };

  return (
    <MotionFieldRoot
      invalid={!!error}
      required={isRequired}
      disabled={isDisabled}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Field.Label htmlFor={name} fontWeight="semibold">
        {label}
        {isRequired && (
          <span style={{ color: 'red', marginLeft: '4px' }}>*</span>
        )}
      </Field.Label>

      {renderInput()}

      {error ? (
        <Field.ErrorText>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Icon as={FiAlertCircle} mr={1} />
            {error}
          </motion.div>
        </Field.ErrorText>
      ) : helperText ? (
        <Field.HelperText>
          {helperText}
          {maxLength && (
            <span style={{ float: 'right' }}>
              {value.length}/{maxLength}
            </span>
          )}
        </Field.HelperText>
      ) : maxLength ? (
        <Field.HelperText textAlign="right">
          {value.length}/{maxLength}
        </Field.HelperText>
      ) : null}
    </MotionFieldRoot>
  );
};

export default FormInput;
