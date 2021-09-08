import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // TODO: validate input
  try {
    const result = await prisma.feedback.create({
      data: {
        ...req.body,
      },
    });

    res.json(result);
  } catch (err) {
    console.error(err)
    const { code, message, meta } = err;
    const messages = message.split('\n').filter((line: string) => !!line)
    return res.status(500).json({ code, message, meta, messages });
  }
}
