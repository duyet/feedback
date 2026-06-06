import {
  Button,
  Link,
  PopoverRoot,
  PopoverTrigger,
  PopoverPositioner,
  PopoverContent,
  PopoverCloseTrigger,
  PopoverBody,
  PopoverFooter,
} from '@chakra-ui/react';
import React from 'react';

import { toaster } from '../../../hooks/useToast';

type Props = {
  id: number;
};

export const ActionDelete: React.FC<Props> = ({ id }) => {
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/feedback/delete?id=${id}`, {
        method: 'DELETE',
      });
      toaster.create({ title: 'Deleted', type: 'info' });
    } catch (e) {
      console.error(e);
      toaster.create({
        title: 'Something went wrong!',
        type: 'error',
      });
    }
  };

  return (
    <PopoverRoot>
      <PopoverTrigger>
        <Link color="red">Delete</Link>
      </PopoverTrigger>
      <PopoverPositioner>
        <PopoverContent>
          <PopoverCloseTrigger />
          <PopoverBody border={0}>Are you sure?</PopoverBody>
          <PopoverFooter border={0} textAlign="right">
            <Button colorScheme="red" onClick={handleDelete}>
              Delete
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </PopoverPositioner>
    </PopoverRoot>
  );
};
