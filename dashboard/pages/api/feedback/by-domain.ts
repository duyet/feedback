import type { NextApiRequest, NextApiResponse } from "next";
import groupBy from "lodash/groupBy";

import { prisma } from "../../../lib/prisma";
import { getDomain } from "../../../lib/url-parse";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const feedbacks = await prisma.feedback.findMany({
    orderBy: [{ createdAt: "desc" }],
  });

  // Additional information
  feedbacks.map((feedback: any) => {
    feedback.domain = getDomain(feedback.url);
  });

  const byDomain = groupBy(feedbacks, "domain");

  res.status(200).json(byDomain);
}
