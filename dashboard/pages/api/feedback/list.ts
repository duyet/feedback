import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/prisma';
import { getSession } from 'next-auth/react';
import { required, unauthorized, _400 } from '../../../lib/error-response';
import { validateMethod } from '../../../lib/api-middleware';

type Where = {
  projectId: string;
  domainId?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Validate HTTP method
  if (!validateMethod(req, res, ['GET'])) return;

  const session = await getSession({ req });
  if (!session?.userId) return unauthorized(res);

  const projectId = req.query.project as string;
  if (!projectId) return required(res, 'project');

  // Pagination parameters
  const page = parseInt(req.query.page as string) || 1;
  const limit = Math.min(parseInt(req.query.limit as string) || 50, 100); // Max 100 per page
  const skip = (page - 1) * limit;

  if (page < 1 || limit < 1) {
    return _400(res, 'Invalid pagination parameters');
  }

  // Where clause
  let where: Where = { projectId };

  // Filter by domain
  const domain = req.query.domain as string;
  if (domain) where.domainId = `${domain}`;

  // Search functionality
  const search = req.query.search as string;
  const searchWhere = search
    ? {
        OR: [
          { message: { contains: search, mode: 'insensitive' as const } },
          { email: { contains: search, mode: 'insensitive' as const } },
          { name: { contains: search, mode: 'insensitive' as const } },
        ],
      }
    : {};

  const [feedbacks, total] = await Promise.all([
    prisma.feedback.findMany({
      where: { ...where, ...searchWhere },
      orderBy: [{ createdAt: 'desc' }],
      skip,
      take: limit,
      select: {
        id: true,
        message: true,
        email: true,
        name: true,
        url: true,
        screenshot: false, // Exclude large base64 screenshots from list
        device: true,
        createdAt: true,
        domainId: true,
      },
    }),
    prisma.feedback.count({
      where: { ...where, ...searchWhere },
    }),
  ]);

  res.status(200).json({
    data: feedbacks,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasMore: skip + feedbacks.length < total,
    },
  });
}
