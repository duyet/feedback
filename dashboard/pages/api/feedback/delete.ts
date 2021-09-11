import type { NextApiRequest, NextApiResponse } from 'next';
import { prismaErrorResponse } from '../../../lib/error-response';
import { prisma } from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (!id) res.status(500).json({ message: 'id is required' });

  try {
    const result = await prisma.feedback.delete({
      where: { id: +id },
    });

    res.json(result);
  } catch (err) {
    return prismaErrorResponse(res, err);
  }
}
