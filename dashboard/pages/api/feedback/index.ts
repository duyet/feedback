import type { NextApiRequest, NextApiResponse } from 'next';

import { prismaErrorResponse, _400 } from '../../../lib/error-response';
import { prisma } from '../../../lib/prisma';
import { getDomain } from '../../../lib/url-parse';
import { validateMethod, applyCORS, applyRateLimit } from '../../../lib/api-middleware';
import { sendSlackNotification } from '../../../lib/slack';
import { sendEmail } from '../../../lib/mailer';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Apply CORS for widget support
  if (!applyCORS(req, res)) return;

  // Validate HTTP method
  if (!validateMethod(req, res, ['POST'])) return;

  // Apply rate limiting (100 requests per minute per IP)
  if (!applyRateLimit(req, res, { limit: 100, windowMs: 60000 })) return;

  if (!req.body) {
    return _400(res, 'invalid')
  }

  const { projectId, message, email, name, ...rest } = req.body;
  const { url } = rest;

  // Input validation
  if (message && message.length > 10000) {
    return _400(res, 'Message too long (max 10000 characters)');
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return _400(res, 'Invalid email format');
  }

  const domain = getDomain(url);
  const project = projectId ? projectId : await getProjectIdFromDomain(domain);

  if (!project) {
    return _400(res, 'projectId is invalid or domain does not exist');
  }

  const data = {
    message,
    email,
    name,
    ...rest,
    project: { connect: { id: project } },
    domain: {
      connectOrCreate: {
        create: { domain, project: { connect: { id: project } } },
        where: { domain },
      },
    },
  };

  try {
    const result = await prisma.feedback.create({
      data,
    });

    // Trigger integrations
    await triggerIntegrations(project, result);

    return res.json(result);
  } catch (err) {
    return prismaErrorResponse(res, err);
  }
}

const getProjectIdFromDomain = async (domain: string) => {
  if (!domain) return false;

  const data = await prisma.domain.findUnique({
    where: {
      domain,
    },
  });

  if (!data) return false;

  return data.projectId;
};

/**
 * Trigger integrations (Slack, Email) when feedback is created
 */
async function triggerIntegrations(projectId: string, feedback: any) {
  try {
    // Fetch project settings for integrations
    const projectSettings = await prisma.projectSetting.findUnique({
      where: { projectId },
    });

    if (!projectSettings) return;

    // Send Slack notification
    if (projectSettings.slackEnabled && projectSettings.slackWebhook) {
      await sendSlackNotification(projectSettings.slackWebhook, {
        text: `New feedback received!`,
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*New Feedback*\n${feedback.message || 'No message'}`,
            },
          },
          {
            type: 'context',
            elements: [
              {
                type: 'mrkdwn',
                text: `From: ${feedback.email || feedback.name || 'Anonymous'} | URL: ${feedback.url || 'N/A'}`,
              },
            ],
          },
        ],
      });
    }

    // Send email notification
    if (projectSettings.emailEnabled && projectSettings.emailTitle) {
      await sendEmail({
        to: projectSettings.emailTitle,
        subject: 'New Feedback Received',
        html: `
          <h2>New Feedback</h2>
          <p><strong>Message:</strong> ${feedback.message || 'No message'}</p>
          <p><strong>From:</strong> ${feedback.email || feedback.name || 'Anonymous'}</p>
          <p><strong>URL:</strong> ${feedback.url || 'N/A'}</p>
          <p><strong>Time:</strong> ${new Date(feedback.createdAt).toLocaleString()}</p>
        `,
      });
    }
  } catch (error) {
    // Don't fail the feedback creation if integrations fail
    console.error('Integration trigger failed:', error);
  }
}

/**
 * Increase the body size limit to 10MB
 * to submit base64 image
 */
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
