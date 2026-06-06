import Link from 'next/link';
import {
  TableRoot,
  TableHeader,
  TableBody,
  TableRow,
  TableColumnHeader,
  TableCell,
} from '@chakra-ui/react';

import { FormPopulated } from '../../types/prisma';

export type Props = {
  forms: FormPopulated[];
};

export const FormList: React.FC<Props> = ({ forms }) => {
  return (
    <TableRoot>
      <TableHeader>
        <TableRow>
          <TableColumnHeader>Title</TableColumnHeader>
          <TableColumnHeader>Choices</TableColumnHeader>
          <TableColumnHeader textAlign="right">Actions</TableColumnHeader>
        </TableRow>
      </TableHeader>
      <TableBody>
        {forms.map((form: FormPopulated) => {
          const { id, title, choices, _count } = form;
          const count = _count?.responses || 0;
          const responseText = count > 1 ? 'responses' : 'response';
          const seeResponseText =
            count == 0 ? 'no response' : `see ${count} ${responseText}`;

          return (
            <TableRow key={id}>
              <TableCell>{title}</TableCell>
              <TableCell>{choices.join(', ')}</TableCell>
              <TableCell textAlign="right">
                <Link href={`/form/${id}/response`}>{seeResponseText}</Link>{' '}
                {' | '}
                <Link href={`/form/${id}/edit`}>edit</Link>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </TableRoot>
  );
};

export default FormList;
