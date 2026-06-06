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
import { validateMethod } from '../../../lib/api-middleware';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Validate HTTP method
  if (!validateMethod(req, res, ['POST'])) return;

  const session = await getSession({ req });
  if (!session?.userId) return unauthorized(res);

  const project = req.query.project as string;
  if (!project) {
    return required(res, 'project');
  }

  const invitation = req.query.invitation as string;
  if (!invitation) {
    return required(res, 'invitation');
  }

  let invitationData;
  try {
    invitationData = await prisma.invitation.findUnique({
      where: { id: invitation },
    });

    if (!invitationData) {
      return _400(res, 'Invitation token does not exist');
    }
    if (invitationData.email !== session.user.email) {
      return _400(res, 'Invalid email - invitation not sent to this email address');
    }
    if (invitationData.projectId !== project) {
      return _400(res, 'Invalid project - invitation not for this project');
    }
  } catch (err) {
    return _400(res, `Validation error: ${err}`);
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
