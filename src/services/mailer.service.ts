import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';
import { Config } from 'src/schemas/config.schema';

@Injectable()
export class MailerService {
  private readonly transporter: Transporter;
  private readonly user: string;

  constructor(private readonly config: ConfigService<Config, true>) {
    this.user = this.config.get('MAILER_USER');
    this.transporter = createTransport({
      host: this.config.get('MAILER_HOST'),
      port: this.config.get('MAILER_PORT'),
      secure: this.config.get('MAILER_SECURE'),
      auth: {
        user: this.config.get('MAILER_USER'),
        pass: this.config.get('MAILER_PASS'),
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
