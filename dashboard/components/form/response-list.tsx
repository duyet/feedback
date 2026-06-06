import { FormResponse } from '@prisma/client';
import {
  TableRoot,
  TableHeader,
  TableBody,
  TableRow,
  TableColumnHeader,
  TableCell,
} from '@chakra-ui/react';

export type Props = {
  responses: FormResponse[];
};

export const ResponseList: React.FC<Props> = ({ responses }) => {
  return (
    <TableRoot>
      <TableHeader>
        <TableRow>
          <TableColumnHeader>Who</TableColumnHeader>
          <TableColumnHeader>Choice</TableColumnHeader>
          <TableColumnHeader>Time</TableColumnHeader>
        </TableRow>
      </TableHeader>
      <TableBody>
        {responses.map((response: FormResponse) => {
          const {
            id,
            email,
            name,
            response: responseText,
            createdAt,
          } = response;
          return (
            <TableRow key={id}>
              <TableCell>{email || name}</TableCell>
              <TableCell>{responseText}</TableCell>
              <TableCell textAlign="right">{createdAt.toString()}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </TableRoot>
  );
};

export default ResponseList;
