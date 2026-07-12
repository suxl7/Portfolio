import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);


function buildEmailHtml({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const safeSubject = subject || "Not provided";
  const safeMessage = message || "No message provided.";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const timestamp = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Contact Form Submission</title>
  </head>
  <body style="margin:0; padding:0; background-color:#eef0f3; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eef0f3; padding: 40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">

            <!-- Brand tag -->
            <tr>
              <td style="padding: 0 4px 14px 4px;">
                <p style="margin:0; color:#6b7280; font-size:12px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase;">chaudhary-sushil.com.np</p>
              </td>
            </tr>

            <!-- Card -->
            <tr>
              <td style="background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow: 0 4px 24px rgba(15,23,42,0.08); border:1px solid #eaecef;">

                <!-- Accent bar -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr><td style="height:4px; background:linear-gradient(90deg, #4f46e5, #6366f1, #818cf8);"></td></tr>
                </table>

                <!-- Header -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f1117;">
                  <tr>
                    <td style="padding: 32px 36px 28px 36px;">
                      <table role="presentation" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="width:48px; height:48px; background-color:#1c1f2a; border:1px solid #2b2f3d; border-radius:12px; text-align:center; vertical-align:middle;">
                            <img src="${siteUrl}/icons/gmail.png" alt="Mail" width="24" height="24" style="display:block; margin:12px auto;" />
                          </td>
                          <td style="width:14px;"></td>
                          <td>
                            <span style="display:inline-block; background-color:rgba(99,102,241,0.15); color:#a5b4fc; font-size:11px; font-weight:600; letter-spacing:0.05em; text-transform:uppercase; padding:4px 10px; border-radius:20px;">New Submission</span>
                          </td>
                        </tr>
                      </table>
                      <h1 style="margin: 18px 0 4px 0; color:#ffffff; font-size:24px; font-weight:700; letter-spacing:-0.01em;">New Project Inquiry</h1>
                      <p style="margin:0; color:#9ca3af; font-size:13px;">Received ${timestamp}</p>
                    </td>
                  </tr>
                </table>

                <!-- Body -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 32px 36px 8px 36px;">

                      <!-- Name / Email row -->
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td width="50%" style="padding-bottom:22px; vertical-align:top;">
                            <p style="margin:0 0 4px 0; color:#9ca3af; font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.05em;">From</p>
                            <p style="margin:0; color:#111827; font-size:16px; font-weight:600;">${name}</p>
                          </td>
                          <td width="50%" style="padding-bottom:22px; vertical-align:top;">
                            <p style="margin:0 0 4px 0; color:#9ca3af; font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.05em;">Email</p>
                            <a href="mailto:${email}" style="color:#4f46e5; font-size:16px; font-weight:600; text-decoration:none;">${email}</a>
                          </td>
                        </tr>
                      </table>

                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #eef0f3;">
                        <tr><td style="padding-top:20px; padding-bottom:22px;">
                          <p style="margin:0 0 4px 0; color:#9ca3af; font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.05em;">Subject</p>
                          <p style="margin:0; color:#111827; font-size:16px; font-weight:600;">${safeSubject}</p>
                        </td></tr>
                      </table>

                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #eef0f3;">
                        <tr><td style="padding-top:20px; padding-bottom:8px;">
                          <p style="margin:0 0 10px 0; color:#9ca3af; font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.05em;">Message</p>
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f9fb; border-radius:10px;">
                            <tr>
                              <td style="padding: 16px 18px; color:#374151; font-size:15px; line-height:1.65;">
                                ${safeMessage}
                              </td>
                            </tr>
                          </table>
                        </td></tr>
                      </table>

                    </td>
                  </tr>
                </table>

                <!-- CTA -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 12px 36px 36px 36px;" align="center">
                      <a href="mailto:${email}?subject=Re: ${safeSubject}" style="display:inline-block; background-color:#111827; color:#ffffff; font-size:14px; font-weight:600; text-decoration:none; padding:14px 32px; border-radius:10px; letter-spacing:0.01em;">Reply to ${name} →</a>
                    </td>
                  </tr>
                </table>

                <!-- Footer -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fafafb; border-top:1px solid #eef0f3;">
                  <tr>
                    <td style="padding: 18px 36px;" align="center">
                      <p style="margin:0; color:#9ca3af; font-size:12px;">
                        Automated notification from your portfolio contact form
                      </p>
                    </td>
                  </tr>
                </table>

              </td>
            </tr>

            <!-- Sub-footer -->
            <tr>
              <td style="padding: 20px 4px 0 4px;" align="center">
                <p style="margin:0; color:#9ca3af; font-size:12px;">Sushil Chaudhary &middot; Godawari-1, Attariya Kailali</p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    const data = await resend.emails.send({
      from: "Portfolio Contact <contact@chaudhary-sushil.com.np>",
      to: process.env.TO_EMAIL!,
      subject: subject || "New Portfolio Contact",
      html: buildEmailHtml({ name, email, subject, message }),
    });

    return Response.json({
      success: true,
      data,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error,
      },
      { status: 500 }
    );
  }
}