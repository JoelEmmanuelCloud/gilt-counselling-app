import { Resend } from 'resend';
import { generateOTPEmail as _generateOTPEmail } from './email-templates/otp';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.EMAIL_FROM || 'Gilt Counselling Consult <hello@giltcounselling.com>';
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

// Welcome Email for new users
export async function sendWelcomeEmail(email: string, name: string) {
  const dashboardUrl = `${APP_URL}/dashboard`;
  const displayName = name || email.split('@')[0];

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Gilt Counselling Consult</title>
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
                      Welcome to Gilt Counselling Consult!
                    </h2>
                    <p style="margin: 0 0 32px; color: #666666; font-size: 16px; line-height: 1.5; text-align: center;">
                      Hello ${displayName}, thank you for joining us. Your account has been successfully created and verified.
                    </p>

                    <!-- Services Box -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" style="padding: 0 0 32px 0;">
                          <div style="background-color: #f8f9fa; border: 2px solid #e5e5e5; border-radius: 8px; padding: 24px 32px; text-align: left;">
                            <p style="margin: 0 0 16px; color: #1a1a1a; font-size: 15px; font-weight: 600;">
                              Our Services Include:
                            </p>
                            <table width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="padding: 6px 0; color: #666666; font-size: 14px;">&#8226; Mental Health Counselling</td>
                              </tr>
                              <tr>
                                <td style="padding: 6px 0; color: #666666; font-size: 14px;">&#8226; Educational Consulting</td>
                              </tr>
                              <tr>
                                <td style="padding: 6px 0; color: #666666; font-size: 14px;">&#8226; School Counselling</td>
                              </tr>
                              <tr>
                                <td style="padding: 6px 0; color: #666666; font-size: 14px;">&#8226; Academic & Career Guidance</td>
                              </tr>
                              <tr>
                                <td style="padding: 6px 0; color: #666666; font-size: 14px;">&#8226; Youth Counselling</td>
                              </tr>
                              <tr>
                                <td style="padding: 6px 0; color: #666666; font-size: 14px;">&#8226; Parenting & Special Needs Support</td>
                              </tr>
                            </table>
                          </div>
                        </td>
                      </tr>
                    </table>

                    <!-- Get Started Notice -->
                    <div style="background-color: #e8f5e9; border-left: 3px solid #4caf50; padding: 16px 20px; border-radius: 4px; margin-bottom: 32px;">
                      <p style="margin: 0 0 8px; color: #2e7d32; font-size: 14px; font-weight: 600;">
                        Ready to Get Started?
                      </p>
                      <p style="margin: 0; color: #2e7d32; font-size: 14px; line-height: 1.5;">
                        Visit your dashboard to book your first counselling session with one of our experienced professionals.
                      </p>
                    </div>

                    <!-- Button -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" style="padding: 0 0 32px 0;">
                          <a href="${dashboardUrl}"
                             style="display: inline-block; background-color: #1a1a1a; color: #ffffff; text-decoration: none; padding: 14px 40px; border-radius: 6px; font-size: 16px; font-weight: 600;">
                            Go to Dashboard
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p style="margin: 0; color: #999999; font-size: 14px; line-height: 1.5; text-align: center;">
                      We're here to support you on your journey to personal growth and well-being.
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
Hello ${displayName}!

Welcome to Gilt Counselling Consult!

Thank you for joining us. Your account has been successfully created and verified.

At Gilt Counselling Consult, we're dedicated to empowering teens and youths for optimal development. We offer a range of services including:

- Mental Health Counselling
- Educational Consulting
- School Counselling
- Academic & Career Guidance
- Youth Counselling
- Parenting & Special Needs Support

Ready to get started? Visit your dashboard to book your first counselling session:
${dashboardUrl}

We're here to support you on your journey to personal growth and well-being.

---
Gilt Counselling Consult
Empowering teens & youths for optimal development

Nigeria Office: 88 Woji Road, Port Harcourt
Canada Office: 470 Front St W, Toronto
Phone: +234 803 309 4050
Email: hello@giltcounselling.com
  `;

  return sendEmail({
    to: email,
    subject: 'Welcome to Gilt Counselling Consult',
    html,
    text,
  });
}

// Counselor Welcome Email
export async function sendCounselorWelcomeEmail(email: string, name: string) {
  const loginUrl = `${APP_URL}/auth/signin`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Gilt Counselling Consult</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
                <tr>
                  <td style="background-color: #ffffff; padding: 40px 32px 32px; text-align: center; border-bottom: 1px solid #e5e5e5;">
                    <img src="${LOGO_URL}" alt="Gilt Counselling Consult" style="max-width: 200px; height: auto; display: block; margin: 0 auto;" />
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px 32px;">
                    <h2 style="margin: 0 0 16px; color: #1a1a1a; font-size: 24px; font-weight: 600; text-align: center;">
                      Welcome to Gilt Counselling Consult
                    </h2>
                    <p style="margin: 0 0 24px; color: #666666; font-size: 16px; line-height: 1.5; text-align: center;">
                      Dear ${name}, your counselor account has been created. You can now access the counselor dashboard to manage your appointments.
                    </p>

                    <div style="background-color: #f8f9fa; border: 1px solid #e5e5e5; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding: 8px 0;">
                            <p style="margin: 0 0 4px; color: #999999; font-size: 13px; font-weight: 600;">Email</p>
                            <p style="margin: 0; color: #1a1a1a; font-size: 16px;">${email}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0;">
                            <p style="margin: 0 0 4px; color: #999999; font-size: 13px; font-weight: 600;">Sign In Method</p>
                            <p style="margin: 0; color: #1a1a1a; font-size: 16px;">Passwordless (OTP via Email)</p>
                          </td>
                        </tr>
                      </table>
                    </div>

                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" style="padding: 0 0 24px 0;">
                          <a href="${loginUrl}" style="display: inline-block; background-color: #1a1a1a; color: #ffffff; text-decoration: none; padding: 14px 40px; border-radius: 6px; font-size: 16px; font-weight: 600;">
                            Sign In Now
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p style="margin: 0; color: #999999; font-size: 14px; line-height: 1.5; text-align: center;">
                      To sign in, enter your email and we'll send you a secure verification code.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #f8f9fa; padding: 32px; text-align: center; border-top: 1px solid #e5e5e5;">
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

  return sendEmail({
    to: email,
    subject: 'Welcome to Gilt Counselling Consult - Counselor Account',
    html,
    text: `Welcome ${name}! Your counselor account has been created. Email: ${email}. To sign in, visit ${loginUrl} and enter your email to receive a verification code.`,
  });
}

// Appointment Status Email
export async function sendAppointmentStatusEmail(
  email: string,
  name: string,
  status: string,
  date: string,
  time: string,
  service: string
) {
  const statusMessages: { [key: string]: { title: string; message: string; color: string } } = {
    confirmed: {
      title: 'Appointment Confirmed',
      message: 'Your appointment has been confirmed by our team.',
      color: '#22c55e',
    },
    cancelled: {
      title: 'Appointment Cancelled',
      message: 'Your appointment has been cancelled.',
      color: '#ef4444',
    },
    completed: {
      title: 'Appointment Completed',
      message: 'Thank you for attending your session with us.',
      color: '#3b82f6',
    },
    pending: {
      title: 'Appointment Pending',
      message: 'Your appointment is awaiting confirmation.',
      color: '#f59e0b',
    },
  };

  const statusInfo = statusMessages[status] || statusMessages.pending;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${statusInfo.title}</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
                <tr>
                  <td style="background-color: #ffffff; padding: 40px 32px 32px; text-align: center; border-bottom: 1px solid #e5e5e5;">
                    <img src="${LOGO_URL}" alt="Gilt Counselling Consult" style="max-width: 200px; height: auto; display: block; margin: 0 auto;" />
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px 32px;">
                    <div style="width: 60px; height: 60px; background-color: ${statusInfo.color}; border-radius: 50%; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center;">
                      <span style="color: white; font-size: 24px;">&#10003;</span>
                    </div>
                    <h2 style="margin: 0 0 16px; color: #1a1a1a; font-size: 24px; font-weight: 600; text-align: center;">
                      ${statusInfo.title}
                    </h2>
                    <p style="margin: 0 0 24px; color: #666666; font-size: 16px; line-height: 1.5; text-align: center;">
                      Dear ${name}, ${statusInfo.message}
                    </p>

                    <div style="background-color: #f8f9fa; border: 1px solid #e5e5e5; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;">
                            <p style="margin: 0 0 4px; color: #999999; font-size: 13px; font-weight: 600;">Service</p>
                            <p style="margin: 0; color: #1a1a1a; font-size: 16px;">${service}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;">
                            <p style="margin: 0 0 4px; color: #999999; font-size: 13px; font-weight: 600;">Date</p>
                            <p style="margin: 0; color: #1a1a1a; font-size: 16px;">${date}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0;">
                            <p style="margin: 0 0 4px; color: #999999; font-size: 13px; font-weight: 600;">Time</p>
                            <p style="margin: 0; color: #1a1a1a; font-size: 16px;">${time}</p>
                          </td>
                        </tr>
                      </table>
                    </div>

                    <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.5; text-align: center;">
                      If you have any questions, please contact us at <a href="mailto:hello@giltcounselling.com" style="color: #1a1a1a;">hello@giltcounselling.com</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #f8f9fa; padding: 32px; text-align: center; border-top: 1px solid #e5e5e5;">
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

  return sendEmail({
    to: email,
    subject: `${statusInfo.title} - Gilt Counselling Consult`,
    html,
    text: `${statusInfo.title}: Dear ${name}, ${statusInfo.message} Service: ${service}, Date: ${date}, Time: ${time}`,
  });
}

// Reschedule Email
export async function sendRescheduleEmail(
  email: string,
  name: string,
  oldDate: string,
  oldTime: string,
  newDate: string,
  newTime: string,
  service: string
) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Appointment Rescheduled</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
                <tr>
                  <td style="background-color: #ffffff; padding: 40px 32px 32px; text-align: center; border-bottom: 1px solid #e5e5e5;">
                    <img src="${LOGO_URL}" alt="Gilt Counselling Consult" style="max-width: 200px; height: auto; display: block; margin: 0 auto;" />
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px 32px;">
                    <h2 style="margin: 0 0 16px; color: #1a1a1a; font-size: 24px; font-weight: 600; text-align: center;">
                      Appointment Rescheduled
                    </h2>
                    <p style="margin: 0 0 24px; color: #666666; font-size: 16px; line-height: 1.5; text-align: center;">
                      Dear ${name}, your appointment has been rescheduled.
                    </p>

                    <div style="background-color: #fff3cd; border: 1px solid #ffc107; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
                      <p style="margin: 0; color: #856404; font-size: 14px;">
                        <strong>Previous:</strong> ${oldDate} at ${oldTime}
                      </p>
                    </div>

                    <div style="background-color: #d4edda; border: 1px solid #28a745; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
                      <p style="margin: 0 0 8px; color: #155724; font-size: 14px; font-weight: 600;">NEW APPOINTMENT</p>
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding: 8px 0; border-bottom: 1px solid rgba(21, 87, 36, 0.2);">
                            <p style="margin: 0 0 4px; color: #155724; font-size: 13px;">Service</p>
                            <p style="margin: 0; color: #155724; font-size: 16px; font-weight: 500;">${service}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; border-bottom: 1px solid rgba(21, 87, 36, 0.2);">
                            <p style="margin: 0 0 4px; color: #155724; font-size: 13px;">Date</p>
                            <p style="margin: 0; color: #155724; font-size: 16px; font-weight: 500;">${newDate}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0;">
                            <p style="margin: 0 0 4px; color: #155724; font-size: 13px;">Time</p>
                            <p style="margin: 0; color: #155724; font-size: 16px; font-weight: 500;">${newTime}</p>
                          </td>
                        </tr>
                      </table>
                    </div>

                    <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.5; text-align: center;">
                      If you have any questions, please contact us at <a href="mailto:hello@giltcounselling.com" style="color: #1a1a1a;">hello@giltcounselling.com</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #f8f9fa; padding: 32px; text-align: center; border-top: 1px solid #e5e5e5;">
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

  return sendEmail({
    to: email,
    subject: 'Appointment Rescheduled - Gilt Counselling Consult',
    html,
    text: `Dear ${name}, your appointment has been rescheduled from ${oldDate} at ${oldTime} to ${newDate} at ${newTime}. Service: ${service}`,
  });
}
