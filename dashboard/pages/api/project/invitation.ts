import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/prisma';
import { sendInvitationRequest } from '../../../lib/mailer';
import {
  prismaErrorResponse,
  required,
  unauthorized,
  _500,
  _400,
} from '../../../lib/error-response';
import { InvitationWithProject, Prisma } from '../../../types/prisma';
import { InvitationStatus } from '../../../types/invitation';
import { validateMethod, applyRateLimit } from '../../../lib/api-middleware';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Validate HTTP method
  if (!validateMethod(req, res, ['POST'])) return;

  // Apply rate limiting for invitation emails (10 per hour per user)
  if (!applyRateLimit(req, res, { limit: 10, windowMs: 60 * 60 * 1000 })) return;

  const session = await getSession({ req });
  if (!session?.userId) return unauthorized(res);

  const project = req.query.project as string;
  if (!project) {
    return required(res, 'project');
  }

  // Validate project exists and user has access
  const projectData = await prisma.project.findUnique({
    where: { id: project },
    include: {
      users: {
        where: { userId: session.userId },
      },
    },
  });

  if (!projectData || projectData.users.length === 0) {
    return _400(res, 'Project not found or you do not have access');
  }

  // Validate email format
  const to = req.query.to as string;
  if (!to) {
    return required(res, 'to');
  }

  if (to.length > 254 || to.indexOf('@') === -1 || to.split('@').length !== 2) {
    return _400(res, 'Invalid email format');
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
    // Get protocol from request headers
    const protocol = req.headers['x-forwarded-proto'] ||
                    (req.connection as any)?.encrypted ? 'https' : 'http';
    const project = invitation.invitedToProject.name;
    const projectId = invitation.invitedToProject.id;
    const url = `${protocol}://${req.headers.host}/dashboard?invitation=${invitation.id}&project=${projectId}`;

    // Send email
    await sendInvitationRequest({ url, to, who, project });

    // Update status
    await updateStatus(invitation.id, 'Sent');

    res.json({ message: 'ok', invitationId: invitation.id });
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
