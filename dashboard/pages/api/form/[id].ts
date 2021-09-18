import { Prisma } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/prisma';
import { getSession } from 'next-auth/react';
import {
  prismaErrorResponse,
  required,
  unauthorized,
  _400,
  _404,
} from '../../../lib/error-response';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;
  const session = await getSession({ req });
  if (!session?.userId) return unauthorized(res);

  const { userId } = session;

  if (req.method === 'GET') {
    return handleGet(req, res, userId, id);
  }

  if (req.method === 'PUT' || req.method == 'PATCH') {
    return handlePatch(req, res, userId, id);
  }

  return _400(res, 'invalid request method');
}

const handleGet = async (
  _req: NextApiRequest,
  res: NextApiResponse,
  userId: string,
  id: string
) => {
  let where: Prisma.FormWhereUniqueInput = { id };
  const resp = await prisma.form.findUnique({
    where,
    include: {
      owner: true,
      responses: true,
      _count: true,
    },
  });

  if (!resp) return _404(res, 'not found');
  if (resp.userId !== userId) return _400(res, 'permission denied');

  return res.status(200).json(resp);
};

const handlePatch = async (
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string,
  id: string
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
