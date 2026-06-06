import React, { useState } from 'react';
import isValidDomain from 'is-valid-domain';
import {
  ListItem,
  Input,
  FieldHelperText,
  Kbd,
  Link,
} from '@chakra-ui/react';

import { toaster } from '../../../hooks/useToast';
import { Domain } from '../../../types/prisma';

export type DomainListProps = {
  defaultValue: Domain[];
  onChange: (domains: string[]) => void;
};

export const DomainList: React.FC<DomainListProps> = ({
  defaultValue = [],
  onChange,
}) => {
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
    if (e.key !== 'Enter' || !current) return;

    if (!current.startsWith('localhost') && !isValidDomain(current)) {
      return toaster.create({
        type: 'error',
        description: 'Invalid domain name',
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
  };

  return (
    <>
      <ul style={{ marginBottom: '1.25rem', paddingLeft: '1.25rem' }}>
        {list.map((item: string, index: number) => {
          return (
            <ListItem key={index}>
              {item}{' '}
              <Link color="gray" onClick={() => handleRemoveItem(item)}>
                (remove)
              </Link>
            </ListItem>
          );
        })}
      </ul>
      <Input
        type="url"
        value={current}
        onChange={handleOnChange}
        onKeyPress={handleOnEnterKey}
        placeholder="domain.com"
      />
      <FieldHelperText>
        Press <Kbd>Enter</Kbd>
      </FieldHelperText>
    </>
  );
};

export default DomainList;
