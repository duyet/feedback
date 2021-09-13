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

  const { projectId } = req.query;
  if (!projectId) return required(res, 'projectId');

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
