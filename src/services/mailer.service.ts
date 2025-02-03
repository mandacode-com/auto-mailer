import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';
import { Config } from 'src/schemas/config.schema';

@Injectable()
export class MailerService {
  private readonly transporter: Transporter;
  private readonly user: string;

  constructor(private readonly config: ConfigService<Config, true>) {
    const mailerConfig = this.config.get<Config['mailer']>('mailer');
    this.user = mailerConfig.user;
    this.transporter = createTransport({
      host: mailerConfig.host,
      port: mailerConfig.port,
      secure: mailerConfig.secure,
      auth: {
        user: mailerConfig.user,
        pass: mailerConfig.pass,
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
