import React from "react";
import { useRouter } from "next/router";
import { Button } from "@chakra-ui/react";

export const AddProject: React.FC = () => {
  const router = useRouter();

  const handleAddProject = async () => {
    const res = await fetch("/api/project/create");
    const data = await res.json();
    router.push(`/dashboard?project=${data.projectId}`);
  };

  return <Button onClick={handleAddProject}>+</Button>;
};

export default AddProject;
