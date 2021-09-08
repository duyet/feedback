import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { Box, Heading, Grid, GridItem } from "@chakra-ui/react";

import Filter from "./filter";
import Feedback from "./feedback";
import Layout from "../../components/Layout";
import { DashboardPageProps, FeedbackProps } from "./types";

const Dashboard: NextPage<DashboardPageProps> = ({ domains, feedbacks }) => {
  const [selected, setSelected] = useState<string>();

  useEffect(() => {
    setSelected(domains?.[0]);
  }, [domains, setSelected]);

  return (
    <Layout maxW="container.lg">
      <Box mb={10}>
        <Heading>Feedbacks</Heading>
      </Box>
      <Grid templateColumns="repeat(6, 1fr)" gap={5}>
        <GridItem colSpan={2}>
          <Filter
            domains={domains}
            feedbacks={feedbacks}
            selected={selected}
            onSelected={(val: string) => setSelected(val)}
          />
        </GridItem>
        <GridItem colSpan={4}>
          {selected
            ? feedbacks[selected].map((feedback: FeedbackProps) => (
                <Feedback key={feedback.id} feedback={feedback} />
              ))
            : null}
        </GridItem>
      </Grid>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/feedback/by-domain");
  const feedbacks = await res.json();
  const domains = Object.keys(feedbacks);

  return {
    props: { domains, feedbacks },
  };
};

export default Dashboard;
