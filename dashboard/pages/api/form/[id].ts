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

  if (req.method === 'GET') {
    return handleGet(req, res, id, session?.userId);
  }

  // the rest method must have authorized
  if (!session?.userId) return unauthorized(res);
  const { userId } = session;

  if (req.method === 'PUT' || req.method == 'PATCH') {
    return handlePatch(req, res, userId, id);
  }

  return _400(res, 'invalid request method');
}

const handleGet = async (
  _req: NextApiRequest,
  res: NextApiResponse,
  id: string,
  userId: string | undefined
) => {
  let where: Prisma.FormWhereUniqueInput = { id };
  console.log(where)
  const resp = await prisma.form.findUnique({
    where,
    include: {
      owner: !!userId,
      responses: !!userId,
      _count: true,
    },
  });

  if (!resp) return _404(res, 'not found');

  // return public info only
  if (!userId || resp.userId !== userId) {
    const { title, content, choices } = resp;
    return res.json({
      title,
      content,
      choices,
    });
  }

  return res.status(200).json(resp);
};

const handlePatch = async (
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string,
  _id: string
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
