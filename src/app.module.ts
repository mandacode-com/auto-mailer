import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/validate';
import { VerifyEmailController } from './controllers/verify.controller';
import { MailerService } from './services/mailer.service';
import { HealthControllerImpl } from './controllers/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validate,
      isGlobal: true,
    }),
  ],
  controllers: [VerifyEmailController, HealthControllerImpl],
  providers: [MailerService],
})
export class AppModule {}
