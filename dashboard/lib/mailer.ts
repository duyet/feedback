import nodemailer from 'nodemailer';
import sendgridTranspot from 'nodemailer-sendgrid';

export const defaultFromAddress = process.env.EMAIL_FROM;

/**
 * Mailer instance
 */
export const mailer = nodemailer.createTransport(
  sendgridTranspot({
    apiKey: process.env.SENDGRID_API_KEY || '',
  })
);
export default mailer;

/**
 * Send invitation request
 */
export const sendInvitationRequest = async ({
  url,
  to,
  who,
  project,
  subject = 'Invitation to Feedback Dashboard',
}: {
  url: string;
  to: string;
  who: string;
  project: string;
  subject?: string;
}) => {
  const from = process.env.EMAIL_FROM;

  return await mailer.sendMail({
    to,
    from,
    subject,
    text: text({ url, to, who, project }),
    html: html({ url, to, who, project }),
  });
};

export type MailRenderParams = {
  url: string;
  to: string;
  who: string;
  project: string;
};

// Email HTML body
// TODO: Refactor the invitation email to MJML
const html = ({ url, to, who, project }: MailRenderParams) => {
  const escapedEmail = `${to.replace(/\./g, '&#8203;.')}`;
  const escapedSite = 'Feedback';

  // Some simple styling options
  const backgroundColor = '#f9f9f9';
  const textColor = '#444444';
  const mainBackgroundColor = '#ffffff';
  const buttonBackgroundColor = '#346df1';
  const buttonBorderColor = '#346df1';
  const buttonTextColor = '#ffffff';

  return `
    <body style="background: ${backgroundColor};">
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td align="center" style="padding: 20px 0px 20px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
            <strong>${escapedSite}</strong>
          </td>
        </tr>
      </table>
      <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${mainBackgroundColor}; max-width: 600px; margin: auto; border-radius: 10px;">
        <tr>
          <td align="center" style="padding: 10px 0px 0px 0px; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
            ${who} invited you to collaborate on project <strong>${project}</strong> on the Feedback. <br /><br />
            Accept my invitation as <strong>${escapedEmail}</strong>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding: 20px 0;">
            <table border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td align="center" style="border-radius: 5px;" bgcolor="${buttonBackgroundColor}">
                  <a href="${url}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${buttonTextColor}; text-decoration: none; text-decoration: none;border-radius: 5px; padding: 10px 20px; border: 1px solid ${buttonBorderColor}; display: inline-block; font-weight: bold;">
                    Accept my invitation
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
          </td>
        </tr>
      </table>
    </body>
  `;
};

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
const text = ({ url, to, who, project }: MailRenderParams) => `
  ${who} invited you to collaborate on project ${project} on the Feedback.\n\n
  Accept my invitation as ${to}.\n\n
  ${url}\n`;
