import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { VerifyMailDto } from './dto/verify-mail.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  // async sendUserConfirmation(user: User, token: string) {
  //   const url = `example.com/auth/confirm?token=${token}`;
  //
  //   await this.mailerService.sendMail({
  //     to: user.email,
  //     // from: '"Support Team" <support@example.com>', // override default from
  //     subject: 'Welcome to Nice App! Confirm your Email',
  //     template: './confirmation', // `.hbs` extension is appended automatically
  //     context: { // ✏️ filling curly brackets with content
  //       name: user.name,
  //       url,
  //     },
  //   });
  // }

  async verifyEmail(verifyEmailDto: VerifyMailDto) {
    const { firstName, lastName, email, otp } = verifyEmailDto;

    const subject = `Company: OTP To Verify Email`;

    console.log({ firstName, lastName, otp, email });

    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './verify',
      context: {
        firstName,
        lastName,
        otp,
      },
    });
  }
}
