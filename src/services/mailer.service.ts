import ejs from 'ejs';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';
import { Config } from 'src/schemas/config.schema';
import { join } from 'path';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

@Injectable()
export class MailerService {
  private readonly transporter: Transporter;
  private readonly mailerConfig: Config['mailer'];

  constructor(private readonly config: ConfigService<Config, true>) {
    this.mailerConfig = this.config.get<Config['mailer']>('mailer');
    this.transporter = createTransport({
      host: this.mailerConfig.host,
      port: this.mailerConfig.port,
      secure: this.mailerConfig.secure,
      auth: {
        user: this.mailerConfig.user,
        pass: this.mailerConfig.pass,
      },
    });
  }

  async sendVerificationEmail(data: {
    to: string;
    subject: string;
    link: string;
  }): Promise<void> {
    const templatePath = join(
      __dirname,
      '../templates/mandacode/verify_email.ejs',
    );
    const template = await ejs
      .renderFile(templatePath, { link: data.link })
      .catch((error) => {
        Logger.error('Failed to render email template', error);
        throw new RpcException({
          code: status.INTERNAL,
          message: 'Failed to render email template',
        });
      });
    await this.sendMail({
      to: data.to,
      subject: data.subject,
      html: template,
    });
  }

  async sendMail({
    to,
    subject,
    html,
  }: {
    to: string;
    subject: string;
    html: string;
  }) {
    await this.transporter
      .sendMail({
        from: `${this.mailerConfig.name} <${this.mailerConfig.user}>`,
        to,
        subject,
        html: html,
      })
      .catch((error) => {
        Logger.error('Failed to send email', error);
        throw new RpcException({
          code: status.INTERNAL,
          message: 'Failed to send email',
        });
      });
  }
}
