import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendMail(to, subject, html) {
  try {
    if (typeof to !== "string") {
      console.error('The "to" field must be a string, but received:', to);
      return;
    }

    if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) {
      console.error("Missing environment variables for Resend");
      return;
    }

    const response = await resend.emails.send({
      from: "Reeliic <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
