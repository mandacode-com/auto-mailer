import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  EMAIL_VERIFICATION_SERVICE_NAME,
  VerifyEmailRequest,
  VerifyEmailResponse,
} from 'src/protos/email_verification';
import { MailerService } from 'src/services/mailer.service';
import { confirmEmailTemplate } from 'src/templates/confirm.template';

@Controller()
export class ConfirmController {
  constructor(private readonly mailerService: MailerService) {}

  @GrpcMethod(EMAIL_VERIFICATION_SERVICE_NAME, 'SendEmailVerificationLink')
  async confirmEmail(data: VerifyEmailRequest): Promise<VerifyEmailResponse> {
    await this.mailerService.sendMail({
      to: data.email,
      subject: 'Confirm your email',
      html: confirmEmailTemplate(data.link),
    });

    return {
      message: 'Email sent',
    };
  }
}
