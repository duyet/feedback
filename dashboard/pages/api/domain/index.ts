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

  const { projectId } = req.query;
  if (!projectId) return required(res, 'projectId');
  const projectIds = Array.isArray(projectId) ? projectId : [projectId];

  try {
    const domains = await prisma.domain.findMany({
      where: {
        project: {
          is: {
            id: {
              in: projectIds,
            },
          },
        },
      },
      include: {
        project: true,
        _count: true
      },
    });

    res.json(domains);
  } catch (err) {
    return prismaErrorResponse(res, err);
  }
}
