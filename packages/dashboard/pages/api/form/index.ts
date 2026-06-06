import { Prisma } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/prisma';
import { getSession } from 'next-auth/react';
import {
  prismaErrorResponse,
  required,
  unauthorized,
} from '../../../lib/error-response';
import { validateMethod } from '../../../lib/api-middleware';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Validate HTTP method
  if (!validateMethod(req, res, ['GET', 'POST'])) return;

  const session = await getSession({ req });
  if (!session?.userId) return unauthorized(res);

  const { userId } = session;

  if (req.method === 'GET') {
    return handleGet(req, res, userId);
  }

  if (req.method === 'POST') {
    return handlePost(req, res, userId);
  }
}

const handleGet = async (
  _req: NextApiRequest,
  res: NextApiResponse,
  userId: string
) => {
  let where: Prisma.FormWhereInput = { userId };
  const forms = await prisma.form.findMany({
    where,
    include: {
      _count: true,
    },
  });

  return res.status(200).json(forms);
};

const handlePost = async (
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string
) => {
  const { title, content, authRequired, choices } = req.body;

  if (!title) return required(res, 'title');
  if (!content) return required(res, 'content');

  const owner = {
    connect: {
      id: userId,
    },
  };

  const data: Prisma.FormCreateInput = {
    title,
    content,
    authRequired,
    choices,
    owner,
  };

  try {
    const resp = await prisma.form.create({
      data,
    });

    return res.json(resp);
  } catch (err) {
    return prismaErrorResponse(res, err);
  }
};
