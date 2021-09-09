import React, { useState } from 'react';
import isValidDomain from 'is-valid-domain';
import {
  ListItem,
  UnorderedList,
  Input,
  FormHelperText,
  Kbd,
  useToast,
  Link,
} from '@chakra-ui/react';

import { Domain } from '../../types/prisma';

export type DomainListProps = {
  defaultValue: Domain[];
  onChange: (domains: string[]) => void;
};

export const DomainList: React.FC<DomainListProps> = ({
  defaultValue = [],
  onChange,
}) => {
  const toast = useToast();
  const [list, setList] = useState<string[]>(
    defaultValue.map((domain: Domain) => domain.domain)
  );
  const [current, setCurrent] = useState<string>();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrent(e.currentTarget.value);
  };

  const handleRemoveItem = (value: string) => {
    const removed = list.filter((item: string) => item !== value);

    setList(removed);

    // Notify outside that the domain list has changed
    onChange(removed);
  };

  const handleOnEnterKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && current) {
      if (!current.startsWith('localhost') && !isValidDomain(current)) {
        return toast({
          status: 'error',
          description: 'Invalid domain name',
          isClosable: true,
        });
      }

      // Local duplicated
      if (list.includes(current)) {
        return setCurrent('');
      }

      const appended = [...list, current];
      setList(appended);

      // Notify outside that the domain list has changed
      onChange(appended);

      // Clear the input
      setCurrent('');
    }
  };

  return (
    <>
      <UnorderedList mb={5}>
        {list.map((item: string, index: number) => {
          return (
            <ListItem key={index}>
              {item}{' '}
              <Link colorScheme="gray" onClick={() => handleRemoveItem(item)}>
                (remove)
              </Link>
            </ListItem>
          );
        })}
      </UnorderedList>
      <Input
        type="url"
        value={current}
        onChange={handleOnChange}
        onKeyDown={handleOnEnterKey}
        placeholder="domain.com"
      />
      <FormHelperText>
        Press <Kbd>Enter</Kbd>
      </FormHelperText>
    </>
  );
};

export default DomainList;
