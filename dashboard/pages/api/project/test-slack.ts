import type { NextApiRequest, NextApiResponse } from 'next';

import { required, _400 } from '../../../lib/error-response';
import { sendSlack } from '../../../lib/slack';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return _400(res, 'invalid method');

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
