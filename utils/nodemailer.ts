import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_EMAIl,
    pass: process.env.APP_PASSWORD,
  },
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  await transporter.sendMail({
    from: process.env.APP_EMAIL,
    to,
    subject,
    html: text,
  });
};
