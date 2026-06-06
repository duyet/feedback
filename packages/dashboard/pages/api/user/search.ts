import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';

import {
  prismaErrorResponse,
  required,
  unauthorized,
} from '../../../lib/error-response';
import { prisma } from '../../../lib/prisma';
import { validateMethod } from '../../../lib/api-middleware';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Validate HTTP method
  if (!validateMethod(req, res, ['GET'])) return;

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
      take: 10, // Limit results to prevent large queries
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        // Don't expose sensitive fields
      },
    });

    res.json(users);
  } catch (err) {
    return prismaErrorResponse(res, err);
  }
}
