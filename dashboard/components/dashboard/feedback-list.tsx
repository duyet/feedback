import useSWR from "swr";
import React from "react";
import { Alert, Spinner } from "@chakra-ui/react";

import Feedback from "./feedback-item";
import { Feedback as FeedbackProps } from "../../types/prisma";

export type Props = {
  project: string;
  domain: string;
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const FeedbackList: React.FC<Props> = ({ project, domain }) => {
  const url = `/api/feedback/list?project=${project}&domain=${domain}`;
  const { data, error } = useSWR(url, fetcher);

  console.log("err", error);

  if (error) return <Alert status="error">Error ...</Alert>;
  if (!data) return <Spinner />;

  return (
    <>
      {data.map((feedback: FeedbackProps) => (
        <Feedback key={feedback.id} feedback={feedback} />
      ))}
    </>
  );
};

export default FeedbackList;
