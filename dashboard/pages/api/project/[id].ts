import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/prisma';
import { Domain } from '../../../types/prisma';
import {
  prismaErrorResponse,
  unauthorized,
  _404,
  _409,
} from '../../../lib/error-response';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session?.userId) return unauthorized(res);

  const { id } = req.query;
  const { userId } = session;

  const project = await prisma.project.findUnique({
    where: {
      id: `${id}`,
    },
    include: {
      users: {
        include: {
          user: true,
        },
      },
      setting: true,
      domains: true,
    },
  });

  // Do not exists
  if (!project) return _404(res, 'project does not exists');

  // Do you have permission on this project?
  if (!project.users.map((user) => user.userId).includes(userId)) {
    return unauthorized(res);
  }

  if (req.method === 'GET') {
    return res.json(project);
  }

  if (req.method === 'PATCH') {
    return handlePatch(req, res);
  }

  if (req.method === 'DELETE') {
    return handleDelete(req, res);
  }
}

// Handle PATCH
const handlePatch = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id: projectId } = req.query;
  let { name, domains } = req.body;

  if (domains) {
    const domainsOnDB = await prisma.domain.findMany({
      where: {
        domain: {
          in: domains,
        },
      },
    });

    // Check if these domain are already exists or not?
    if (domainsOnDB && domainsOnDB.length) {
      const domainOnAnotherProject = domainsOnDB
        .filter((domain: Domain) => domain.projectId !== projectId)
        .map((domain: Domain): string => domain.domain);

      if (domainOnAnotherProject.length) {
        return _409(res, `Domain already exists: ${domainOnAnotherProject}`);
      }

      const domainThisProject = domainsOnDB
        .filter((domain: Domain) => domain.projectId === projectId)
        .map((domain: Domain): string => domain.domain);

      const newDomains = domains.filter(
        (domain: string) => !domainThisProject.includes(domain)
      );

      const removedDomain = domainThisProject.filter(
        (domain: string) => !domains.includes(domain)
      );

      // TODO: remove removed domain from database
      removedDomain;

      domains = newDomains;
    }

    // Okie, go ahead
    domains = {
      createMany: {
        data: domains.map((domain: string) => ({ domain })),
      },
    };
  }

  const data = {
    ...{ name },
    ...{ domains },
  };

  try {
    const result = await prisma.project.update({
      where: {
        id: `${projectId}`,
      },
      data,
    });

    res.json(result);
  } catch (err) {
    return prismaErrorResponse(res, err);
  }
};

// Handle DELETE
const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await prisma.project.delete({
      where: { id: `${req.query.id}` },
    });

    res.json(result);
  } catch (err) {
    return prismaErrorResponse(res, err);
  }
};
