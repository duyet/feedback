import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (!id) res.status(500).json({ message: "id is required" });

  try {
    const result = await prisma.feedback.delete({
      where: { id: +id }
    });

    res.json(result);
  } catch (err) {
    const { code, message, meta } = err;
    const messages = message.split("\n").filter((line: string) => !!line);
    return res.status(500).json({ code, message, meta, messages });
  }
}
