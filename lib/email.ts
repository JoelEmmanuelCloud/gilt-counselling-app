import { Resend } from 'resend';
import { generateOTPEmail as _generateOTPEmail } from './email-templates/otp';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.EMAIL_FROM || 'hello@giltcounselling.com';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
const LOGO_URL = 'http://cdn.mcauto-images-production.sendgrid.net/f638e50cb4cb3520/2aca1832-4d5e-4457-a2d0-d15541acd0f2/7262x3077.jpg';

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
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
          <tr>
            <td align="center">
              <!-- Main Container -->
              <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">

                <!-- Header with Logo -->
                <tr>
                  <td style="background-color: #ffffff; padding: 40px 32px 32px; text-align: center; border-bottom: 1px solid #e5e5e5;">
                    <img src="${LOGO_URL}" alt="Gilt Counselling Consult" style="max-width: 200px; height: auto; display: block; margin: 0 auto;" />
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px 32px;">
                    <h2 style="margin: 0 0 16px; color: #1a1a1a; font-size: 24px; font-weight: 600; text-align: center;">
                      Sign In to Your Account
                    </h2>
                    <p style="margin: 0 0 32px; color: #666666; font-size: 16px; line-height: 1.5; text-align: center;">
                      Hello ${displayName}, click the button below to sign in to your account. This link will expire in 15 minutes.
                    </p>

                    <!-- Button -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" style="padding: 0 0 32px 0;">
                          <a href="${magicLink}"
                             style="display: inline-block; background-color: #1a1a1a; color: #ffffff; text-decoration: none; padding: 14px 40px; border-radius: 6px; font-size: 16px; font-weight: 600;">
                            Sign In Now
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p style="margin: 0 0 8px; color: #999999; font-size: 14px; text-align: center;">
                      Or copy and paste this link:
                    </p>
                    <p style="margin: 0 0 32px; color: #666666; font-size: 13px; word-break: break-all; background-color: #f8f9fa; padding: 12px; border-radius: 4px; text-align: center;">
                      ${magicLink}
                    </p>

                    <p style="margin: 0; color: #999999; font-size: 14px; line-height: 1.5; text-align: center;">
                      If you didn't request this link, you can safely ignore this email.
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8f9fa; padding: 32px; text-align: center; border-top: 1px solid #e5e5e5;">
                    <p style="margin: 0 0 12px; color: #666666; font-size: 14px; font-weight: 600;">
                      Contact Us
                    </p>
                    <p style="margin: 0 0 4px; color: #999999; font-size: 13px;">
                      88 Woji Road, Port Harcourt, Nigeria
                    </p>
                    <p style="margin: 0 0 4px; color: #999999; font-size: 13px;">
                      470 Front St W, Toronto, Canada
                    </p>
                    <p style="margin: 0 0 4px; color: #999999; font-size: 13px;">
                      +234 803 309 4050
                    </p>
                    <p style="margin: 0 0 20px; color: #999999; font-size: 13px;">
                      hello@giltcounselling.com
                    </p>
                    <p style="margin: 0; color: #cccccc; font-size: 12px;">
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Appointment Confirmed</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
          <tr>
            <td align="center">
              <!-- Main Container -->
              <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">

                <!-- Header with Logo -->
                <tr>
                  <td style="background-color: #ffffff; padding: 40px 32px 32px; text-align: center; border-bottom: 1px solid #e5e5e5;">
                    <img src="${LOGO_URL}" alt="Gilt Counselling Consult" style="max-width: 200px; height: auto; display: block; margin: 0 auto;" />
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px 32px;">
                    <h2 style="margin: 0 0 16px; color: #1a1a1a; font-size: 24px; font-weight: 600; text-align: center;">
                      Appointment Confirmed
                    </h2>
                    <p style="margin: 0 0 32px; color: #666666; font-size: 16px; line-height: 1.5; text-align: center;">
                      Dear ${clientName}, your counselling session has been successfully scheduled.
                    </p>

                    <!-- Appointment Details Box -->
                    <div style="background-color: #f8f9fa; border: 1px solid #e5e5e5; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                            <p style="margin: 0 0 4px; color: #999999; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Service</p>
                            <p style="margin: 0; color: #1a1a1a; font-size: 16px; font-weight: 500;">${service}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                            <p style="margin: 0 0 4px; color: #999999; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Date</p>
                            <p style="margin: 0; color: #1a1a1a; font-size: 16px; font-weight: 500;">${date}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                            <p style="margin: 0 0 4px; color: #999999; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Time</p>
                            <p style="margin: 0; color: #1a1a1a; font-size: 16px; font-weight: 500;">${time}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0;">
                            <p style="margin: 0 0 4px; color: #999999; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Location</p>
                            <p style="margin: 0; color: #1a1a1a; font-size: 16px; font-weight: 500;">${location}</p>
                          </td>
                        </tr>
                      </table>
                    </div>

                    <p style="margin: 0 0 8px; color: #1a1a1a; font-size: 15px; font-weight: 600; text-align: center;">
                      Need to reschedule?
                    </p>
                    <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.5; text-align: center;">
                      Contact us at <a href="tel:+2348033094050" style="color: #1a1a1a; text-decoration: none; font-weight: 500;">+234 803 309 4050</a> or <a href="mailto:hello@giltcounselling.com" style="color: #1a1a1a; text-decoration: none; font-weight: 500;">hello@giltcounselling.com</a>
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8f9fa; padding: 32px; text-align: center; border-top: 1px solid #e5e5e5;">
                    <p style="margin: 0 0 12px; color: #666666; font-size: 14px; font-weight: 600;">
                      Contact Us
                    </p>
                    <p style="margin: 0 0 4px; color: #999999; font-size: 13px;">
                      88 Woji Road, Port Harcourt, Nigeria
                    </p>
                    <p style="margin: 0 0 4px; color: #999999; font-size: 13px;">
                      470 Front St W, Toronto, Canada
                    </p>
                    <p style="margin: 0 0 4px; color: #999999; font-size: 13px;">
                      +234 803 309 4050
                    </p>
                    <p style="margin: 0 0 20px; color: #999999; font-size: 13px;">
                      hello@giltcounselling.com
                    </p>
                    <p style="margin: 0; color: #cccccc; font-size: 12px;">
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

  return { html, text: `Your appointment for ${service} has been confirmed for ${date} at ${time}.` };
}

// OTP Email Template
export const generateOTPEmail = _generateOTPEmail;
