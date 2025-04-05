import { RpcException } from '@nestjs/microservices';
import { MailerService } from 'src/services/mailer.service';
import {
  MailerServiceController,
  MailerServiceControllerMethods,
  MailType,
  SendEmailRequest,
  SendEmailResponse,
} from 'src/protos/mailer';
import { status } from '@grpc/grpc-js';
import { emailVerificationSchema } from 'src/schemas/mailer.schema';
import { Logger } from '@nestjs/common';

@MailerServiceControllerMethods()
export class VerifyEmailController implements MailerServiceController {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(request: SendEmailRequest): Promise<SendEmailResponse> {
    switch (request.type) {
      case MailType.VERIFY_EMAIL: {
        if (!request.verification) {
          throw new RpcException({
            code: status.INVALID_ARGUMENT,
            message: 'Verification data is required',
          });
        }
        const parsedData = await emailVerificationSchema.parseAsync(request);
        await this.mailerService.sendVerificationEmail({
          to: parsedData.to,
          subject: parsedData.subject,
          link: parsedData.verification.link,
        });
        return {};
      }
      default:
        Logger.error('Invalid mail type', request.type);
        throw new RpcException({
          code: status.INVALID_ARGUMENT,
          message: 'Invalid mail type',
        });
    }
  }
}
