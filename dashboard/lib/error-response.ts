import { NextApiResponse } from 'next';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

export type CustomPrismaErrorResponse = {
  code: number;
  err: string;
};

export const prismaErrorResponse = (
  res: NextApiResponse,
  err: PrismaClientKnownRequestError | unknown,
  custom?: Record<string, CustomPrismaErrorResponse>
) => {
  if (err instanceof PrismaClientKnownRequestError) {
    const { code, message, meta } = err;

    if (custom && code in custom) {
      const respCode = custom[code].code;
      const err = custom[code].err;
      return res.status(respCode).json({ code: respCode, err });
    }

    if (code === 'P2002' && meta) {
      if (meta.hasOwnProperty('target')) {
        // TODO: Access to the meta.target for better error message
        const target = JSON.stringify(meta);
        return res.status(409).json({ code, err: `Already exists: ${target}` });
      }
    }

    const messages = message.split('\n').filter((line: string) => !!line);
    return res.status(500).json({ code, message, meta, messages });
  }

  console.error(err);
  return res
    .status(500)
    .json({ err: `Something went wrong`, detail: `${err}` });
};

export const withCode = (code: number) => (res: NextApiResponse, err: any) =>
  res.status(code).json({ code, err });

export const unauthorized = (res: NextApiResponse) =>
  withCode(401)(res, 'unauthorized');

export const required = (res: NextApiResponse, query: string) =>
  withCode(401)(res, `\`${query}\` is required`);

export const badRequest = (res: NextApiResponse, err: string) =>
  withCode(400)(res, err);

export const _400 = (res: NextApiResponse, err: string) =>
  withCode(400)(res, err);

export const _409 = (res: NextApiResponse, err: string) =>
  withCode(409)(res, err);

export const _500 = (res: NextApiResponse, err: string) =>
  withCode(500)(res, err);
