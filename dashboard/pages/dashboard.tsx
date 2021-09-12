import useSWR, { mutate, useSWRConfig } from 'swr';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Flex,
  Heading,
  Grid,
  GridItem,
  Select,
  Alert,
  AlertIcon,
  Link,
  useToast,
} from '@chakra-ui/react';

import fetcher from '../lib/fetcher';
import Layout from '../components/layout';
import Loading from '../components/common/loading';
import Filter from '../components/dashboard/filter';
import { ProjectUserPopulated } from '../types/prisma';
import InitProject from '../components/dashboard/init-project';
import FeedbackList from '../components/dashboard/feedback-list';
import EmptyFeedback from '../components/dashboard/empty-feedback';
import GettingStarted from '../components/dashboard/getting-started';
import AddNewProjectButton from '../components/dashboard/add-new-project-button';
import ProjectSettingButton from '../components/dashboard/project-setting/project-setting-button';

const API_PROJECT = '/api/project';
const API_DOMAIN = '/api/domain';
const API_SIGNIN = '/api/auth/signin';

const Dashboard: NextPage = () => {
  const toast = useToast();
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [currentProject, setProject] = useState<string>();
  const [currentDomain, setDomain] = useState<string>();

  // Fetch project and domain information
  const { data: projects, error: errProject } = useSWR(API_PROJECT, fetcher);
  const { data: domains, error: errDomain } = useSWR(
    currentProject ? `${API_DOMAIN}?projectId=${currentProject}` : null,
    fetcher
  );

  useEffect(() => {
    const project = router?.query?.project as string;
    const invitation = router?.query?.invitation as string;

    // Setup invitation
    if (invitation && project) {
      const setupInvitation = async (project: string, invitation: string) => {
        const url = `/api/project/invitation-accept?project=${project}&invitation=${invitation}`;
        const res = await fetch(url);
        const json = await res.json();

        if (!res.ok || !json) {
          toast({
            status: 'warning',
            description: `Cannot accept the invitation: ${json.err}`,
          });
        } else {
          mutate(API_PROJECT);
          setProject(project);
          toast({
            status: 'success',
            description: `You're joined to project ${json?.project?.name}`,
            isClosable: true,
          });
          router.push(`/dashboard?project=${project}`);
        }
      };

      setupInvitation(project, invitation);
      return;
    }

    if (!currentProject) {
      if (project) {
        setProject(project);
      } else if (projects?.length) {
        const first = projects[0].projectId;
        setProject(first);
        router.push(`/dashboard?project=${first}`);
      }
    }
  }, [projects, currentProject, router]);

  if (errProject?.status === 401 || errDomain?.status === 401) {
    router.push(API_SIGNIN);
    return (
      <Layout>
        <Loading />
        <Link href={API_SIGNIN}>Sign in now</Link>
      </Layout>
    );
  }

  if (errProject || errDomain) {
    return (
      <Layout>
        <Alert status="error">
          <AlertIcon />
          Cannot load the list of projects!
        </Alert>
      </Layout>
    );
  }

  if (!projects) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  if (!projects?.length) {
    return (
      <Layout>
        <InitProject />
      </Layout>
    );
  }

  const handleChangeProject = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProject(e.currentTarget.value);
    router.push(`/dashboard?project=${currentProject}`);
  };

  return (
    <Layout maxW="container.lg">
      <Flex mb={10} justifyContent="space-between">
        <Heading mr={5}>Feedbacks</Heading>
        <Flex>
          <Select maxW={250} mr={3} onChange={handleChangeProject}>
            {projects.map((project: ProjectUserPopulated) => {
              const { projectId } = project;
              return (
                <option
                  key={projectId}
                  value={projectId}
                  selected={projectId === currentProject}
                >
                  {project.project.name}
                </option>
              );
            })}
          </Select>

          {currentProject && (
            <ProjectSettingButton projectId={currentProject} />
          )}

          <AddNewProjectButton />
        </Flex>
      </Flex>

      <Flex mb={10}>
        <GettingStarted projectId={currentProject} />
      </Flex>

      <Grid templateColumns="repeat(6, 1fr)" gap={5} mb={20}>
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
          ) : (
            <EmptyFeedback />
          )}
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default Dashboard;
