import useSWR from 'swr';
import React from 'react';
import { Text, FieldRoot } from '@chakra-ui/react';

import fetcher from '../../../lib/fetcher';
import Loading from '../../common/loading';
import { UserList } from './user-list';
import Error from '../../common/error';

export type Props = {
  projectId: string;
};

export const TeamSettingPanel: React.FC<Props> = ({ projectId }) => {
  const url = `/api/project/${projectId}`;
  const { data, error } = useSWR(url, fetcher);

  if (error) return <Error />
  if (!data) return <Loading />;

  return (
    <>
      <Text color="gray" mb={5}>
        Add or remove users that have access to this project! The user should
        login once before they can be added.
      </Text>
      <FieldRoot id="email" mb={5}>
        <UserList defaultValue={data.users} projectId={projectId} />
      </FieldRoot>
    </>
  );
};

export default TeamSettingPanel;
