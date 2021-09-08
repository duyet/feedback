import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { Flex, Heading, Grid, GridItem, Select } from "@chakra-ui/react";

import { prisma } from "../lib/prisma";
import Layout from "../components/layout";
import Filter from "../components/dashboard/filter";
import InitProject from "../components/dashboard/init-project";
import AddNewProjectButton from "../components/dashboard/add-new-project-button";
import FeedbackList from "../components/dashboard/feedback-list";
import {
  Domain,
  Feedback as FeedbackProps,
  ProjectUserPopulated,
} from "../types/prisma";

export type DashboardPageProps = {
  projects: ProjectUserPopulated[];
  domains: string[];
  feedbacks: Record<string, FeedbackProps[]>;
  session: any;
};

const Dashboard: NextPage<DashboardPageProps> = ({ projects, domains }) => {
  const [currentDomain, setDomain] = useState<string>();
  const [currentProject, setProject] = useState<string>();

  useEffect(() => {
    setDomain(domains?.[0]);
    setProject(projects?.[0]?.projectId);
  }, [domains, projects]);

  if (!projects?.length) {
    return (
      <Layout>
        <InitProject />
      </Layout>
    );
  }

  return (
    <Layout maxW="container.lg">
      <Flex mb={10} justifyContent="space-between">
        <Heading mr={5}>Feedbacks</Heading>
        <Flex>
          <Select maxW={250} mr={3}>
            {projects.map((project: ProjectUserPopulated) => {
              const { projectId } = project;
              return <option key={projectId}>{project.project.name}</option>;
            })}
          </Select>
          <AddNewProjectButton />
        </Flex>
      </Flex>
      <Grid templateColumns="repeat(6, 1fr)" gap={5}>
        <GridItem colSpan={[6, 6, 2]}>
          <Filter
            domains={domains}
            selected={currentDomain}
            onSelected={(val: string) => setDomain(val)}
          />
        </GridItem>
        <GridItem colSpan={[6, 6, 4]}>
          {currentProject && currentDomain ? (
            <FeedbackList project={currentProject} domain={currentDomain} />
          ) : null}
        </GridItem>
      </Grid>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  const projects = await prisma.projectUser.findMany({
    where: {
      userId: session.userId,
    },
    include: {
      project: true,
    },
  });

  const domains = await prisma.domain.findMany({
    where: {
      project: {
        is: {
          id: {
            in: projects.map((project) => project.projectId),
          },
        },
      },
    },
    include: {
      project: true,
    },
  });

  return {
    props: {
      projects: JSON.parse(JSON.stringify(projects)),
      domains: domains.map((domain: Domain) => domain.domain),
      session,
    },
  };
};

export default Dashboard;
