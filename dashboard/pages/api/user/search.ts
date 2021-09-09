import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/prisma';
import { prismaErrorResponse, required } from '../../../lib/error-response';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session?.userId) {
    return res.status(401).end();
  }

  const { q } = req.query;
  if (!q) {
    return required(res, 'q');
  }

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
