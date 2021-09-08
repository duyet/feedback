import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../lib/prisma";
import { prismaErrorResponse, unauthorized } from "../../../lib/error-response";

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
      users: true,
      setting: true,
    },
  });

  // Do not exists
  if (!project) {
    return res.status(404).end();
  }

  // Do you have permission on this project?
  if (!project.users.map((user) => user.userId).includes(userId)) {
    return unauthorized(res);
  }

  if (req.method === "GET") {
    return res.json(project);
  }

  if (req.method === "PATCH") {
    return handlePatch(req, res);
  }

  if (req.method === "DELETE") {
    return handleDelete(req, res);
  }
}

// Handle PATCH
const handlePatch = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const result = await prisma.project.update({
      where: {
        id: `${id}`,
      },
      data: {
        ...req.body,
      },
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
