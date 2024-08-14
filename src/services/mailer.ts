import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';
import { IConfig, IMailerConfig } from 'src/types/config';

@Injectable()
export class MailerService {
  private transporter: Transporter;
  private readonly user: string;

  constructor(private readonly config: ConfigService<IConfig, true>) {
    const mailerConfig = this.config.get<IMailerConfig>('mailer');
    this.user = mailerConfig.auth.user;
    this.transporter = createTransport({
      host: mailerConfig.host,
      port: mailerConfig.port,
      secure: mailerConfig.secure,
      auth: {
        user: mailerConfig.auth.user,
        pass: mailerConfig.auth.pass,
      },
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
    await this.transporter.sendMail({
      from: this.user,
      to,
      subject,
      html: html,
    });
  }
}
