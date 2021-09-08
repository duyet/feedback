import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Box, Spinner, Text } from "@chakra-ui/react";

export const InitProject: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    async function initProject() {
      await fetch("/api/project/create");
      router.push("/dashboard");
    }

    initProject();
  }, [router]);

  return (
    <Box mb={10} mt={10} textAlign="center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        mb={5}
      />
      <Text>Initial ...</Text>
    </Box>
  );
};

export default InitProject;
