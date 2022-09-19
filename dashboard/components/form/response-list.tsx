import Link from 'next/link';
import { FormResponse } from '@prisma/client';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

export type Props = {
  responses: FormResponse[];
};

export const ResponseList: React.FC<Props> = ({ responses }) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Who</Th>
          <Th>Choice</Th>
          <Th>Time</Th>
        </Tr>
      </Thead>
      <Tbody>
        {responses.map((response: FormResponse) => {
          const {
            id,
            email,
            name,
            response: responseText,
            createdAt,
          } = response;
          return (
            <Tr key={id}>
              <Td>{email || name}</Td>
              <Td>{responseText}</Td>
              <Td textAlign="right">{createdAt.toString()}</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default ResponseList;
