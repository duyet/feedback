import isValidDomain from 'is-valid-domain';
import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/prisma';
import { badRequest, prismaErrorResponse, required } from '../../../lib/error-response';
import { ProjectRole } from '../../../types/role';

const DEFAULT_PROJECT_ROLE: ProjectRole = 'owner';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session?.userId) {
    return res.status(401).end();
  }

  if (!req.query.name) {
    return required(res, 'name');
  }

  // ?name
  const projectName = `${req.query.name}`;
  const createProjectName = { name: projectName }

  // ?domain
  const domain = req.query.domain ? `${req.query.domain}` : null;
  if (domain && !isValidDomain(domain)) {
    return badRequest(res, 'Invalid domain name')
  }

  // TODO: support multiple domains
  const createDomain = domain
    ? { domains: { create: { domain: domain } } }
    : {};

  const data = {
    role: DEFAULT_PROJECT_ROLE,
    project: {
      create: { ...createProjectName, ...createDomain },
    },
    user: {
      connect: { id: session.userId },
    },
  };

  try {
    const result = await prisma.projectUser.create({
      data,
      include: {
        project: { include: { domains: true } },
        user: true,
      },
    });

    res.json(result);
  } catch (err) {
    return prismaErrorResponse(res, err);
  }
}
