import React from "react";
import { Box, Flex, Tag, Text } from "@chakra-ui/react";

import { Meta } from "./meta";
import { Screenshot } from "./screenshot";
import { ActionDelete } from "./action-delete";
import { Feedback as FeedbackProps } from "../../../types/prisma";

const Feedback: React.FC<{ feedback: FeedbackProps }> = ({ feedback }) => {
  const { id, name, email, message, url, screenshot, createdAt } = feedback;

  return (
    <Box border={"1px solid #e2e8f0"} borderRadius={5} p={5} mb={5}>
      <Flex
        justifyContent="space-between"
        mb={5}
        flexDirection={["column", "row"]}
      >
        <Tag>{name ? `${name} (${email})` : email}</Tag>
        <Text color="gray.500" fontWeight={500}>
          {createdAt}
        </Text>
      </Flex>

      <Flex justifyContent="space-between" p={"10px 0"}>
        <Box>{message}</Box>
        {screenshot ? <Screenshot screenshot={screenshot} /> : null}
      </Flex>

      <Meta name={"URL"} value={url} isLink />

      <Flex mt={5} justifyContent="space-between">
        <Box />
        <ActionDelete id={id} />
      </Flex>
    </Box>
  );
};

export default Feedback;
