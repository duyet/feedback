import type { NextApiRequest, NextApiResponse } from 'next';

import { prismaErrorResponse, _400 } from '../../../lib/error-response';
import { prisma } from '../../../lib/prisma';
import { getDomain } from '../../../lib/url-parse';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (!req.body) {
    return _400(res, 'invalid')
  }

  const { projectId, ...rest } = req.body;
  const { url } = rest;

  const domain = getDomain(url);
  const project = projectId ? projectId : await getProjectIdFromDomain(domain);

  if (!project) {
    return _400(res, 'projectId is invalid or domain does not exist');
  }

  const data = {
    ...rest,
    project: { connect: { id: project } },
    domain: {
      connectOrCreate: {
        create: { domain, project: { connect: { id: project } } },
        where: { domain },
      },
    },
  };

  try {
    const result = await prisma.feedback.create({
      data,
    });

    // TODO: trigger integration

    return res.json(result);
  } catch (err) {
    return prismaErrorResponse(res, err);
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

/**
 * Increase the body size limit to 10MB
 * to submit base64 image
 */
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
