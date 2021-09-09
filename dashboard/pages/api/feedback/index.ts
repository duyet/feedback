import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { getDomain } from '../../../lib/url-parse';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { projectId, ...rest } = req.body;

    const domain = getDomain(req.body.url);
    const data = {
      ...rest,
      project: {
        connect: { id: projectId },
      },
      domain: {
        connectOrCreate: {
          create: { domain, project: { connect: { id: projectId } } },
          where: { domain },
        },
      },
    };

    const result = await prisma.feedback.create({
      data,
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    const { code, message, meta } = err;
    const messages = message.split('\n').filter((line: string) => !!line);
    return res.status(500).json({ code, message, meta, messages });
  }
}
