import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../lib/prisma";
import { getSession } from "next-auth/react";

type Where = {
  projectId?: string;
  domainId?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session?.userId) {
    return res.status(401).end();
  }

  if (!req.query.project) {
    return res.status(401).end("project is required");
  }

  let where: Where = {
    projectId: `${req.query.project}`,
  };

  // Filter by domain
  if (req.query.domain) {
    where.domainId = `${req.query.domain}`;
  }

  const feedbacks = await prisma.feedback.findMany({
    where,
    orderBy: [{ createdAt: "desc" }],
  });

  res.status(200).json(feedbacks);
}
