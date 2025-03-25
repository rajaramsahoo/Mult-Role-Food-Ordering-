import nodemailer from "nodemailer";
import { sendVerificationEmailHtml } from "./emailHtml.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rajaramsahoo1998@gmail.com", // Your Gmail address
    pass: "drye whxb utfa dalf", // Use the App Password (not your actual Gmail password)
  },
});

export const sendVerificationEmail = async (email, verificationToken) => {
  const mailOptions = {
    from: "rajaramsahoo1998@gmail.com",
    to: email,
    subject: "Verify your email",
    html: sendVerificationEmailHtml.replace("{verificationToken}", verificationToken),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.log("Error:", error);
    throw new Error("Failed to send email verification");
  }
};
