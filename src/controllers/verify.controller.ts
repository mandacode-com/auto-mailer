import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  EMAIL_VERIFICATION_SERVICE_NAME,
  VerifyEmailRequest,
  VerifyEmailResponse,
} from 'src/protos/email_verification';
import { MailerService } from 'src/services/mailer.service';
import ejs from 'ejs';
import path from 'path';

@Controller()
export class VerifyEmailController {
  constructor(private readonly mailerService: MailerService) {}

  @GrpcMethod(EMAIL_VERIFICATION_SERVICE_NAME, 'SendEmailVerificationLink')
  async verifyEmail(data: VerifyEmailRequest): Promise<VerifyEmailResponse> {
    const templatePath = path.join(
      __dirname,
      '../templates/mandacode/verify_email.ejs',
    );
    const template = await ejs.renderFile(templatePath, { link: data.link });

    await this.mailerService.sendMail({
      to: data.email,
      subject: '[MandaCode] Verify your email',
      html: template,
    });

    return {
      message: 'Email sent',
    };
  }
}
