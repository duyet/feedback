import { IncomingWebhook } from '@slack/webhook';

export const sendSlack = async ({
  webhookUrl,
  text,
  channel,
  username,
  icon_emoji,
}: {
  webhookUrl: string;
  text: string;
  channel?: string;
  username?: string;
  icon_emoji?: string;
}) => {
  const webhook = new IncomingWebhook(webhookUrl);

  return await webhook.send({
    text,
    channel,
    username,
    icon_emoji,
  });
};
