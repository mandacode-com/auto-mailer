import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MailerService } from 'src/services/mailer';
import { confirmEmailTemplate } from 'src/templates/confirm.template';
import { IConfirmEmail } from 'src/types/confirm';

@Controller()
export class ConfirmController {
  constructor(private readonly mailerService: MailerService) {}

  @MessagePattern({ cmd: 'confirm_email' })
  async confirmEmail(data: IConfirmEmail) {
    await this.mailerService.sendMail({
      to: data.email,
      subject: 'Confirm your email',
      html: confirmEmailTemplate(data.link),
    });

    return { success: true };
  }
}
