import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const adminEmail = process.env.CONTACT_EMAIL || 'wecare@giltcounselling.com';

    // Send notification to the team
    await sendEmail({
      to: adminEmail,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: 'Georgia', serif; margin: 0; padding: 0; background-color: #FAF8F5; }
              .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
              .header { background: linear-gradient(135deg, #B8860B, #DAA520); padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
              .header h1 { color: white; margin: 0; font-size: 24px; }
              .body { background: white; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e5e1db; border-top: none; }
              .field { margin-bottom: 20px; }
              .field-label { font-weight: bold; color: #5a5a5a; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
              .field-value { color: #333; font-size: 16px; line-height: 1.5; }
              .message-box { background: #FAF8F5; padding: 20px; border-radius: 8px; border-left: 4px solid #DAA520; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>New Contact Form Message</h1>
              </div>
              <div class="body">
                <div class="field">
                  <div class="field-label">Name</div>
                  <div class="field-value">${name}</div>
                </div>
                <div class="field">
                  <div class="field-label">Email</div>
                  <div class="field-value"><a href="mailto:${email}">${email}</a></div>
                </div>
                ${phone ? `
                <div class="field">
                  <div class="field-label">Phone</div>
                  <div class="field-value">${phone}</div>
                </div>
                ` : ''}
                <div class="field">
                  <div class="field-label">Message</div>
                  <div class="message-box">
                    <div class="field-value">${message.replace(/\n/g, '<br>')}</div>
                  </div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `New contact form message:\n\nName: ${name}\nEmail: ${email}\n${phone ? `Phone: ${phone}\n` : ''}Message: ${message}`,
    });

    // Send confirmation to the user
    await sendEmail({
      to: email,
      subject: 'We received your message - Gilt Counselling Consult',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: 'Georgia', serif; margin: 0; padding: 0; background-color: #FAF8F5; }
              .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
              .header { background: linear-gradient(135deg, #B8860B, #DAA520); padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
              .header h1 { color: white; margin: 0; font-size: 24px; }
              .body { background: white; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e5e1db; border-top: none; }
              p { color: #333; font-size: 16px; line-height: 1.6; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Thank You, ${name}</h1>
              </div>
              <div class="body">
                <p>We have received your message and will get back to you within 24 hours.</p>
                <p>If your matter is urgent, please don't hesitate to call us directly:</p>
                <p><strong>Nigeria:</strong> +234 803 309 4050<br>
                <strong>Canada:</strong> +1 (available on request)</p>
                <p>Warm regards,<br>The Gilt Counselling Consult Team</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `Dear ${name},\n\nThank you for reaching out. We have received your message and will get back to you within 24 hours.\n\nIf your matter is urgent, please call us at +234 803 309 4050.\n\nWarm regards,\nThe Gilt Counselling Consult Team`,
    });

    return NextResponse.json({ message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { message: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
