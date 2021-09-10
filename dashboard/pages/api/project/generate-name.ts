import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator';

import type { NextApiRequest, NextApiResponse } from 'next';
import { _400 } from '../../../lib/error-response';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dictionaries = [adjectives, animals, colors];

  const length = +(req.query.length || 2);
  if (length < 1 || length > dictionaries.length) {
    return _400(res, 'invalid length');
  }

  let name: string = uniqueNamesGenerator({
    length,
    dictionaries,
    separator: ' ',
    style: 'capital',
  });

  res.send({ name });
}
