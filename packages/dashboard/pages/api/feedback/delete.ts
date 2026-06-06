import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';

import {
  prismaErrorResponse,
  required,
  unauthorized,
  _403,
} from '../../../lib/error-response';
import { prisma } from '../../../lib/prisma';
import { validateMethod } from '../../../lib/api-middleware';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Validate HTTP method
  if (!validateMethod(req, res, ['DELETE'])) return;

  const session = await getSession({ req });
  if (!session?.userId) return unauthorized(res);

  const { id } = req.query;
  if (!id) return required(res, 'id');

  try {
    // First, fetch the feedback to check ownership
    const feedback = await prisma.feedback.findUnique({
      where: { id: +id },
      include: {
        project: {
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

    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    // Check if user has access to this project
    if (!feedback.project.users || feedback.project.users.length === 0) {
      return _403(res, 'You do not have permission to delete this feedback');
    }

    // Delete the feedback
    const result = await prisma.feedback.delete({
      where: { id: +id },
    });

    res.json(result);
  } catch (err) {
    return prismaErrorResponse(res, err);
  }
}
