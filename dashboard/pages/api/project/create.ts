import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator';

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { getSession } from 'next-auth/react';
import { prismaErrorResponse } from '../../../lib/error-response';
import { ProjectRole } from '../../../types/role';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session?.userId) {
    return res.status(401).end();
  }

  let projectName: string = uniqueNamesGenerator({
    dictionaries: [adjectives, animals, colors],
    separator: ' ',
    style: 'capital',
    length: 2,
  });

  const projectUser = {
    role: 'owner' as ProjectRole,
    project: {
      create: { name: projectName },
    },
    user: {
      connect: { id: session.userId },
    },
  };

  try {
    const result = await prisma.projectUser.create({
      data: projectUser,
      include: {
        project: true,
        user: true,
      },
    });

    res.json(result);
  } catch (err) {
    return prismaErrorResponse(res, err);
  }
}
