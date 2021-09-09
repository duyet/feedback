import React from 'react';
import { useRouter } from 'next/router';
import { Button, useToast } from '@chakra-ui/react';
import { SmallAddIcon } from '@chakra-ui/icons';
import { useSWRConfig } from 'swr';

export const AddProject: React.FC = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const toast = useToast();

  const handleAddProject = async () => {
    const res = await fetch('/api/project/create');
    const data = await res.json();

    toast({
      title: 'Successfully',
      description: `Created project ${data.project.name}`,
      status: 'success',
    });

    router.push(`/dashboard?project=${data.projectId}`);
    mutate('/api/project');
  };

  return (
    <Button onClick={handleAddProject}>
      <SmallAddIcon />
    </Button>
  );
};

export default AddProject;
