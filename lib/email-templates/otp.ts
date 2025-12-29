const LOGO_URL = 'http://cdn.mcauto-images-production.sendgrid.net/f638e50cb4cb3520/2aca1832-4d5e-4457-a2d0-d15541acd0f2/7262x3077.jpg';

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
                      Your Verification Code
                    </h2>
                    <p style="margin: 0 0 32px; color: #666666; font-size: 16px; line-height: 1.5; text-align: center;">
                      Hello ${displayName}, enter this code to sign in to your account. This code will expire in 10 minutes.
                    </p>

                    <!-- OTP Code Box -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" style="padding: 0 0 32px 0;">
                          <div style="background-color: #f8f9fa; border: 2px solid #e5e5e5; border-radius: 8px; padding: 24px 32px; display: inline-block;">
                            <p style="margin: 0; color: #1a1a1a; font-size: 42px; font-weight: 700; letter-spacing: 12px; font-family: 'Courier New', Courier, monospace;">
                              ${code}
                            </p>
                          </div>
                        </td>
                      </tr>
                    </table>

                    <!-- Security Notice -->
                    <div style="background-color: #fff8e1; border-left: 3px solid #ffc107; padding: 16px 20px; border-radius: 4px; margin-bottom: 32px;">
                      <p style="margin: 0 0 8px; color: #856404; font-size: 14px; font-weight: 600;">
                        Security Notice
                      </p>
                      <p style="margin: 0; color: #856404; font-size: 14px; line-height: 1.5;">
                        Never share this code with anyone. Our staff will never ask for your verification code.
                      </p>
                    </div>

                    <p style="margin: 0; color: #999999; font-size: 14px; line-height: 1.5; text-align: center;">
                      If you didn't request this code, you can safely ignore this email.
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

Your verification code is: ${code}

Enter this code to sign in to your Gilt Counselling account.
This code will expire in 10 minutes for your security.

IMPORTANT: Never share this code with anyone. Our staff will never ask for your verification code.

If you didn't request this code, you can safely ignore this email.

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
