import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailSenderServicesService {

  private resend = new Resend(process.env.API_KEY_EMAIL_SENDER);

  async sendVerificationEmail(
    email: string,
    token: string,
  ) {
    const verificationUrl =
      `${process.env.BACKEND_URL}/auth/verify-email?token=${token}`;

    await this.resend.emails.send({
      from: process.env.MAIL_FROM!,
      to: email,
      subject: 'Verify your LMS account',
      html: `
        <h2>Welcome to LMS</h2>

        <p>Please verify your email address.</p>

        <a href="${verificationUrl}">
          Verify Email
        </a>

        <p>This link expires in 1 minute.</p>
      `,
    });

    return {
      message: 'Verification email sent successfully',
    };
  }

  //forget password mail sender service 
async sendPasswordResetEmail(
  email: string,
  token: string,
) {
  const resetUrl =
    `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  const { data, error } = await this.resend.emails.send({
    from: process.env.MAIL_FROM!,
    to: [email],
    subject: 'Reset your LMS password',
    html: `
      <h2>Reset Password</h2>

      <p>We received a request to reset your password.</p>

      <a href="${resetUrl}">
        Reset Password
      </a>

      <p>This link will expire in 15 minutes.</p>
    `,
  });

  if (error) {
    console.error('Resend error:', error);
    throw new Error(error.message);
  }

  console.log('Password reset email sent:', data);

  return true;
}
}
