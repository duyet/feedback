import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../lib/prisma';
import { prismaErrorResponse, required } from '../../lib/error-response';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session?.userId) {
    return res.status(401).end();
  }

  const { projectId } = req.query;
  if (!projectId) {
    return required(res, 'projectId');
  }

  try {
    const domains = await prisma.domain.findMany({
      where: {
        project: {
          is: {
            id: {
              in: projectId,
            },
          },
        },
      },
      include: {
        project: true,
      },
    });

    res.json(domains);
  } catch (err) {
    return prismaErrorResponse(res, err);
  }
}
