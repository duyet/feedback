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

  const q = req.query.q as string;
  if (!q) return required(res, 'q');

  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: `${q}`, mode: 'insensitive' } },
          { email: { contains: `${q}`, mode: 'insensitive' } },
        ],
      },
    });

    res.json(users);
  } catch (err) {
    return prismaErrorResponse(res, err);
  }
}
