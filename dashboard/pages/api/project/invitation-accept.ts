import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';

import {
  prismaErrorResponse,
  required,
  unauthorized,
  _400,
} from '../../../lib/error-response';
import { prisma } from '../../../lib/prisma';
import { InvitationStatus } from '../../../types/invitation';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session?.userId) return unauthorized(res);

  // TODO: Validate the `project` param
  const project = req.query.project as string;
  if (!project) {
    return required(res, 'project');
  }

  const invitation = req.query.invitation as string;
  if (!invitation) {
    return required(res, 'invitation');
  }

  try {
    const res = await prisma.invitation.findUnique({
      where: { id: invitation },
    });

    if (!res) throw 'Token is not exists';
    if (res.email !== session.user.email) throw 'Invalid email';
    if (res.projectId !== project) throw 'Invalid project';
  } catch (err) {
    return _400(res, `${err}`);
  }

  const data = {
    role: 'member',
    project: { connect: { id: project } },
    user: { connect: { id: session.userId } },
  };

  try {
    const project = await prisma.projectUser.create({
      data,
      include: { project: true },
    });

    // Update status
    await updateStatus(invitation, 'Accepted');

    return res.json(project);
  } catch (err) {
    await updateStatus(invitation, 'AcceptError', `${err}`);
    return prismaErrorResponse(res, err, {
      P2002: { code: 409, err: 'User is already in project' },
    });
  }
}

const updateStatus = async (
  id: string,
  status: InvitationStatus,
  error?: string
) =>
  prisma.invitation.update({
    where: { id },
    data: { status, error },
  });
