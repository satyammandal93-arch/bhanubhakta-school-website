import nodemailer from "nodemailer";

export async function sendInquiryNotification(inquiry: { name: string; phone: string; email: string; message: string }) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM, SMTP_TO } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD || !SMTP_FROM || !SMTP_TO) throw new Error("SMTP is not configured");
  const transporter = nodemailer.createTransport({ host: SMTP_HOST, port: Number(SMTP_PORT), secure: Number(SMTP_PORT) === 465, auth: { user: SMTP_USER, pass: SMTP_PASSWORD } });
  await transporter.sendMail({ from: SMTP_FROM, to: SMTP_TO, replyTo: inquiry.email, priority: "high", headers: { "X-Priority": "1", Importance: "High" }, subject: `New website inquiry from ${inquiry.name}`, text: `Name: ${inquiry.name}\nPhone: ${inquiry.phone}\nEmail: ${inquiry.email}\n\n${inquiry.message}` });
}
