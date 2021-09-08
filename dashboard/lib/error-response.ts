import { NextApiResponse } from "next";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

export const prismaErrorResponse = (
  res: NextApiResponse,
  err: PrismaClientKnownRequestError
) => {
  const { code, message, meta } = err;
  const messages = message.split("\n").filter((line: string) => !!line);
  return res.status(500).json({ code, message, meta, messages });
};
