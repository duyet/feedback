import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/prisma';
import { getSession } from 'next-auth/react';
import { required, unauthorized } from '../../../lib/error-response';

type Where = {
  projectId: string;
  domainId?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session?.userId) return unauthorized(res);

  const projectId = req.query.project as string;
  if (!projectId) return required(res, 'project');

  // Where clause
  let where: Where = { projectId };

  // Filter by domain
  const domain = req.query.domain as string;
  if (domain) where.domainId = `${domain}`;

  const feedbacks = await prisma.feedback.findMany({
    where,
    orderBy: [{ createdAt: 'desc' }],
  });

  res.status(200).json(feedbacks);
}
