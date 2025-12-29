const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

/**
 * Generate OTP email template
 * @param email - User's email address
 * @param code - 6-digit OTP code
 * @param userName - Optional user name for personalization
 */
export function generateOTPEmail(email: string, code: string, userName?: string) {
  const displayName = userName || email.split('@')[0];

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your verification code</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; background-color: #F5F1E8;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F5F1E8; padding: 40px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #D9A85D 0%, #F5A623 100%); padding: 40px 32px; text-align: center;">
                    <img src="${APP_URL}/Gilt Counselling Consult.jpg" alt="Gilt Counselling Consult" style="max-width: 200px; height: auto; margin: 0 auto 16px; display: block;" />
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
                      Here's your verification code to sign in to your Gilt Counselling account. This code will expire in 10 minutes for your security.
                    </p>

                    <!-- OTP Code Box -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" style="padding: 24px 0;">
                          <div style="background-color: #F5F1E8; border: 2px dashed #D9A85D; border-radius: 12px; padding: 32px; display: inline-block;">
                            <p style="margin: 0 0 8px; color: #6a6a6a; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                              Your Verification Code
                            </p>
                            <p style="margin: 0; color: #D9A85D; font-size: 48px; font-weight: bold; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                              ${code}
                            </p>
                          </div>
                        </td>
                      </tr>
                    </table>

                    <!-- Security Notice -->
                    <div style="margin-top: 32px; background-color: #FFF9E6; border-left: 4px solid #F5A623; padding: 16px; border-radius: 6px;">
                      <p style="margin: 0 0 8px; color: #8B6914; font-size: 14px; font-weight: 600;">
                        🔐 Security Notice
                      </p>
                      <p style="margin: 0; color: #8B6914; font-size: 13px; line-height: 1.5;">
                        Never share this code with anyone. Gilt Counselling staff will never ask for your verification code.
                      </p>
                    </div>

                    <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e5e5;">
                      <p style="margin: 0 0 8px; color: #6a6a6a; font-size: 13px;">
                        <strong>Didn't request this code?</strong>
                      </p>
                      <p style="margin: 0; color: #8a8a8a; font-size: 13px; line-height: 1.5;">
                        If you didn't try to sign in, you can safely ignore this email. The code will expire automatically in 10 minutes.
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

Your verification code is: ${code}

Enter this code to sign in to your Gilt Counselling account.
This code will expire in 10 minutes for your security.

IMPORTANT: Never share this code with anyone. Gilt Counselling staff will never ask for your verification code.

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
