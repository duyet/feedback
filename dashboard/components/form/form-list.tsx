import Link from 'next/link';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

import { FormPopulated } from '../../types/prisma';

export type Props = {
  forms: FormPopulated[];
};

export const FormList: React.FC<Props> = ({ forms }) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Title</Th>
          <Th>Choices</Th>
          <Th textAlign="right">Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {forms.map((form: FormPopulated) => {
          const { id, title, choices, _count } = form;
          const count = _count?.responses || 0;
          const responseText = count > 1 ? 'responses' : 'response';
          const seeResponseText =
            count == 0 ? 'no response' : `see ${count} ${responseText}`;

          return (
            <Tr key={id}>
              <Td>{title}</Td>
              <Td>{choices.join(', ')}</Td>
              <Td textAlign="right">
                <Link href={`/form/${id}/response`}>{seeResponseText}</Link>{' '}
                {' | '}
                <Link href={`/form/${id}/edit`}>edit</Link>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default FormList;
