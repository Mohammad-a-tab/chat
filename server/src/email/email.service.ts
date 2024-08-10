import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { VerifyEmailDto } from './dto/verify-email.dto';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async verifyEmail(verifyEmailDto: VerifyEmailDto) {
    const { firstName, lastName, email, otp } = verifyEmailDto;

    const subject = `Company: OTP To Verify Email`;

    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './verify-email',
      context: {
        firstName,
        lastName,
        otp,
      },
    });
  }
}
