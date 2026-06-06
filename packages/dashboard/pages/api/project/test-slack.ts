import type { NextApiRequest, NextApiResponse } from 'next';

import { required } from '../../../lib/error-response';
import { sendSlack } from '../../../lib/slack';
import { validateMethod } from '../../../lib/api-middleware';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Validate HTTP method
  if (!validateMethod(req, res, ['POST'])) return;

  const { slackWebhook, slackChannel, slackUserName, slackIcon } = req.body;
  if (!slackWebhook) return required(res, 'slackWebhook');

  const text =
    'Heya! This is a test notification from feedback :smile:. Seems to work fine!';

  const resp = await sendSlack({
    webhookUrl: slackWebhook,
    text,
    channel: slackChannel,
    username: slackUserName,
    icon_emoji: slackIcon,
  });

  res.send(resp);
}
