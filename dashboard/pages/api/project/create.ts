import isValidDomain from 'is-valid-domain';
import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';

import {
  badRequest,
  prismaErrorResponse,
  required,
  unauthorized,
} from '../../../lib/error-response';
import { prisma } from '../../../lib/prisma';
import { ProjectRole } from '../../../types/role';
import { validateMethod } from '../../../lib/api-middleware';

const DEFAULT_PROJECT_ROLE: ProjectRole = 'owner';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Validate HTTP method
  if (!validateMethod(req, res, ['POST'])) return;

  const session = await getSession({ req });
  if (!session?.userId) return unauthorized(res);

  if (!req.query.name) {
    return required(res, 'name');
  }

  // ?name
  const projectName = `${req.query.name}`;
  const createProjectName = { name: projectName };

  // ?domain (supports single domain or comma-separated list)
  const domainParam = req.query.domain ? `${req.query.domain}` : null;
  const domains = domainParam ? domainParam.split(',').map(d => d.trim()) : [];

  // Validate all domains
  for (const domain of domains) {
    if (!isValidDomain(domain)) {
      return badRequest(res, `Invalid domain name: ${domain}`);
    }
  }

  // Support multiple domains
  const createDomain = domains.length > 0
    ? { domains: { create: domains.map(domain => ({ domain })) } }
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
