import {
  Button,
  Link,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  useToast,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  id: number;
};

export const ActionDelete: React.FC<Props> = ({ id }) => {
  const toast = useToast();

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/feedback/delete?id=${id}`, {
        method: "DELETE",
      });
      console.log(res);
      toast({ title: "Deleted", status: "info", isClosable: true });
    } catch (e) {
      console.error(e);
      toast({
        title: "Something went wrong!",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Link color="red">Delete</Link>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverCloseButton />
        <PopoverBody border={0}>Are you sure?</PopoverBody>
        <PopoverFooter border={0} textAlign="right">
          <Button colorScheme="red" onClick={handleDelete}>
            Delete
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};
