import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.EMAIL_FROM || 'hello@giltcounselling.com';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions) {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });

    if (error) {
      console.error('Email sending error:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('Email service error:', error);
    throw error;
  }
}

// Magic Link Email Template
export function generateMagicLinkEmail(email: string, token: string, userName?: string) {
  const magicLink = `${APP_URL}/auth/verify?token=${token}`;
  const displayName = userName || email.split('@')[0];

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sign in to Gilt Counselling Consult</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; background-color: #F5F1E8;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F5F1E8; padding: 40px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #D9A85D 0%, #F5A623 100%); padding: 40px 32px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                      Gilt Counselling Consult
                    </h1>
                    <p style="margin: 8px 0 0; color: #ffffff; font-size: 14px; opacity: 0.9;">
                      Empowering teens & youths for optimal development
                    </p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px 32px;">
                    <h2 style="margin: 0 0 16px; color: #1a1a1a; font-size: 24px; font-weight: 600;">
                      Welcome back, ${displayName}!
                    </h2>
                    <p style="margin: 0 0 24px; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                      Click the button below to sign in to your Gilt Counselling account. This link will expire in 15 minutes for your security.
                    </p>

                    <!-- Button -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" style="padding: 12px 0;">
                          <a href="${magicLink}"
                             style="display: inline-block; background: linear-gradient(135deg, #D9A85D 0%, #F5A623 100%); color: #ffffff; text-decoration: none; padding: 16px 48px; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 2px 4px rgba(217, 168, 93, 0.3);">
                            Sign In to Your Account
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p style="margin: 24px 0 0; color: #6a6a6a; font-size: 14px; line-height: 1.6;">
                      Or copy and paste this URL into your browser:
                    </p>
                    <p style="margin: 8px 0; color: #D9A85D; font-size: 13px; word-break: break-all; background-color: #f9f9f9; padding: 12px; border-radius: 6px; border-left: 3px solid #D9A85D;">
                      ${magicLink}
                    </p>

                    <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e5e5;">
                      <p style="margin: 0 0 8px; color: #6a6a6a; font-size: 13px;">
                        <strong>Didn't request this?</strong>
                      </p>
                      <p style="margin: 0; color: #8a8a8a; font-size: 13px; line-height: 1.5;">
                        If you didn't try to sign in, you can safely ignore this email. The link will expire automatically.
                      </p>
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #F5F1E8; padding: 32px; text-align: center;">
                    <p style="margin: 0 0 12px; color: #4a4a4a; font-size: 13px; font-weight: 600;">
                      Contact Us
                    </p>
                    <p style="margin: 0 0 4px; color: #6a6a6a; font-size: 12px;">
                      📍 88 Woji Road, Port Harcourt, Nigeria
                    </p>
                    <p style="margin: 0 0 4px; color: #6a6a6a; font-size: 12px;">
                      📍 470 Front St W, Toronto, Canada
                    </p>
                    <p style="margin: 0 0 4px; color: #6a6a6a; font-size: 12px;">
                      📞 +234 803 309 4050
                    </p>
                    <p style="margin: 0 0 16px; color: #6a6a6a; font-size: 12px;">
                      ✉️ hello@giltcounselling.com
                    </p>
                    <p style="margin: 16px 0 0; color: #8a8a8a; font-size: 11px;">
                      © ${new Date().getFullYear()} Gilt Counselling Consult. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  const text = `
Welcome back, ${displayName}!

Click this link to sign in to your Gilt Counselling account:
${magicLink}

This link will expire in 15 minutes for your security.

If you didn't try to sign in, you can safely ignore this email.

---
Gilt Counselling Consult
Empowering teens & youths for optimal development

Nigeria Office: 88 Woji Road, Port Harcourt
Canada Office: 470 Front St W, Toronto
Phone: +234 803 309 4050
Email: hello@giltcounselling.com
  `;

  return { html, text };
}

// Appointment Confirmation Email Template
export function generateAppointmentConfirmationEmail(
  clientName: string,
  service: string,
  date: string,
  time: string,
  location: string = 'To be confirmed'
) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Appointment Confirmed</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Inter', Arial, sans-serif; background-color: #F5F1E8;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F5F1E8; padding: 40px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <tr>
                  <td style="background: linear-gradient(135deg, #5FB74E 0%, #1BA5BB 100%); padding: 40px 32px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                      Appointment Confirmed ✓
                    </h1>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 40px 32px;">
                    <p style="margin: 0 0 24px; color: #1a1a1a; font-size: 16px;">
                      Dear ${clientName},
                    </p>
                    <p style="margin: 0 0 24px; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                      Your counselling session has been successfully scheduled. We look forward to supporting you on your journey.
                    </p>

                    <div style="background-color: #F5F1E8; border-left: 4px solid #5FB74E; padding: 20px; margin: 24px 0; border-radius: 6px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding: 8px 0;">
                            <strong style="color: #1a1a1a; font-size: 14px;">Service:</strong>
                            <p style="margin: 4px 0 0; color: #4a4a4a; font-size: 15px;">${service}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0;">
                            <strong style="color: #1a1a1a; font-size: 14px;">Date:</strong>
                            <p style="margin: 4px 0 0; color: #4a4a4a; font-size: 15px;">${date}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0;">
                            <strong style="color: #1a1a1a; font-size: 14px;">Time:</strong>
                            <p style="margin: 4px 0 0; color: #4a4a4a; font-size: 15px;">${time}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0;">
                            <strong style="color: #1a1a1a; font-size: 14px;">Location:</strong>
                            <p style="margin: 4px 0 0; color: #4a4a4a; font-size: 15px;">${location}</p>
                          </td>
                        </tr>
                      </table>
                    </div>

                    <p style="margin: 24px 0; color: #4a4a4a; font-size: 14px; line-height: 1.6;">
                      <strong>Need to reschedule?</strong><br>
                      Contact us at <a href="tel:+2348033094050" style="color: #D9A85D;">+234 803 309 4050</a> or
                      <a href="mailto:hello@giltcounselling.com" style="color: #D9A85D;">hello@giltcounselling.com</a>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="background-color: #F5F1E8; padding: 24px 32px; text-align: center;">
                    <p style="margin: 0; color: #6a6a6a; font-size: 12px;">
                      © ${new Date().getFullYear()} Gilt Counselling Consult
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  return { html, text: `Your appointment for ${service} has been confirmed for ${date} at ${time}.` };
}
