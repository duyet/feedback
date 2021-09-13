import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/prisma';
import { sendInvitationRequest } from '../../../lib/mailer';
import {
  prismaErrorResponse,
  required,
  unauthorized,
  _500,
} from '../../../lib/error-response';
import { InvitationWithProject, Prisma } from '../../../types/prisma';
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

  // TODO: Validate the `to` param
  const to = req.query.to as string;
  if (!to) {
    return required(res, 'to');
  }

  // Invitor: the current user
  const who = (req.query.who as string) || session.user.name;

  const data: Prisma.InvitationCreateInput = {
    email: to as string,
    status: 'NotSent' as InvitationStatus,
    invitedToProject: {
      connect: {
        id: project as string,
      },
    },
  };

  let invitation: InvitationWithProject;
  try {
    invitation = await prisma.invitation.create({
      data,
      include: {
        invitedToProject: true,
      },
    });
  } catch (err) {
    return prismaErrorResponse(res, err, {
      P2002: { code: 409, err: `The email is already in the invitation list` },
      P2025: { code: 400, err: `Project not found` },
    });
  }

  try {
    // TODO: Get the current protocol from API
    const protocol = 'https';
    const project = invitation.invitedToProject.name;
    const projectId = invitation.invitedToProject.id;
    const url = `${protocol}://${req.headers.host}/dashboard?invitation=${invitation.id}&project=${projectId}`;

    // Sent email
    await sendInvitationRequest({ url, to, who, project });

    // Update status
    await updateStatus(invitation.id, 'Sent');

    res.json({ message: 'ok' });
  } catch (err) {
    // Update status
    await updateStatus(invitation.id, 'SentError', `${err}`);
    return _500(res, `${err}`);
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
