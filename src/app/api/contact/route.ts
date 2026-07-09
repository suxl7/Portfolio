import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    const data = await resend.emails.send({
      from: "Portfolio Contact <contact@chaudhary-sushil.com.np>",
      to: process.env.TO_EMAIL!,
      subject: subject || "New Portfolio Contact",
      html: `
        <h2>New Contact Form Submission</h2>

        <p><strong>Name:</strong> ${name}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Subject:</strong> ${subject || "Not provided"}</p>

        <p><strong>Message:</strong></p>
        <p>${message || "No message provided"}</p>
      `,
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