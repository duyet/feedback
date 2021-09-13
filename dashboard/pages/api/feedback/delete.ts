import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';

import {
  prismaErrorResponse,
  required,
  unauthorized,
} from '../../../lib/error-response';
import { prisma } from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session?.userId) return unauthorized(res);

  const { id } = req.query;
  if (!id) return required(res, 'id');

  try {
    const result = await prisma.feedback.delete({
      where: { id: +id },
    });

    res.json(result);
  } catch (err) {
    return prismaErrorResponse(res, err);
  }
}
