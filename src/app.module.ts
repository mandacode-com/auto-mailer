import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/validate';
import { ConfirmController } from './controllers/confirm.controller';
import { MailerService } from './services/mailer.service';
import { HealthController } from './controllers/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validate,
      isGlobal: true,
    }),
  ],
  controllers: [ConfirmController, HealthController],
  providers: [MailerService],
})
export class AppModule {}
