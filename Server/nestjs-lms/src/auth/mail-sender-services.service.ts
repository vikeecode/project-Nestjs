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
}
