import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/prisma';
import { prismaErrorResponse, unauthorized } from '../../../lib/error-response';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session?.userId) return unauthorized(res);

  const { userId } = session;

  try {
    const result = await prisma.projectUser.findMany({
      where: {
        userId,
      },
      include: {
        project: true,
      },
    });

    res.json(result);
  } catch (err) {
    return prismaErrorResponse(res, err);
  }
}
