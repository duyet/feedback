import type { NextApiRequest, NextApiResponse } from 'next';
import { _400 } from '../../../lib/error-response';
import { prisma } from '../../../lib/prisma';
import { getDomain } from '../../../lib/url-parse';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { projectId, ...rest } = req.body;

    const domain = getDomain(req.body.url);
    const project = projectId
      ? projectId
      : await getProjectIdFromDomain(domain);

    if (!project) {
      return _400(res, 'projectId is invalid or domain does not exist');
    }

    const data = {
      ...rest,
      project: {
        connect: { id: project },
      },
      domain: {
        connectOrCreate: {
          create: { domain, project: { connect: { id: project } } },
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

const getProjectIdFromDomain = async (domain: string) => {
  if (!domain) return false;

  const data = await prisma.domain.findUnique({
    where: {
      domain,
    },
  });

  if (!data) return false;

  return data.projectId;
};
