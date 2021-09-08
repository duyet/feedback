import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../lib/prisma";
import { prismaErrorResponse } from "../../../lib/error-response";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session?.userId) {
    return res.status(401).end();
  }

  if (!req.query.id) {
    return res.status(400).json({ message: "id is required" });
  }

  try {
    const result = await prisma.project.delete({
      where: { id: `${req.query.id}` },
    });

    res.json(result);
  } catch (err) {
    return prismaErrorResponse(res, err);
  }
}
