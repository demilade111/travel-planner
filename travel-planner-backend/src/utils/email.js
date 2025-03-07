const nodemailer = require("nodemailer");
const logger = require("./logger");
const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: `Travel Planner <${process.env.EMAIL_FROM}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html,
    };
    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    logger.error(`Email sending error: ${error.message}`);
    throw error;
  }
};
const sendWelcomeEmail = async (user) => {
  const subject = "Welcome to Travel Planner!";
  const message = `Hello ${user.name},
Welcome to Travel Planner! We're excited to have you on board.
With Travel Planner, you can:
- Create and manage your trips
- Track your expenses
- Create packing lists
- Collaborate with friends and family
- Get AI-powered travel recommendations
Start by creating your first trip in your dashboard.
Happy Travels!
The Travel Planner Team`;
  const html = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #3b82f6;">Welcome to Travel Planner!</h2>
    <p>Hello ${user.name},</p>
    <p>We're excited to have you on board.</p>
    <div style="background-color: #f8fafc; padding: 15px; border-radius: 5px; margin: 20px 0;">
      <p><strong>With Travel Planner, you can:</strong></p>
      <ul>
        <li>Create and manage your trips</li>
        <li>Track your expenses</li>
        <li>Create packing lists</li>
        <li>Collaborate with friends and family</li>
        <li>Get AI-powered travel recommendations</li>
      </ul>
    </div>
    <p>Start by creating your first trip in your dashboard.</p>
    <p style="margin-top: 30px;">Happy Travels!<br>The Travel Planner Team</p>
  </div>
  `;
  return sendEmail({
    email: user.email,
    subject,
    message,
    html,
  });
};
const sendPasswordResetEmail = async (options) => {
  const subject = "Travel Planner - Password Reset";
  const message = `Hello ${options.name},
You have requested to reset your password. Please click the link below to reset your password:
${options.resetUrl}
This link will expire in 10 minutes.
If you didn't request this, please ignore this email and your password will remain unchanged.
Regards,
The Travel Planner Team`;
  const html = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #3b82f6;">Password Reset</h2>
    <p>Hello ${options.name},</p>
    <p>You have requested to reset your password. Please click the button below to reset your password:</p>
    <div style="text-align: center; margin: 25px 0;">
      <a href="${options.resetUrl}" style="background-color: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
    </div>
    <p>This link will expire in 10 minutes.</p>
    <p>If you didn't request this, please ignore this email and your password will remain unchanged.</p>
    <p style="margin-top: 30px;">Regards,<br>The Travel Planner Team</p>
  </div>
  `;
  return sendEmail({
    email: options.email,
    subject,
    message,
    html,
  });
};
module.exports = {
  sendEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
};
