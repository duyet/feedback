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

  const project = req.query.project as string;
  if (!project) {
    return required(res, 'project');
  }

  try {
    const invitations = await prisma.invitation.findMany({
      where: {
        projectId: project,
        status: { not: 'Accepted' },
      },
      include: {
        invitedToProject: {
          include: {
            users: {
              where: {
                userId: session.userId,
              },
            },
          },
        },
      },
    });

    // Are you the member of this project?
    const owned = invitations.filter(
      (invitation) => invitation.invitedToProject.users.length
    );
    res.json(owned);
  } catch (err) {
    return prismaErrorResponse(res, `${err}`);
  }
}
